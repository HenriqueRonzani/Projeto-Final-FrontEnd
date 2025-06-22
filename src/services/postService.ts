import axios from "axios";
import {Post} from "@/types";
import {getUserByEmail} from "@/services/userService";
import {getCommentsByPostId} from "@/services/commentService";

const API_BASE_URL = 'http://localhost:3001';

export async function getPosts({param, userEmail} : {param?: string, userEmail?: string} = {}): Promise<Post[]> {
  const params: { [key: string]: string | number } = {
    _expand: 'user',
    _sort: 'publishedAt',
    _order: 'desc',
  };

  if (param && userEmail) {
    const user = await getUserByEmail(userEmail);
    const userId = user ? user[0].id : null;

    if (!userId) {
      throw new Error('Usuário não encontrado');
    }

    params[param] = userId;
  }
  const response = await axios.get(API_BASE_URL + '/posts', {
    params
  });
  if (response.status !== 200) {
    throw new Error('Erro ao buscar posts');
  }

  return response.data;
}

export async function getPostById(id: number): Promise<Post> {
  const response = await axios.get(API_BASE_URL + '/posts/' + id, {
    params: {
      _expand: 'user',
    }
  });

  if (response.status !== 200) {
    throw new Error('Erro ao buscar post');
  }

  return response.data;
}

export async function getPostWithCommentsById(id: number): Promise<Post> {
  const post = await getPostById(id);
  post.comments = await getCommentsByPostId(id);
  return post;
}

export async function createPost(title: string, content: string, email: string): Promise<Post> {
  const user = await getUserByEmail(email);
  const userId = user ? user[0].id : null;

  if (!userId) {
    throw new Error('Usuário não encontrado');
  }

  const response = await axios.post(API_BASE_URL + '/posts', {
    title,
    content,
    userId,
    publishedAt: new Date().toISOString(),
  });

  if (response.status !== 201) {
    throw new Error('Erro ao criar post');
  }

  return response.data;
}

export async function updatePost(id: number, data: Post): Promise<Post> {
  const response = await axios.put(API_BASE_URL + '/posts/' + id,
    data
  );

  if (response.status !== 200) {
    throw new Error('Erro ao atualizar post');
  }

  return response.data;
}

export async function deletePost(id: number): Promise<void> {
  const response = await axios.delete(API_BASE_URL + '/posts/' + id);

  if (response.status !== 200) {
    throw new Error('Erro ao deletar post');
  }
}
