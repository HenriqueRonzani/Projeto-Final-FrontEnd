export type User = {
    id: number;
    name: string;
    email: string;
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
