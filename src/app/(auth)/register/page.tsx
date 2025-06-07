"use client";

import Button from "@/components/Form/Button";
import TextInput from "@/components/Form/Input";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setError("");
    console.log("Dados registrados:", { email, role, password });
    alert("Cadastro feito com sucesso!");
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
          />

          <div className={"mb-4"}>
            <label htmlFor="role" className={"block text-sm font-medium mb-1"}>
              Tipo
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={"w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"}
            >
              <option value="">Selecione um tipo</option>
              <option value="estudante">Estudante</option>
              <option value="professor">Professor</option>
              <option value="diretor">Diretor</option>
              <option value="coordenador">Coordenador</option>
            </select>
          </div>

          <TextInput
            id="password"
            label="Senha"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextInput
            id="confirm-password"
            label="Confirmar Senha"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error}
          />

          <Button type="submit">Registrar</Button>
        </form>
        
      </div>
    </div>
  );
}
