import Surface from "@/components/Surface/Surface";
import {Post} from "@/types";
import {cookies} from "next/headers";
import {getPosts} from "@/services/postService";
import {handleRequestError} from "@/lib/toast";
import PostsContainer from "@/components/Post/PostsContainer";
import NewPostButton from "@/components/Post/NewPostButton";

export default async function Dashboard() {
  let posts: Post[] = [];

  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get('user_email')?.value;
    posts = await getPosts({ param: "userId_ne", userEmail: userEmail });
  } catch (e) {
    handleRequestError(e);
  }

  return (
    <Surface title={'Bem vindo de volta!'} headerContent={<NewPostButton />}>
      <PostsContainer posts={posts}  />
    </Surface>
  );
}

