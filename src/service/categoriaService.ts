import categoriaSchema from "../schema/categoria.schema";
import { CategoriaType } from "../types/categoriaType";

class categoriaService {
    async create(categoria: CategoriaType) {
        try{
            const createdCategoria = await categoriaSchema.create(categoria)
            return createdCategoria
        }catch(error){
            console.error(error);
        }    
    }

    async findAll() {
        const findedCategorias = await categoriaSchema.find()
        return findedCategorias
    }

    async findById(id: string) {
        try{
            const findedCategoria = await categoriaSchema.findById(id)
            return findedCategoria
        }catch(error){
            console.error(error);   
        }    
    }

    async update(id: string, categoria: CategoriaType) {
        try{
            const updatedCategoria = await categoriaSchema.findByIdAndUpdate(id, {
                id: categoria.id,
                nome: categoria.nome,
                cor: categoria.cor
            }, { new: true })
            return updatedCategoria
        }catch(error){
            console.error(error);   
        }    
    }

    async delete(id: string) {
        try {
            await categoriaSchema.findByIdAndDelete(id)
            return "tarefa removida"
        } catch (error) {
            throw new Error(`Erro ao remover tarefa: ${error}`)
        }
    }
}


export default new categoriaService()