import Surface from "@/components/Surface/Surface";
import {getPostById} from "@/services/postService";
import PostForm from "@/components/Post/PostForm";

export default async function EditPostPage({params}: { params: { id: string } }) {
  const numericId = parseInt(params.id, 10);
  const post = await getPostById(numericId)
  return (
    <Surface
      title={"Editar Post"}
    >
      <PostForm post={post} isEditing={true}></PostForm>
    </Surface>
  )
}
