import { Router } from 'express'
import usuarioController from './controllers/usuarioController'
import tarefaController from './controllers/tarefaController'
import categoriaController from './controllers/categoriaController'
import { authMiddleware } from './middlewares/authMiddleware'
import authRoutes from './routes/auth.routes'
import taskRoutes from './routes/task.routes'

const routes = Router()

// Rotas de autenticação (públicas)
routes.use('/api/auth', authRoutes);

// Rotas de tarefas (protegidas)
routes.use('/api/tasks', authMiddleware, taskRoutes);

// Outras rotas da API
routes.post('/api/usuario', usuarioController.create)
routes.get('/api/usuarios', usuarioController.findAll)
routes.get('/api/usuario/:id', usuarioController.findById)
routes.put('/api/usuario/:id', usuarioController.update)
routes.delete('/api/usuario/:id', usuarioController.delete)

routes.post('/api/tarefa', tarefaController.create)
routes.get('/api/tarefas', tarefaController.findAll)
routes.get('/api/tarefa/:id', tarefaController.findById)
routes.put('/api/tarefa/:id', tarefaController.update)
routes.delete('/api/tarefa/:id', tarefaController.delete)

routes.post('/api/categoria', categoriaController.create)
routes.get('/api/categorias', categoriaController.findAll)
routes.get('/api/categorias/:id', categoriaController.findById)
routes.put('/api/categorias/:id', categoriaController.update)
routes.delete('/api/categorias/:id', categoriaController.delete)

//listar tarefas concluídas ou pendentes
routes.get('/api/tarefas/status/:status', tarefaController.statusTarefa)
//Rota para contar o número total de tarefas de um usuário.
routes.get('/api/tarefas/usuarios/:usuarioAssociado', tarefaController.countUsuariosTarefas)
//Rota para listar tarefas que vencem em um determinado período.
routes.get('/api/tarefas/dataconclusao/:dataConclusao', tarefaController.findDataTarefa);
routes.get('/api/tarefas/tarefa-mais-recente/:usuarioAssociado', tarefaController.tarefaMaisRecente );
routes.get('/api/tarefas/media-conclusao', tarefaController.mediaTarefasConcluidas );
routes.get('/api/tarefas/descricao-mais-longa', tarefaController.tarefaDescricaoMaisLonga);
routes.get('/api/tarefas/agrupar-por-categoria', tarefaController.agruparPorCategoria);
routes.get('/api/tarefas/mais-antiga/:usuario', tarefaController.findTarefaMaisAntiga);


export {
    routes
}