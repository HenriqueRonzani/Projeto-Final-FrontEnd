'use client';
import { Post } from "@/types";
import Link from "next/link";

interface PostComponentProps {
  userEmail: string | undefined;
  post: Post;
  disableRedirect?: boolean;
}

export default function PostComponent({ userEmail, post, disableRedirect = false }: PostComponentProps) {
  const postDate = new Date(post.publishedAt).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const PostHeader = (
    <div className="flex flex-col gap-1">
      <span className="text-2xl font-bold text-gray-900 dark:text-white">{post.title}</span>
      <span className="text-sm text-gray-500">
        Publicado por: { post.user?.email === userEmail ? 'Você' : post.user?.name ?? post.user?.id }
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
            <div>
              <Link href={`/posts/${post.id}/edit`} className="text-blue-600 hover:underline">
                Editar
              </Link>
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
        <span className={'ml-auto'}>📅 {postDate}</span>
      </div>
    </div>
  );
}
