'use client';
import { useState } from "react";
import { Post, User, Comment } from "@/types";

interface PostComponentProps {
    id: number;
    title: string;
    content: string;
    user?: User;
    comments?: Comment[];
    allUsers?: User[];
}

export default function PostComponent({
    id,
    title,
    content,
    user,
    comments = [],
}: PostComponentProps) {
    const API_BASE_URL = 'http://localhost:3001';

    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() === '') return;

        const newCommentData: Comment = {
            id: Date.now(),
            postId: id,
            content: newComment,
            userId: user?.id || 0,
        };

        fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCommentData),
        })

        setNewComment('');
    };

    return (
        <div className="p-10 flex flex-col gap-5 border border-slate-700 rounded-2xl">
            <div className="flex flex-row gap-2 m-1">
                <span className="text-4xl font-bold">{title}</span>
                <span className="text-xs ml-auto mt-auto text-slate-500">
                    Publicado por: {user?.name ?? user?.id}
                </span>
            </div>

            <div className="w-full p-5 mx-2 bg-slate-900 rounded-2xl">
                <p>{content}</p>
            </div>

            <div className="p-5 bg-slate-800 rounded-xl">
                <h3 className="text-xl mb-2">Comentários</h3>
                <ul className="flex flex-col gap-2">
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <li key={comment.id} className="bg-slate-700 p-2 rounded-lg">
                                <strong>{comment.user?.name}:</strong> {comment.content}
                            </li>
                        ))
                    ) : (
                        <p className="text-slate-400">Nenhum comentário ainda.</p>
                    )}
                </ul>

                <div className="mt-4 flex flex-col gap-2">
                    <textarea
                        className="bg-slate-900 text-white p-2 rounded-lg resize-none"
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escreva um comentário..."
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg text-white"
                        onClick={handleAddComment}
                    >
                        Comentar
                    </button>
                </div>
            </div>
        </div>
    );
}
