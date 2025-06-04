import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import User from './User';

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface TaskAttributes {
    id?: string;
    title: string;
    description: string;
    status: TaskStatus;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
    public id!: string;
    public title!: string;
    public description!: string;
    public status!: TaskStatus;
    public userId!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Task.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('TODO', 'IN_PROGRESS', 'DONE'),
            allowNull: false,
            defaultValue: 'TODO',
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Task',
    }
);

// Definir a relação entre Task e User
Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

export default Task;
