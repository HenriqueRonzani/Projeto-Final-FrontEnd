'use client';

import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import {toast} from 'sonner';

import Input from '@/components/Form/TextInput';
import Button from '@/components/Form/Button';
import Surface from '@/components/Surface/Surface';
import {getUserByEmail, updateUser} from '@/services/userService';
import {User} from '@/types';
import TextArea from "@/components/Form/TextArea";

export default function EditProfilePage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
  });

  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      const userEmail = Cookies.get('user_email');

      if (userEmail) {
        try {
          const users = await getUserByEmail(userEmail);
          if (users && users.length > 0) {
            const user = users[0];
            setCurrentUser(user);
            setFormData({
              name: user.name,
              bio: user.bio || '',
            });
          }
        } catch (error) {
          toast.error("Erro ao carregar seus dados.");
        } finally {
          setIsFetching(false);
        }
      } else {
        setIsFetching(false);
      }
    }

    void fetchUserData();
  }, []);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {id, value} = e.target;
    setFormData(prev => ({...prev, [id]: value}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Usuário não encontrado. Por favor, faça login novamente.");
      return;
    }

    setIsSubmitting(true);

    try {
      await updateUser(currentUser.id, {
        name: formData.name,
        bio: formData.bio,
      });

      toast.success("Perfil atualizado com sucesso!");

    } catch (error) {
      toast.error("Não foi possível salvar as alterações.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFetching) {
    return <Surface className="max-w-2xl mx-auto p-8 text-center">Carregando perfil...</Surface>;
  }

  return (
    <Surface className="max-w-2xl mx-auto" title='Editar Perfil'>

      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          id="name"
          label="Nome"
          type="text"
          placeholder="Seu nome completo"
          value={formData.name}
          onChange={handleInputChange}
        />

        <Input
          id="email"
          type="email"
          label="Email"
          value={currentUser?.email || ''}
          placeholder="Seu email"
          readonly
          disabled
          onChange={() => {
          }}
          className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
        />

        <TextArea
          id="bio"
          name="bio"
          rows={4}
          label='Bio'
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Fale um pouco sobre você"
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </form>
    </Surface>
  );
}