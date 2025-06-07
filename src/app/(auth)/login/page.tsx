export default function Login() {
  return (
    <div className={"flex items-center justify-center min-h-screen bg-background"}>
      <div className={"bg-surface p-7 rounded-lg w-4/4 max-w-sm"}>
        <h2 className={"text-2xl font-bold mb-6 text-center"}>Login</h2>
        <form>
          <div className={"mb-4"}>
            <label className={"block text-sm font-medium mb-1"} htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className={"w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"}
              placeholder="nome@exemplo.com"
            />
          </div>

          <div className={"mb-6"}>
            <label className={"block text-sm font-medium mb-1"} htmlFor="password">Senha:</label>
            <input
              id="password"
              type="password"
              className={"w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={"w-full bg-green-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
