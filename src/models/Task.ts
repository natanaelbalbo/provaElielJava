export interface Task {
    id?: string;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    createdAt?: Date;
    updatedAt?: Date;
}

export type TaskStatus = Task['status'];
