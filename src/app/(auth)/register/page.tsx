"use client";


import Button from "@/components/Form/Button";
import TextInput from "@/components/Form/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { handleRequestError } from "@/lib/toast";
import { registerUser } from "@/services/userService";
import Cookies from "js-cookie";
import SelectInput from "@/components/Form/select";

export default function Register() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      handleRequestError(new Error("Senhas não coincidem"));
      return;
    }

    try {
      const user = await registerUser(name, role, email, password);

      if (user) {
        Cookies.set('user_email', user.email, { expires: 7 });
        router.push("/");
        return;
      }

      handleRequestError(new Error("Erro ao registrar usuário"));
    } catch (error) {
      handleRequestError(error);
    }
  };

  return (
    <div className={"flex items-center justify-center min-h-screen bg-background"}>
      <div className={"bg-surface p-7 rounded-lg w-4/4 max-w-sm"}>
        <h2 className={"text-2xl font-bold mb-6 text-center"}>Registrar</h2>

        <form onSubmit={handleSubmit}>
          <TextInput
            id="email"
            label="E-mail"
            type="email"
            placeholder="nome@exemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />

          <TextInput
            id="name"
            label="Nome"
            type="text"
            placeholder="Seu nome..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
          />

          <SelectInput
            id="role"
            label="Tipo"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required={true}
            options={[
              { value: "student", caption: "Estudante" },
              { value: "teacher", caption: "Professor" },
              { value: "principal", caption: "Diretor" },
              { value: "coordinator", caption: "Coordenador" },
            ]}
          />


          <TextInput
            id="password"
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />

          <TextInput
            id="confirm-password"
            label="Confirmar Senha"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required={true}
          />

          <Button type="submit">Registrar</Button>
        </form>

        <p className="text-sm text-center mt-4">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
