import { Request, Response, response } from 'express'
import tarefaService from '../service/tarefaService'

class tarefaController {
    async create(req: Request, res: Response) {
        try{
            const createdTarefa = await tarefaService.create(req.body)
            res.status(201)
            return res.json(createdTarefa)
        }catch(error){
            console.error(error)
        }
    }

    async findAll(req: Request, res: Response) {
        try{
            const findedTarefas = await tarefaService.findAll()
            return res.json(findedTarefas)
        }catch(error){
            console.error(error)
        }
    }

    async findById(req: Request, res: Response) {
        try{
            const findedTarefa = await tarefaService.findById(req.params.id)
            return res.json(findedTarefa)
        }catch(error){
            console.error(error)
        }
    }

    async update(req: Request, res: Response) {
        try{
            const updatedTarefa = await tarefaService.update(req.params.id, req.body)
            return res.json(updatedTarefa)
        }catch(error){
            console.error(error)
        }    
    }

    async delete(req: Request, res: Response) {
        try{
            const deleteMessage = await tarefaService.delete(req.params.id)
            return res.json(deleteMessage)
        }catch(error){
            console.error(error)
        }    
    }
    
    async statusTarefa(req: Request, res: Response) {
        try {
            const status = req.params.status;
            const tarefas = await tarefaService.statusTarefa(status);
            res.json(tarefas);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao buscar tarefas por status' });
        }
    }

    async countUsuariosTarefas(req: Request, res: Response){
        try{
            const usuario = req.params.usuarioAssociado
            const tarefas = await tarefaService.countUsuariosTarefas(usuario);
            res.json(tarefas)
        }catch (error) {
            console.error(error);
            res.status(500).json({message: 'Erro no count'});
        }
    }

    async findDataTarefa(req:Request, res:Response){
        try{
            const dataConclusaoString = req.params.dataConclusao
            const dataConclusao = new Date(dataConclusaoString);
            const tarefa = await tarefaService.findDataTarefa(dataConclusao);
            res.json(tarefa)
        } catch (error){
            console.error(error);
            res.status(500).json({message:'Erro ao encontrar tarefa'});
    }
    }

    async tarefaMaisRecente(req:Request, res:Response){
        try{
            const usuarioAssociado = req.params.usuarioAssociado
            const tarefa = await tarefaService.findTarefaMaisRecente(usuarioAssociado)
            res.json(tarefa);
        } catch (error){
            console.error(error);
            res.status(500).json({message: 'Erro na requisição para encontrar a tarefa mais recente'})
        }
    }

    async mediaTarefasConcluidas(req:Request, res:Response){
        try{
            const tarefa = await tarefaService.mediaConclusaoTarefaS();
            res.json(tarefa);
        }catch (error){
            console.error(error);
            res.status(500).json({message:'Erro na requisição para calcular a media'})
        }
    }

    async tarefaDescricaoMaisLonga(req:Request, res:Response){
        try{
            const tarefa = await tarefaService.tarefaDescricaoMaisLonga()
            res.json(tarefa);
        } catch(error){
            res.status(500).json({message:'Erro na requisição para encontrar a tarefa'});
        }
    }

    async agruparPorCategoria(req: Request, res: Response) {
        try {
            const tarefasPorCategoria = await tarefaService.agruparPorCategoria();
            res.json(tarefasPorCategoria);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao agrupar tarefas por categoria.' });
        }
    } 

    async findTarefaMaisAntiga(req: Request, res: Response) {
        try {
            const usuario = req.params.usuario; 
            const tarefaMaisAntiga = await tarefaService.findTarefaMaisAntiga(usuario);
            res.json(tarefaMaisAntiga);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro ao encontrar a tarefa mais antiga do usuário.' });
        }
    }

}
export default new tarefaController()