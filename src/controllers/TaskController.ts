import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const task = this.taskService.create(req.body);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao criar tarefa' });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const tasks = this.taskService.getAll();
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar tarefas' });
        }
    };

    updateStatus = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedTask = this.taskService.updateStatus(id, status);
            
            if (!updatedTask) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }

            res.json(updatedTask);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao atualizar status' });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deleted = this.taskService.delete(id);
            
            if (!deleted) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar tarefa' });
        }
    };
}
