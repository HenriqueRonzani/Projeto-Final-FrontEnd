"use client";

import TextInput from "@/components/Form/TextInput";
import TextArea from "@/components/Form/TextArea";
import Button from "@/components/Form/Button";
import React, {useState} from "react";
import Cookies from "js-cookie";
import {handleRequestError, handleRequestSuccess} from "@/lib/toast";
import {createPost, updatePost} from "@/services/postService";
import {useRouter} from "next/navigation";
import {Post} from "@/types";

interface PostFormProps {
  isEditing?: boolean;
  post?: Post
}

export default function PostForm({isEditing, post}: PostFormProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userEmail = Cookies.get('user_email');
      if (!userEmail) {
        handleRequestError(new Error("Usuário não autenticado"));
        return;
      }

      if (isEditing) {
        if (!post) {
          handleRequestError(new Error("Post não encontrado para edição"));
          return;
        }
        const toSaveData = {
          ...post,
          content: content,
          title: title
        }
        await updatePost(post.id, toSaveData);
      }
      else {
        await createPost(title, content, userEmail);
      }

      handleRequestSuccess('Post salvo com sucesso!');
      router.push('/posts');
    } catch (e) {
      handleRequestError(e)
    }
  }

  return (
    <form className={'h-full flex flex-col gap-5'} onSubmit={handleSubmit}>
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
      <div className={'w-40'}>
        <Button type="submit">Salvar Post</Button>
      </div>
    </form>
  )
}
