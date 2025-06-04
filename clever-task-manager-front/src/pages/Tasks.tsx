
import { useEffect, useState } from "react";
import { Tab, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TaskCard from "@/components/TaskCard";
import NewTaskForm from "@/components/NewTaskForm";
import { getTasks, Task } from "@/services/api";

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      setError("Não foi possível carregar as tarefas. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const todoTasks = tasks.filter((task) => task.status === "TODO");
  const inProgressTasks = tasks.filter((task) => task.status === "IN_PROGRESS");
  const doneTasks = tasks.filter((task) => task.status === "DONE");

  const handleTaskCreated = () => {
    fetchTasks();
  };

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold mb-6">Minhas Tarefas</h1>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-800 p-4 rounded-md">
              {error}
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="all">Todas ({tasks.length})</TabsTrigger>
                <TabsTrigger value="todo">A Fazer ({todoTasks.length})</TabsTrigger>
                <TabsTrigger value="in-progress">Em Progresso ({inProgressTasks.length})</TabsTrigger>
                <TabsTrigger value="done">Concluídas ({doneTasks.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                {tasks.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-md">
                    <p className="text-gray-500">Nenhuma tarefa encontrada. Crie uma nova tarefa!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {tasks.map((task) => (
                      <TaskCard key={task.id} task={task} onTaskUpdated={handleTaskUpdated} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="todo">
                {todoTasks.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-md">
                    <p className="text-gray-500">Nenhuma tarefa a fazer.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {todoTasks.map((task) => (
                      <TaskCard key={task.id} task={task} onTaskUpdated={handleTaskUpdated} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="in-progress">
                {inProgressTasks.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-md">
                    <p className="text-gray-500">Nenhuma tarefa em progresso.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {inProgressTasks.map((task) => (
                      <TaskCard key={task.id} task={task} onTaskUpdated={handleTaskUpdated} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="done">
                {doneTasks.length === 0 ? (
                  <div className="text-center py-10 bg-gray-50 rounded-md">
                    <p className="text-gray-500">Nenhuma tarefa concluída.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {doneTasks.map((task) => (
                      <TaskCard key={task.id} task={task} onTaskUpdated={handleTaskUpdated} />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Nova Tarefa</CardTitle>
            </CardHeader>
            <CardContent>
              <NewTaskForm onTaskCreated={handleTaskCreated} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
