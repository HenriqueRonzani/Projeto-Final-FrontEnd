import {getPostById} from "@/services/postService";
import Surface from "@/components/Surface/Surface";
import PostComponent from "@/components/Post/Post";

export default async function PostPage({ params }: { params: { id: string}}) {
  try {
    const { id } = params;
    const numericId = parseInt(id, 10);
    const post = await getPostById(numericId);

    return (
      <Surface title="Posts">
        <div className="flex flex-col gap-5">
          <div>
            <PostComponent post={post} disableRedirect={true} />
          </div>
        </div>

        {/* TODO: Add coments section aqui!*/}
      </Surface>
    );
  } catch {
    return (
      <Surface title="Posts">
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="text-2xl font-bold">Erro ao carregar o post</h1>
          </div>
        </div>
      </Surface>
    );
  }
}
