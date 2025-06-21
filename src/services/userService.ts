import axios from "axios";
import {User} from "@/types";

const API_BASE_URL = 'http://localhost:3001';

export async function getUsers() : Promise<User[]> {
  const response = await axios.get(API_BASE_URL + '/users');
  if (response.status !== 200) {
    throw new Error('Erro ao buscar usuários');
  }
  return response.data;
}

export async function createUser (name: string, role: string, email: string, password: string): Promise<User | null> {
  const response = await axios.post(API_BASE_URL + '/users', {
    name,
    role,
    email,
    password
  });

  if (response.status !== 201) {
    throw new Error('Erro ao registrar usuário');
  }

  return response.data;
}

export async function getUserByEmail(email: string) : Promise<User[]> {
  const response = await axios.get(API_BASE_URL + '/users/', {
    params: {
      email
    }
  });

  if (response.status !== 200) {
    throw new Error('Erro ao buscar usuário');
  }

  return response.data;
}

export async function loginUser (email: string, password: string): Promise<User | null> {
  const users = await getUserByEmail(email);

  if (!users || users.length === 0) {
    throw new Error('Usuário não encontrado ou senha incorreta');
  }

  // Converte pra string para evitar problemas de comparação
  if (`${users[0].password}` !== `${password}`) {
    throw new Error('Usuário não encontrado ou senha incorreta');
  }

  return users[0];
}

export async function registerUser (name: string, role: string, email: string, password: string): Promise<User | null> {
  const userWithEmail = await getUserByEmail(email);

  if (userWithEmail && userWithEmail.length > 0) {
    throw new Error('E-mail já cadastrado');
  }

  return createUser(name, role, email, password);
}
