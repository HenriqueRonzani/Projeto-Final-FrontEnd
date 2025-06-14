"use client";

import Surface from "@/components/Surface/Surface";
import TextInput from "@/components/Form/TextInput";
import React, {useState} from "react";
import TextArea from "@/components/Form/TextArea";
import Button from "@/components/Form/Button";
import {createPost} from "@/services/postService";
import Cookies from "js-cookie";
import {handleRequestError, handleRequestSuccess} from "@/lib/toast";
import {useRouter} from "next/navigation";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userEmail = Cookies.get('user_email');
      if (!userEmail) {
        handleRequestError(new Error("Usuário não autenticado"));
        return;
      }
      await createPost(title, content, userEmail);

      setTitle("");
      setContent("");
      handleRequestSuccess('Post criado com sucesso!');
      router.push('/posts');
    } catch (e) {
      handleRequestError(e)
    }
  }
  return (
    <Surface title={"Novo Post"}>
      <form className={'h-full'} onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <TextInput
            id={'title'}
            label={'Título'}
            type={'text'}
            placeholder={'Digite o título do post'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            id={'content'}
            label={'Conteúdo'}
            placeholder={''}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={'h-100'}
            rows={30}
          />
        </div>
        <div className={'w-40'}>
          <Button type="submit">Criar Post</Button>
        </div>
      </form>
    </Surface>
  )
}
