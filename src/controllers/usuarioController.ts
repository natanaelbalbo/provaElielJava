import { Request, Response } from 'express'
import usuarioService from '../service/usuarioService'


class usuarioController {
    async create(req: Request, res: Response) {
        try{
            const createdUsuario = await usuarioService.create(req.body)
            res.status(201)
            return res.json(createdUsuario)
        }catch(error){
            console.error(error);
        }
    }

    async findAll(req: Request, res: Response) {
        try{
            const findedUsuarios = await usuarioService.findAll()
            return res.json(findedUsuarios)
        }catch(error){
            console.error(error);
        }    
    }

    async findById(req: Request, res: Response) {
        try{
            const findedUsuario = await usuarioService.findById(req.params.id)
            return res.json(findedUsuario)
        }catch(error){
            console.error(error);
        }        
    }

    async update(req: Request, res: Response) {
        try{
            const updatedUsuario = await usuarioService.update(req.params.id, req.body)
            return res.json(updatedUsuario)
        }catch(error){
            console.error(error);
        }           
    }

    async delete(req: Request, res: Response) {
        try{
        const deleteMessage = await usuarioService.delete(req.params.id)
        return res.json(deleteMessage)
        }catch(error){
            console.error(error);
        }    
    }
}

export default new usuarioController()