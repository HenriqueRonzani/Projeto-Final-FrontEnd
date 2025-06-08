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
