import { getPosts } from "@/services/postService";
import { Post } from "@/types";
import Surface from "@/components/Surface/Surface";
import PostComponent from "@/components/Post/Post";
import Button from "@/components/Form/Button";
import { handleRequestError } from "@/lib/toast";
import NewPostButton from "@/components/Post/NewPostButton";

export default async function PostPage() {
  let posts: Post[] = [];

  try {
    posts = await getPosts();
  } catch (e) {
    handleRequestError(e);
  }

  return (
    <Surface title="Posts" headerContent={<NewPostButton />}>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <PostComponent key={post.id} post={post} />
        ))}
      </div>
    </Surface>

  );
}
