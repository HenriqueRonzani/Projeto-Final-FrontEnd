"use client";
import { Comment } from "@/types";
import { useState, useRef, useEffect } from "react";
import { deleteComment, updateComment } from "@/services/commentService";
import Router from "next/router";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
type CommentProps = {
  comment: Comment;
  userId: number | null;
};

export default function CommentComponent({
  comment,
  userId,
}: CommentProps) {
  const commentDate = new Date(comment.publishedAt).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [commentContent, setCommentContent] = useState(comment.content);
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const handleEditClick = () => {
    if (comment.userId !== userId) {
      toast.error("Você não tem permissão para editar este comentário.");
      return;
    }
    if (comment.userId !== userId) {
      return;
    }
    setIsEditing(!isEditing);
    setShowPopover(false);
  };


  const handleSaveComment = () => {
    updateComment(comment.userId, comment.postId, comment.id, commentContent)
      .then(() => {
        console.log("Comment saved successfully!");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating comment:", error);
      });
    setShowPopover(false);
  };

  const handleDeleteClick = () => {
    if (comment.userId !== userId) {
      toast.error("Você não tem permissão para deletar este comentário.");
      return;
    }
    deleteComment(comment.id)
      .then(() => {
        console.log("Comment deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
    setShowPopover(false);
    router.refresh();
  };



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef, buttonRef]);

  return (
    <div className="w-full h-full flex flex-row justify-between items-start gap-2 relative">
      {isEditing ? (
        <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm flex flex-col gap-2">
          <input
            type="text"
            className="p-2 text-gray-700 dark:text-gray-300 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <div className="flex flex-row justify-between text-sm text-gray-500">
            <span>Publicado por: {comment.user?.name ?? comment.user?.id}</span>
            <span className={"ml-auto"}>📅 {commentDate}</span>
          </div>
          <div className="flex flex-row justify-end gap-2 mt-2">
            <button
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => {
                setIsEditing(false);
                setShowPopover(false);
                setCommentContent(comment.content);
              }}
            >
              Cancelar
            </button>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => {
                handleSaveComment();
                setIsEditing(false);
              }}
            >
              Salvar
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm flex flex-col gap-2">
          <div className="flex flex-row justify-between items-start">
            <p className="text-gray-700 p-2 dark:text-gray-300">{commentContent}</p>

            <button
              ref={buttonRef}
              className="text-2xl text-gray-900 dark:text-white"
              onClick={() => setShowPopover(!showPopover)}
            >
              ...
            </button>
          </div>
          <div className="flex flex-row justify-between text-sm text-gray-500">
            <span>Publicado por: {comment.user?.name ?? comment.user?.id}</span>
            <span className={"ml-auto"}>📅 {commentDate}</span>
          </div>
        </div>
      )}


      {showPopover && (
        <div
          ref={popoverRef}
          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 py-1"
        >
          <button
            onClick={handleEditClick}
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}