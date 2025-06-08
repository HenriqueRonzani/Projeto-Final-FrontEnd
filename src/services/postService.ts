import axios from "axios";
import { Post, User, Comment } from "@/types";

const API_BASE_URL = 'http://localhost:3001';

export async function getPosts(): Promise<Post[]> {
    const [postsRes, usersRes, commentsRes] = await Promise.all([
        axios.get<Post[]>(`${API_BASE_URL}/posts`),
        axios.get<User[]>(`${API_BASE_URL}/users`),
        axios.get<Comment[]>(`${API_BASE_URL}/comments`),
    ]);


    const posts = postsRes.data;
    const users = usersRes.data;
    const comments = commentsRes.data;

    const postsWithUsers = posts.map(post => {

        return {
            ...post,
            user: users.find(u => Number(u.id) === Number(post.userId)),
            comments: comments
                .filter(c => Number(c.postId) === Number(post.id))
                .map(comment => ({
                    ...comment,
                    user: users.find(u => Number(u.id) === Number(comment.userId))
                }))
        };
    }
    );
    return postsWithUsers;
}
