
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Gerencie suas tarefas com <span className="text-primary">TaskPro</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10">
            Organize suas atividades, acompanhe seu progresso e aumente sua produtividade com o TaskPro.
            Uma solução simples e eficiente para gerenciar suas tarefas diárias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link to="/tarefas">Minhas Tarefas</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/registro">Criar Conta</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Já tenho uma conta</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Crie Tarefas</h3>
            <p className="text-gray-600">
              Adicione facilmente novas tarefas com título, descrição e status.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Acompanhe Progresso</h3>
            <p className="text-gray-600">
              Atualize o status das suas tarefas conforme você avança no trabalho.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Complete Tarefas</h3>
            <p className="text-gray-600">
              Marque suas tarefas como concluídas e celebre suas conquistas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
