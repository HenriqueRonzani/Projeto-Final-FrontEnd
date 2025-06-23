export type User = {
    id: number;
    bio?: string;
    name: string;
    role: string;
    email: string;
    password: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    userId: number;
    publishedAt: string;
    user?: User;
    comments?: Comment[];
}

export type Comment = {
    id: number;
    postId: number;
    content: string;
    userId: number;
    publishedAt: string;
    user?: User;
}
