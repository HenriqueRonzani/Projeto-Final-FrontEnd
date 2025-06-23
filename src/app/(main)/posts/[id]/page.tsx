import { getPostWithCommentsById } from "@/services/postService";
import Surface from "@/components/Surface/Surface";
import PostComponent from "@/components/Post/Post";
import CommentComponent from "@/components/Comment/CommentComponent";
import NewCommentForm from "@/components/Comment/NewCommentForm";
import { cookies } from "next/headers";
import { getUserByEmail } from "@/services/userService";
import { parse } from "path";

export default async function PostPage({ params }: { params: { id: string } }) {
  try {
    const numericId = parseInt(params.id, 10);
    const post = await getPostWithCommentsById(numericId);

    const cookieStore = await cookies();
    const userEmail = cookieStore.get('user_email')?.value;

    async function getUserId() {
      if (!userEmail) {
        return null;
      }

      const users = await getUserByEmail(userEmail);
      if (users && users.length > 0) {

        const intId = Number(users[0].id);
        return intId;
      }
      return null;
    }

    const userId = await getUserId();

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
              <PostComponent userEmail={userEmail} post={post} disableRedirect={true} />
            </div>
          </div>

          <div>
            <span className={'text-xl font-bold text-dark dark:text-light'}>Adicionar comentário</span>
            <NewCommentForm postId={numericId} />
          </div>

          <div>
            <span className="text-xl font-bold text-dark dark:text-light">Comentários</span>
            <div className="flex flex-col gap-3">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <CommentComponent key={comment.id}
                    comment={comment}
                    userId={userId}
                  />
                ))
              ) : (
                <p className='text-dark dark:text-light'>Nenhum comentário encontrado.</p>
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
