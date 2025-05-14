import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    register = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Username e password su00e3o obrigatu00f3rios' });
            }

            const user = await this.authService.register(username, password);
            if (!user) {
                return res.status(409).json({ error: 'Username ju00e1 estu00e1 em uso' });
            }

            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao registrar usuu00e1rio' });
        }
    };

    login = async (req: Request, res: Response) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ error: 'Username e password su00e3o obrigatu00f3rios' });
            }

            const token = await this.authService.login(username, password);
            if (!token) {
                return res.status(401).json({ error: 'Credenciais invu00e1lidas' });
            }

            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao realizar login' });
        }
    };
}
