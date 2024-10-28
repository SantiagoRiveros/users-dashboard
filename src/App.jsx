import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { AuthProvider, useAuth } from "./AuthContext"; // Importar el contexto

function App() {
  return (
    <PrimeReactProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute component={Dashboard} />}
            />
          </Routes>
        </Router>
      </AuthProvider>
    </PrimeReactProvider>
  );
}

// Componente para proteger las rutas
const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default App;
