import axios from "axios";
import {Post} from "@/types";

const API_BASE_URL = 'http://localhost:3001';

export async function getPosts() : Promise<Post[]> {
    const response = await axios.get(API_BASE_URL + '/posts');
    if (response.status !== 200) {
        throw new Error('Erro ao buscar usuários');
    }
    return response.data;
}
