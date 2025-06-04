
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">TaskPro</Link>
        <nav>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/tarefas" className="text-gray-600 hover:text-primary transition-colors">
                Minhas Tarefas
              </Link>
              <Button variant="outline" onClick={logout}>
                Sair
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-600 hover:text-primary transition-colors">
                Entrar
              </Link>
              <Button asChild>
                <Link to="/registro">Registrar</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
