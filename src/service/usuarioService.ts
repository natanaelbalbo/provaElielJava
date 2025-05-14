import usuarioSchema from "../schema/usuario.schema";
import { usuarioType } from "../types/usuarioType";

class usuarioService {
    async create(usuario: usuarioType) {
        try{
            const createdUsuario = await usuarioSchema.create(usuario)
            return createdUsuario
        }catch(error){
            console.error(error);
        }
    }

    async findAll() {
        try{
            const findedUsuarios = await usuarioSchema.find()
            return findedUsuarios
        }catch(error){
            console.error(error);
        }
    }

    async findById(id: string) {
        try{
            const findedUsuario = await usuarioSchema.findById(id)
            return findedUsuario
        }catch(error){
            console.error(error);
        }
    }

    async update(id: string, usuario: usuarioType) {
        try{
            const updateBook = await usuarioSchema.findByIdAndUpdate(id, {
                id: usuario.id,
                nome: usuario.nome,
                peso: usuario.peso,
                senha: usuario.senha,
                email: usuario.email
            }, { new: true })
            return updateBook
        }catch(error){
            console.error(error);
        }    
    }

    async delete(id: string) {
        try {
            await usuarioSchema.findByIdAndDelete(id)
            return "Usuário Removido"
        } catch (error) {
            throw new Error(`Erro ao remover usuário: ${error}`)
        }
    }
}


export default new usuarioService()