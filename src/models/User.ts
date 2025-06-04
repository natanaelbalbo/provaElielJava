import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

export interface UserAttributes {
    id?: string;
    username: string;
    password: string;
    createdAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!: string;
    public username!: string;
    public password!: string;
    public createdAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;
