import User from '../models/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthService {
    private readonly JWT_SECRET = 'sua_chave_secreta_jwt'; // Em produção, use variáveis de ambiente

    async register(username: string, password: string): Promise<any | null> {
        try {
            // Verificar se o usuário já existe
            const userExists = await User.findOne({ where: { username } });
            if (userExists) {
                return null;
            }

            // Hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);

            // Criar novo usuário
            const newUser = await User.create({
                username,
                password: hashedPassword
            });

            // Retornar usuário sem a senha
            const userJson = newUser.toJSON();
            delete userJson.password;
            return userJson;
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            return null;
        }
    }

    async login(username: string, password: string): Promise<string | null> {
        try {
            // Encontrar usuário pelo username
            const user = await User.findOne({ where: { username } });
            if (!user) {
                return null;
            }

            // Verificar a senha
            const passwordMatch = await bcrypt.compare(password, user.get('password') as string);
            if (!passwordMatch) {
                return null;
            }

            // Gerar token JWT
            const token = jwt.sign(
                { id: user.get('id'), username: user.get('username') },
                this.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return token;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            return null;
        }
    }

    validateToken(token: string): { id: string; username: string } | null {
        try {
            return jwt.verify(token, this.JWT_SECRET) as { id: string; username: string };
        } catch (error) {
            return null;
        }
    }
}
