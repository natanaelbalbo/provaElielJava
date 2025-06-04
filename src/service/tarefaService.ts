import tarefaSchema from "../schema/tarefa.schema";
import { tarefaType } from "../types/tarefaType";

class tarefaService {
    async create(tarefa: tarefaType) {
        try {
            const createdTarefa = await tarefaSchema.create(tarefa)
            return createdTarefa
        } catch (error) {
            console.error(error);
        }
    }

    async findAll() {
        try {
            const findedTarefas = await tarefaSchema.find()
            return findedTarefas
        } catch (error) {
            console.error(error);  
        }

    }

    async findById(id: string) {
        try {
            const findedTarefa = await tarefaSchema.findById(id)
            return findedTarefa
        } catch (error) {
            console.error(error);  
        }
    }

    async update(id: string, tarefa: tarefaType) {
        const updatedTarefa = await tarefaSchema.findByIdAndUpdate(id, {
            id: tarefa.id,
            titulo: tarefa.titulo,
            descrição: tarefa.descrição,
            dataConclusao: tarefa.dataConclusao,
            tipo: tarefa.tipo,
            status: tarefa.status,
            usuarioAssociado: tarefa.usuarioAssociado,
            categoria: tarefa.categoria
        }, { new: true })
        return updatedTarefa
    }

    async delete(id: string) {
        try {
            await tarefaSchema.findByIdAndDelete(id)
            return "tarefa removida"
        } catch (error) {
            throw new Error(`Erro ao remover tarefa: ${error}`)
        }
    }

//filtrar por status, se a tarefa for criada, como pendende, e pesquisar as pendentes na url vai trazer-las, ou 'fazer', etc.. vai trazer qual status ofr criado pelo usuário
    async statusTarefa(status: string) {
        try {
            const tarefas = await tarefaSchema.find({ status: status });
            return tarefas;
        } catch (error) {
            throw new Error('Erro ao buscar tarefas por status');
        }
    }

    async countUsuariosTarefas(usuarioAssociado:string){
        try{
            const tarefas = await tarefaSchema.countDocuments({usuarioAssociado:usuarioAssociado})
            return tarefas
        } catch(error) {
            throw new Error('Erro ao contar tarefas do usuário')
        }
    }

    async findDataTarefa(dataConclusao:Date){
        try{
            const tarefa = await tarefaSchema.find({dataConclusao:dataConclusao})
            return tarefa;
        }catch(error){
            throw new Error('erro ao encontrar tarefa nesta data');
        }
    }

    async findTarefaMaisRecente(usuario: string){
        try{
            const tarefa = await tarefaSchema.findOne({usuarioAssociado:usuario}) 
            return tarefa;   
        }catch (error){
            throw new Error('Erro ao encontrar tarefa mais recente');
        }
    }

    async mediaConclusaoTarefaS(){
        try{
            const qtdTarefas = await tarefaSchema.countDocuments();
            const qtdTarefasConcluidas = await tarefaSchema.countDocuments({status:'concluida'});
            return( qtdTarefasConcluidas/qtdTarefas ) * 100;
        } catch(error){
        throw new Error('Erro na média de tarefas concluidas')
    }
}
    
    async tarefaDescricaoMaisLonga(){
        try{
            const tarefa = await tarefaSchema.findOne().sort({descrição: -1});
            return tarefa;
        } catch (error){
        throw new Error( 'não foi possível encontrar a tarefa mais longa' );
        }
    }

    async agruparPorCategoria() {
        try {
            const tarefasPorCategoria = await tarefaSchema.aggregate([
                { $group: { _id: '$categoria' } }
            ]);
            return tarefasPorCategoria;
        } catch (error) {
            throw new Error('Erro ao agrupar tarefas por categoria.');
        }
    }

    async findTarefaMaisAntiga(usuario: string) {
        try {
            const tarefaMaisAntiga = await tarefaSchema.findOne({ usuarioAssociado: usuario }).sort({ createdAt : 1 })
            return tarefaMaisAntiga;
        } catch (error) {
            throw new Error('Erro ao encontrar a tarefa mais antiga do usuário.');
        }
    }
}




export default new tarefaService()