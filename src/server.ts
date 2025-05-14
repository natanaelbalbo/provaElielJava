import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/task.routes';
import authRoutes from './routes/auth.routes';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas publicas
app.use('/api/auth', authRoutes);

// Rotas protegidas
app.use('/api/tasks', authMiddleware, taskRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});