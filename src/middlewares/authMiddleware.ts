import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                username: string;
            };
        }
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // Verificar se existe o header de autoriazação
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    // Verificar formato do token (Bearer <token>)
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return res.status(401).json({ error: 'Erro no formato do token' });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token mal formatado' });
    }

    // Validar o token
    const authService = new AuthService();
    const decoded = authService.validateToken(token);
    if (!decoded) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    // Adicionar informações do usuário à requisição
    req.user = decoded;
    
    return next();
}
