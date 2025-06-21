import {Comment} from "@/types";

type CommentProps = {
  comment: Comment;
}

export default function CommentComponent({comment} : CommentProps) {
  const commentDate = new Date(comment.publishedAt).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm flex flex-col gap-2">
      <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
      <div className="flex flex-row justify-between text-sm text-gray-500">
        <span>Publicado por: {comment.user?.name ?? comment.user?.id}</span>
        <span className={'ml-auto'}>📅 {commentDate}</span>
      </div>
    </div>
  )
}
