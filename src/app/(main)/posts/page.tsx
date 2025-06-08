import { getPosts } from "@/services/postService";
import { Post } from "@/types";
import Surface from "@/components/Surface/Surface";
import PostComponent from "@/components/Post/Post";

export default async function PostPage() {
    const posts: Post[] = await getPosts();
    console.log(posts);
    return (
        <Surface title="Posts">
            {posts.map(post => (
                <PostComponent key={post.id} {...post} />
            ))}
        </Surface>
    );
}
