import {getPostWithCommentsById} from "@/services/postService";
import Surface from "@/components/Surface/Surface";
import PostComponent from "@/components/Post/Post";
import CommentComponent from "@/components/Comment/CommentComponent";
import NewCommentForm from "@/components/Comment/NewCommentForm";

export default async function PostPage({params}: { params: { id: string } }) {
  try {
    const numericId = parseInt(params.id, 10);
    const post = await getPostWithCommentsById(numericId);

    if (!post) {
      return (
        <Surface title="Posts">
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-bold">Post não encontrado</h1>
            </div>
          </div>
        </Surface>
      );
    }

    return (
      <Surface title="Posts">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5">
            <div>
              <PostComponent post={post} disableRedirect={true}/>
            </div>
          </div>

          <div>
            <span className={'text-xl font-bold'}>Adicionar comentário</span>
            <NewCommentForm postId={numericId}/>
          </div>

          <div>
            <span className="text-xl font-bold">Comentários</span>
            <div className="flex flex-col gap-3">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <CommentComponent key={comment.id} comment={comment}/>
                ))
              ) : (
                <p>Nenhum comentário encontrado.</p>
              )}
            </div>
          </div>
        </div>
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
