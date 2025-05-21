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
        return res.status(401).json({ error: 'Token invu00e1lido' });
    }

    // Adicionar informau00e7u00f5es do usuu00e1rio u00e0 requisiu00e7u00e3o
    req.user = decoded;
    
    return next();
}
