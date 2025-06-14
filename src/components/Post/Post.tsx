'use client';
import {Post} from "@/types";
import Link from "next/link";

interface PostComponentProps {
  post: Post;
  disableRedirect?: boolean; // Prop opcional
}

export default function PostComponent({post, disableRedirect = false}: PostComponentProps) {
  const headerContent = (
    <div className="flex flex-row gap-2 m-1">
      <span className="text-4xl font-bold">
        {post.title}
      </span>
      <span className="text-xs ml-auto mt-auto text-slate-500">
        Publicado por: {post?.user?.name ?? post?.user?.id}
      </span>
    </div>
  )
  return (
    <div className="py-5 flex flex-col gap-5">
      {!disableRedirect ? (
        <Link href={`/posts/${post.id}`}>
          {headerContent}
        </Link>
      ) : headerContent
      }

      <div className="w-full p-5 mx-2 bg-slate-900 rounded-2xl">
        <p>{post.content}</p>
      </div>

      <div className={"flex flex-row"}>
        {!disableRedirect ? (
          <Link href={`/posts/${post.id}`} className={"text-blue-500"}>
            Comentários
          </Link>
        ) : (
          <span>
          Comentários
        </span>
        )}

        <span className="text-xs ml-auto mt-auto text-gray-600">
        Data: {new Date(post.publishedAt).toLocaleDateString("pt-BR", {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </span>
      </div>

    </div>
  );
}
