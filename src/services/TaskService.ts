import Task, { TaskStatus } from '../models/Task';

export class TaskService {
    async create(task: { title: string, description: string, status: TaskStatus, userId: string }): Promise<any> {
        try {
            const newTask = await Task.create(task);
            return newTask.toJSON();
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            throw error;
        }
    }

    async getAll(userId: string): Promise<any[]> {
        try {
            const tasks = await Task.findAll({ 
                where: { userId },
                order: [['createdAt', 'DESC']]
            });
            return tasks.map(task => task.toJSON());
        } catch (error) {
            console.error('Erro ao listar tarefas:', error);
            throw error;
        }
    }

    async updateStatus(id: string, status: TaskStatus, userId: string): Promise<any | null> {
        try {
            const task = await Task.findOne({ 
                where: { id, userId }
            });
            
            if (!task) return null;
            
            task.set('status', status);
            task.set('updatedAt', new Date());
            
            await task.save();
            return task.toJSON();
        } catch (error) {
            console.error('Erro ao atualizar status da tarefa:', error);
            throw error;
        }
    }

    async delete(id: string, userId: string): Promise<boolean> {
        try {
            const deleted = await Task.destroy({ 
                where: { id, userId }
            });
            
            return deleted > 0;
        } catch (error) {
            console.error('Erro ao deletar tarefa:', error);
            throw error;
        }
    }

    async getById(id: string, userId: string): Promise<any | null> {
        try {
            const task = await Task.findOne({
                where: { id, userId }
            });
            
            return task ? task.toJSON() : null;
        } catch (error) {
            console.error('Erro ao buscar tarefa por ID:', error);
            throw error;
        }
    }
}
