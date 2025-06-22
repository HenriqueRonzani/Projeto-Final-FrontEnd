import { getPosts } from "@/services/postService";
import { Post } from "@/types";
import { handleRequestError } from "@/lib/toast";
import {cookies} from "next/headers";
import PostsContainer from "@/components/Post/PostsContainer";
import NewPostButton from "@/components/Post/NewPostButton";
import Surface from "@/components/Surface/Surface";


export default async function PostPage() {
  let posts: Post[] = [];

  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get('user_email')?.value;
    posts = await getPosts({ param: "userId", userEmail: userEmail });
  } catch (e) {
    handleRequestError(e);
  }

  return (
    <Surface title={'Meus Posts'} headerContent={<NewPostButton />}>
      <PostsContainer posts={posts}  />
    </Surface>
  );
}
