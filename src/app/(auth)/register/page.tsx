"use client";
import { useState } from "react";

export default function Register() {
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
    console.log("Dados registrados:", { password });
    alert("Cadastro feito com sucesso!");
  };

  return (
    <div className={"flex items-center justify-center min-h-screen bg-background"}>
      <div className={"bg-surface p-7 rounded-lg w-4/4 max-w-sm"}>
        <h2 className={"text-2xl font-bold mb-6 text-center"}>Registrar</h2>

        <form onSubmit={handleSubmit}>
          <div className={"mb-4"}>
            <label className={"block text-sm font-medium mb-1"} htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className={"w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"}
              placeholder="nome@exemplo.com"
            />
          </div>

          <div className={"mb-4"}>
            <label className={"block text-sm font-medium mb-1"} htmlFor="role">Tipo</label>
            <select
              id="role"
              className={"w-full border border-gray-300 rounded-lg px-3 py-2 bg-white"}
            >
              <option value="estudante"> </option>
              <option value="estudante">Estudante</option>
              <option value="professor">Professor</option>
              <option value="diretor">Diretor</option>
              <option value="coordenador">Coordenador</option>
            </select>
          </div>

          <div className={"mb-4"}>
            <label className={"block text-sm font-medium mb-1"} htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div className={"mb-4"}>
            <label className={"block text-sm font-medium mb-1"} htmlFor="confirm-password">Confirmar Senha</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full border ${error ? "border-red-500" : "border-gray-300"
                } rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="••••••••"
            />
            {error && (
              <p className={"text-red-600 text-sm mt-1"}>{error}</p>
            )}
          </div>

          <button
            type="submit"
            className={"w-full bg-green-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"}
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
