import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const createComment = async (content: string, postId: number, userId: number)  => {
  const response = await axios.post(API_BASE_URL + '/comments' + '?_expand=user', {
    content,
    postId,
    userId
  });

  if (response.status !== 201) {
    throw new Error('Erro ao criar comentário');
  }

  return response.data;
}
