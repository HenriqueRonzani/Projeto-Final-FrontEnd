'use client';
import { Post } from "@/types";
import Link from "next/link";

interface PostComponentProps {
  post: Post;
  disableRedirect?: boolean;
}

export default function PostComponent({ post, disableRedirect = false }: PostComponentProps) {
  const postDate = new Date(post.publishedAt).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const PostHeader = (
    <div className="flex flex-col gap-1">
      <span className="text-2xl font-bold text-gray-900 dark:text-white">{post.title}</span>
      <span className="text-sm text-gray-500">
        Publicado por: {post.user?.name ?? post.user?.id}
      </span>
    </div>
  );

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-all">
      {!disableRedirect ? (
        <Link href={`/posts/${post.id}`} className="hover:underline">
          {PostHeader}
        </Link>
      ) : (
        PostHeader
      )}

      <div className="mt-3 text-gray-700 dark:text-gray-300">
        <p className="whitespace-pre-line">{post.content}</p>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        {!disableRedirect ? (
          <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
            Ver comentários
          </Link>
        ) : (
          <span className="text-gray-400">Comentários</span>
        )}
        <span>📅 {postDate}</span>
      </div>
    </div>
  );
}
