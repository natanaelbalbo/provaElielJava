import { toast } from "sonner";

const API_URL = "http://localhost:3005/api";

interface User {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

interface RegisterResponse {
  id: string;
  username: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
  createdAt: string;
  updatedAt: string;
}

// Autenticação
export const register = async (user: User): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao registrar usuário");
    }
    
    return await response.json();
  } catch (error: any) {
    toast.error(error.message || "Erro ao registrar usuário");
    throw error;
  }
};

export const login = async (user: User): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Credenciais inválidas");
    }
    
    const data = await response.json();
    localStorage.setItem("token", data.token);
    return data;
  } catch (error: any) {
    toast.error(error.message || "Erro ao fazer login");
    throw error;
  }
};

export const logout = (): void => {
  localStorage.removeItem("token");
};

// Tarefas
export const createTask = async (task: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Usuário não autenticado");

    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao criar tarefa");
    }
    
    return await response.json();
  } catch (error: any) {
    toast.error(error.message || "Erro ao criar tarefa");
    throw error;
  }
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Usuário não autenticado");

    const response = await fetch(`${API_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao buscar tarefas");
    }
    
    return await response.json();
  } catch (error: any) {
    toast.error(error.message || "Erro ao buscar tarefas");
    throw error;
  }
};

export const updateTaskStatus = async (id: string, status: Task["status"]): Promise<Task> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Usuário não autenticado");

    const response = await fetch(`${API_URL}/tasks/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao atualizar status da tarefa");
    }
    
    return await response.json();
  } catch (error: any) {
    toast.error(error.message || "Erro ao atualizar status da tarefa");
    throw error;
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Usuário não autenticado");

    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erro ao deletar tarefa");
    }
  } catch (error: any) {
    toast.error(error.message || "Erro ao deletar tarefa");
    throw error;
  }
};
