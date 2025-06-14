// app/(main)/profile/edit/page.tsx
'use client';

import React, { useState } from 'react';

import Input from '@/components/Form/TextInput';
import Button from '@/components/Form/Button';
import Surface from '@/components/Surface/Surface';

export default function EditProfilePage() {

  const [formData, setFormData] = useState({
    name: 'Fulano da Silva',
    email: 'fulano.silva@email.com',
    bio: 'Desenvolvedor Frontend apaixonado por React e novas tecnologias. Gosto de café e de criar interfaces incríveis.',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <Surface className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Editar Perfil</h1>

      <form className="space-y-2">

        <Input
          id="name"
          label="Nome"
          type="text"
          placeholder="Seu nome completo"
          value={formData.name}
          onChange={handleInputChange}
        />

        <div>
          <label htmlFor="email" className={"block text-sm font-medium mb-1"}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            readOnly
            disabled
            className="w-full border border-gray-300 bg-gray-100 rounded-lg px-3 py-2 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.bio}
            onChange={handleTextAreaChange}
            placeholder="Fale um pouco sobre você"
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" onClick={(e) => e.preventDefault()}>
            Salvar Alterações
          </Button>
        </div>
      </form>
    </Surface>
  );
}
