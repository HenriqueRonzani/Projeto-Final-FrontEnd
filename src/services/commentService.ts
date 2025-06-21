import axios from 'axios';
import {getUserByEmail} from "@/services/userService";

const API_BASE_URL = 'http://localhost:3001';

export const createComment = async (content: string, postId: number, userEmail: string)  => {
  const user = await getUserByEmail(userEmail);
  const userId = user ? user[0].id : null;

  if (!userId) {
    throw new Error('Usuário não encontrado');
  }

  const response = await axios.post(API_BASE_URL + '/comments' + '?_expand=user', {
    content,
    postId,
    userId,
    publishedAt: new Date().toISOString(),
  });

  if (response.status !== 201) {
    throw new Error('Erro ao criar comentário');
  }

  return response.data;
}

export const getCommentsByPostId = async (postId: number) => {
  const response = await axios.get(API_BASE_URL + '/comments' + `?postId=${postId}` + '&_expand=user' + '&_sort=publishedAt&_order=desc');
  if (response.status !== 200) {
    throw new Error('Erro ao buscar comentários');
  }
  return response.data;
}
