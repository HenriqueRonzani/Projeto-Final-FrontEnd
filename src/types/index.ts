export type User = {
    id: number;
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
    user?: User;
    comments?: Comment[];
}


export type Comment = {
    id: number;
    postId: number;
    content: string;
    userId: number;
    user?: User;
}
