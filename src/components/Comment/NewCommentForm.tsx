'use client';
import TextArea from "@/components/Form/TextArea";
import React, {useState} from "react";
import Button from "@/components/Form/Button";
import {createComment} from "@/services/commentService";
import Cookies from "js-cookie";
import {handleRequestError} from "@/lib/toast";
import {useRouter} from "next/navigation";

export default function NewCommentForm({postId}: { postId: number }) {
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) : Promise<void> => {
    event.preventDefault();

    if (!content.trim()) {
      return;
    }

    try {
      const userEmail = Cookies.get('user_email');
      if (!userEmail) {
        handleRequestError(new Error("Usuário não autenticado"));
        return;
      }

      await createComment(content, postId, userEmail);

      setContent('');
      router.refresh();
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
    }
  }

  return (
    <form className={'m-0 p-0 flex flex-col'} onSubmit={handleSubmit}>
      <TextArea
        id={'content'}
        label={''}
        placeholder={''}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={5}
      />
      <div className="flex justify-end mt-2 gap-2">
        <div className={'w-40'}>
        <Button type="submit">Comentar</Button>
      </div>
      </div>
    </form>
  )
}
