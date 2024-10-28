import { useState } from "react";
import { Button } from "primereact/button"; // Importar el botón correctamente
import { InputText } from "primereact/inputtext"; // Asegúrate de esta importación
import { useAuth } from "../AuthContext"; // Importar el contexto
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Obtener la función de login del contexto
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      // Aquí puedes manejar la respuesta de autenticación, como guardar un token
      // Si la autenticación es exitosa
      login(); // Cambiar el estado a autenticado
      navigate("/dashboard"); // Navegar al Dashboard
    } catch (error) {
      console.error("Error en el login", error);
    }
  };

  return (
    <div
      className="p-d-flex p-ai-center p-jc-center"
      style={{ height: "100vh" }}
    >
      <form onSubmit={handleLogin} className="p-fluid">
        <div className="p-field">
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password</label>
          <InputText
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" label="Login" />
      </form>
    </div>
  );
}
