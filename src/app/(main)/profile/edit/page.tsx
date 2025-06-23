// src/app/(main)/profile/edit/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Biblioteca para ler cookies, já está no seu projeto!
import { Toaster, toast } from 'sonner'; // Biblioteca de notificações, também já está no seu projeto.

// Nossos componentes e serviços
import Input from '@/components/Form/TextInput';
import Button from '@/components/Form/Button';
import Surface from '@/components/Surface/Surface';
import { getUserByEmail, updateUser } from '@/services/userService'; // Importamos as funções que vamos usar
import { User } from '@/types';

export default function EditProfilePage() {
  // Estado para guardar os dados do usuário logado
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Estado para controlar os dados do formulário
  const [formData, setFormData] = useState({
    name: '',
    bio: '', // Adicionamos o campo 'bio' que não está no seu tipo User, mas vamos usar
  });

  // Estados para controlar o carregamento da UI
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect para buscar os dados do usuário quando o componente carregar
  useEffect(() => {
    async function fetchUserData() {
      // 1. Lemos o email do cookie, que é como o middleware sabe que estamos logados
      const userEmail = Cookies.get('user_email');

      if (userEmail) {
        try {
          // 2. Buscamos os dados do usuário completo usando o email
          const users = await getUserByEmail(userEmail);
          if (users && users.length > 0) {
            const user = users[0];
            setCurrentUser(user); // Guardamos o usuário completo (com ID)
            // 3. Preenchemos o formulário com os dados reais do banco (db.json)
            setFormData({
              name: user.name,
              // @ts-ignore - o campo 'bio' não existe no tipo User, mas existe no seu db.json
              bio: user.bio || '', 
            });
          }
        } catch (error) {
          toast.error("Erro ao carregar seus dados.");
        } finally {
          setIsFetching(false); // Terminamos o carregamento inicial
        }
      } else {
        // Se por algum motivo não achar o cookie, para de carregar. 
        // O middleware já deveria ter redirecionado, mas é uma segurança extra.
        setIsFetching(false);
      }
    }

    fetchUserData();
  }, []); // O array vazio [] faz com que isso rode apenas uma vez

  // Funções para atualizar o estado do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o recarregamento da página

    if (!currentUser) {
      toast.error("Usuário não encontrado. Por favor, faça login novamente.");
      return;
    }

    setIsSubmitting(true); // Desabilita o botão de salvar

    try {
      // 4. Chamamos nosso novo serviço para atualizar o usuário com os dados do formulário
      await updateUser(currentUser.id, {
        name: formData.name,
        // @ts-ignore
        bio: formData.bio,
      });

      // 5. Damos um feedback de sucesso!
      toast.success("Perfil atualizado com sucesso!");

    } catch (error) {
      toast.error("Não foi possível salvar as alterações.");
    } finally {
      setIsSubmitting(false); // Reabilita o botão
    }
  };

  // Enquanto busca os dados, mostramos uma mensagem de carregamento
  if (isFetching) {
    return <Surface className="max-w-2xl mx-auto p-8 text-center">Carregando perfil...</Surface>;
  }

  return (
    <>
      {/* Componente necessário para as notificações do 'sonner' aparecerem */}
      <Toaster richColors position="top-right" />
      <Surface className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Editar Perfil</h1>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* O email não é editável, então exibimos o do usuário logado */}
          <Input
            id="name"
            label="Nome"
            type="text"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={handleInputChange}
          />

          <div>
            <label htmlFor="email" className={"block text-sm font-medium mb-1"}>Email</label>
            <input
              id="email"
              type="email"
              value={currentUser?.email || ''} // Mostra o email do usuário logado
              readOnly
              disabled
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Fale um pouco sobre você"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </Surface>
    </>
  );
}