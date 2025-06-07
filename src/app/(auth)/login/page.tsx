export default function Login() {
    return (
      <div className={"flex items-center justify-center min-h-screen bg-gray-100"}>
        <div className={"bg-white p-7 shadow-xl w-4/4 max-w-sm"}>
          <h2 className={"text-2xl font-bold mb-6 text-center"}>Login</h2>
          <form>
            <div className={"mb-4"}>
              <label className={"block text-sm font-medium mb-1"} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={"w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                placeholder="you@example.com"
              />
            </div>
  
            <div className={"mb-6"}>
              <label className={"block text-sm font-medium mb-1"} htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className={"w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                placeholder="••••••••"
              />
            </div>
  
            <button
              type="submit"
              className={"w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  