"use client";

import Button from "@/components/Form/Button";
import TextInput from "@/components/Form/TextInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {loginUser} from "@/services/userService";
import {handleRequestError} from "@/lib/toast";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await loginUser(email, password);

      if (user) {
        Cookies.set('user_email', user.email, { expires: 7 });
        router.push("/");
        return;
      }

      handleRequestError(new Error("Usuário não encontrado ou senha incorreta"));
    } catch (error) {
      handleRequestError(error);
    }
  };

  return (
    <div className={"flex items-center justify-center min-h-screen bg-amber-50 dark:bg-background"}>
      <div className={"bg-white dark:bg-gray-900 p-7 rounded-lg w-4/4 max-w-sm"}>
        <h2 className={"text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white"}>Login</h2>

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
            id="password"
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={true}
          />

          <Button type="submit">Login</Button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-900 dark:text-white">
          Não possui uma conta?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
