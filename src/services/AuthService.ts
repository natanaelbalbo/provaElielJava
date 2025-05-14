import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface UserStorage {
    [key: string]: User;
}

export class AuthService {
    private users: UserStorage = {};
    private readonly JWT_SECRET = 'sua_chave_secreta_jwt'; // Em produção, use variáveis de ambiente

    async register(username: string, password: string): Promise<User | null> {
        // Verificar se o usuário já existe
        const userExists = Object.values(this.users).find(user => user.username === username);
        if (userExists) {
            return null;
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar novo usuário
        const newUser: User = {
            id: uuidv4(),
            username,
            password: hashedPassword,
            createdAt: new Date()
        };

        if (newUser.id) {
            this.users[newUser.id] = newUser;
        }

        // Retornar usuário sem a senha
        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword as User;
    }

    async login(username: string, password: string): Promise<string | null> {
        // Encontrar usuário pelo username
        const user = Object.values(this.users).find(user => user.username === username);
        if (!user) {
            return null;
        }

        // Verificar a senha
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return null;
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: user.id, username: user.username },
            this.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return token;
    }

    validateToken(token: string): { id: string; username: string } | null {
        try {
            return jwt.verify(token, this.JWT_SECRET) as { id: string; username: string };
        } catch (error) {
            return null;
        }
    }
}
