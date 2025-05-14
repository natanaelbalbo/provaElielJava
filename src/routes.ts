import { Router } from 'express'
import usuarioController from './controllers/usuarioController'
import tarefaController from './controllers/tarefaController'
import categoriaController from './controllers/categoriaController'

const routes = Router()

routes.post('/usuario', usuarioController.create)
routes.get('/usuarios', usuarioController.findAll)
routes.get('/usuario/:id', usuarioController.findById)
routes.put('/usuario/:id', usuarioController.update)
routes.delete('/usuario/:id', usuarioController.delete)

routes.post('/tarefa', tarefaController.create)
routes.get('/tarefas', tarefaController.findAll)
routes.get('/tarefa/:id', tarefaController.findById)
routes.put('/tarefa/:id', tarefaController.update)
routes.delete('/tarefa/:id', tarefaController.delete)

routes.post('/categoria', categoriaController.create)
routes.get('/categorias', categoriaController.findAll)
routes.get('/categorias/:id', categoriaController.findById)
routes.put('/categorias/:id', categoriaController.update)
routes.delete('/categorias/:id', categoriaController.delete)

//listar tarefas concluídas ou pendentes
routes.get('/tarefas/status/:status', tarefaController.statusTarefa)
//Rota para contar o número total de tarefas de um usuário.
routes.get('/tarefas/usuarios/:usuarioAssociado', tarefaController.countUsuariosTarefas)
//Rota para listar tarefas que vencem em um determinado período.
routes.get('/tarefas/dataconclusao/:dataConclusao', tarefaController.findDataTarefa);
routes.get('/tarefas/tarefa-mais-recente/:usuarioAssociado', tarefaController.tarefaMaisRecente );
routes.get('/tarefas/media-conclusao', tarefaController.mediaTarefasConcluidas );
routes.get('/tarefas/descricao-mais-longa', tarefaController.tarefaDescricaoMaisLonga);
routes.get('/tarefas/agrupar-por-categoria', tarefaController.agruparPorCategoria);
routes.get('/tarefas/mais-antiga/:usuario', tarefaController.findTarefaMaisAntiga);


export {
    routes
}