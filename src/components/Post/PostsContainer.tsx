import Surface from "@/components/Surface/Surface";
import PostComponent from "@/components/Post/Post";
import {Post} from "@/types";
import {cookies} from "next/headers";

interface PostsContainerInterface {
  posts: Post[],
}

export default async function PostsContainer({posts} : PostsContainerInterface) {
  if (posts.length === 0) {
    return <Surface title="Nenhum Post Encontrado">
      <div className="flex items-center justify-center h-full">
        <span className="text-gray-500">Nenhum post encontrado.</span>
      </div>
    </Surface>
  }
  const cookieStore = await cookies();
  const userEmail = cookieStore.get('user_email')?.value;

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} userEmail={userEmail} />
      ))}
    </div>
  )
}
