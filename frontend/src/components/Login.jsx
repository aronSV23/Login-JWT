import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contraseña }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        console.error("Error al iniciar sesión:", data.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col">
              <label>Usuario:</label>
              <input
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Contraseña:</label>
              <input
                className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
