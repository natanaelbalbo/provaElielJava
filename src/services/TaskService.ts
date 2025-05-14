import { Task, TaskStatus } from '../models/Task';
import { v4 as uuidv4 } from 'uuid';

interface TaskStorage {
    [key: string]: Task;
}

export class TaskService {
    private tasks: TaskStorage = {};

    create(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
        const newTask: Task = {
            ...task,
            id: uuidv4(),
            createdAt: new Date(),
            updatedAt: new Date()
        };
        if (newTask.id) {
            this.tasks[newTask.id] = newTask;
        }
        return newTask;
    }

    getAll(): Task[] {
        return Object.values(this.tasks);
    }

    updateStatus(id: string, status: TaskStatus): Task | null {
        const task = this.tasks[id];
        if (!task) return null;

        const updatedTask: Task = {
            ...task,
            status,
            updatedAt: new Date()
        };
        this.tasks[id] = updatedTask;
        return updatedTask;
    }

    delete(id: string): boolean {
        if (!this.tasks[id]) return false;
        delete this.tasks[id];
        return true;
    }

    getById(id: string): Task | null {
        return this.tasks[id] || null;
    }
}
