import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
    private taskService: TaskService;

    constructor() {
        this.taskService = new TaskService();
    }

    create = async (req: Request, res: Response) => {
        try {
            const { title, description, status } = req.body;
            const userId = req.user?.id;

            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }

            const task = await this.taskService.create({
                title,
                description,
                status,
                userId
            });
            
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao criar tarefa' });
        }
    };

    getAll = async (req: Request, res: Response) => {
        try {
            const userId = req.user?.id;
            
            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }
            
            const tasks = await this.taskService.getAll(userId);
            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar tarefas' });
        }
    };

    updateStatus = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const userId = req.user?.id;
            
            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }
            
            const updatedTask = await this.taskService.updateStatus(id, status, userId);
            
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
            const userId = req.user?.id;
            
            if (!userId) {
                return res.status(401).json({ error: 'Usuário não autenticado' });
            }
            
            const deleted = await this.taskService.delete(id, userId);
            
            if (!deleted) {
                return res.status(404).json({ error: 'Tarefa não encontrada' });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar tarefa' });
        }
    };
}
