'use client';
import { Post } from "@/types";
import Link from "next/link";
import DeletePostModal from "@/components/Post/DeleteModal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

interface PostComponentProps {
  userEmail: string | undefined;
  post: Post;
  disableRedirect?: boolean;
}

export default function PostComponent({ userEmail, post, disableRedirect = false }: PostComponentProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const postDate = new Date(post.publishedAt).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [Likes, setLike] = useState(0);
  const [Dislikes, setDislike] = useState(0);
  const [userVote, setUserVote] = useState<null | 'like' | 'dislike'>(null);

  const openDeleteModal = () => {
    setIsDeleting(true);
  };

  const closeDeleteModal = () => {
    setIsDeleting(false);
  };

  const handleLike = () => {
    if (userVote === null) {
      setLike(prev => prev + 1);
      setUserVote('like');
    } else if (userVote === 'dislike') {
      setDislike(prev => prev - 1);
      setLike(prev => prev + 1);
      setUserVote('like');
    }
  };

  const handleDislike = () => {
    if (userVote === null) {
      setDislike(prev => prev + 1);
      setUserVote('dislike');
    } else if (userVote === 'like') {
      setLike(prev => prev - 1);
      setDislike(prev => prev + 1);
      setUserVote('dislike');
    }
  };

  const PostHeader = (
    <div className="flex flex-col gap-1">
      <span className="text-2xl font-bold text-gray-900 dark:text-white">{post.title}</span>
      <span className="text-sm text-gray-500">
        Publicado por: {post.user?.email === userEmail ? 'Você' : post.user?.name ?? post.user?.id}
      </span>
    </div>
  );

  return (
    <div className="p-5 flex flex-col bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-all gap-2">
      <div className='flex flex-row justify-between'>
        {!disableRedirect ? (
          <Link href={`/posts/${post.id}`} className="hover:underline">
            {PostHeader}
          </Link>
        ) : (
          PostHeader
        )}
        {
          post.user?.email === userEmail && (
            <div className='flex flex-row gap-2 items-start'>
              <Link href={`/posts/${post.id}/edit`} className="text-blue-600 hover:underline">
                Editar
              </Link>
              <span className="text-blue-600 hover:underline" onClick={openDeleteModal}>
                Excluir
              </span>
              <DeletePostModal isOpen={isDeleting} onClose={closeDeleteModal} postId={post.id} />
            </div>
          )
        }
      </div>

      <div className="bg-background rounded-2xl p-4 text-gray-700 dark:text-gray-300">
        <p className="whitespace-pre-line">{post.content}</p>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        {!disableRedirect && (
          <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
            Ver comentários
          </Link>
        )}

        <div className="flex items-center gap-4 ml-4">
          <div className="flex items-center gap-1">
            <button 
              onClick={handleLike} 
              className={`hover:underline flex items-center gap-1 ${userVote === 'like' ? 'text-blue-400' : 'text-blue-600'}`}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
              <span>Like</span>
            </button>
            <span>{Likes}</span>
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={handleDislike} 
              className={`hover:underline flex items-center gap-1 ${userVote === 'dislike' ? 'text-red-400' : 'text-red-600'}`}
            >
              <FontAwesomeIcon icon={faThumbsDown} />
              <span>Dislike</span>
            </button>
            <span>{Dislikes}</span>
          </div>
        </div>

        <span className={'ml-auto'}>📅 {postDate}</span>
      </div>
    </div>
  );
}
