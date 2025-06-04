
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Task, updateTaskStatus, deleteTask } from "@/services/api";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";

interface TaskCardProps {
  task: Task;
  onTaskUpdated: () => void;
}

const TaskCard = ({ task, onTaskUpdated }: TaskCardProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (status: string) => {
    try {
      setIsUpdating(true);
      await updateTaskStatus(task.id, status as Task["status"]);
      toast.success("Status da tarefa atualizado com sucesso!");
      onTaskUpdated();
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteTask = async () => {
    try {
      setIsDeleting(true);
      await deleteTask(task.id);
      toast.success("Tarefa removida com sucesso!");
      onTaskUpdated();
    } catch (error) {
      console.error("Erro ao remover tarefa:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "task-status-todo";
      case "IN_PROGRESS":
        return "task-status-in-progress";
      case "DONE":
        return "task-status-done";
      default:
        return "task-status-todo";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case "TODO":
        return "A Fazer";
      case "IN_PROGRESS":
        return "Em Progresso";
      case "DONE":
        return "Concluído";
      default:
        return status;
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium">{task.title}</CardTitle>
          <span className={`task-status-badge ${getStatusColor(task.status)}`}>
            {translateStatus(task.status)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{task.description}</p>
        <p className="text-xs text-gray-400 mt-2">
          Criada em: {formatDate(task.createdAt)}
        </p>
        <p className="text-xs text-gray-400">
          Atualizada em: {formatDate(task.updatedAt)}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Select 
          defaultValue={task.status} 
          onValueChange={handleStatusChange} 
          disabled={isUpdating}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Alterar status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODO">A Fazer</SelectItem>
            <SelectItem value="IN_PROGRESS">Em Progresso</SelectItem>
            <SelectItem value="DONE">Concluído</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          variant="destructive" 
          onClick={handleDeleteTask} 
          disabled={isDeleting}
        >
          {isDeleting ? "Removendo..." : "Remover"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
