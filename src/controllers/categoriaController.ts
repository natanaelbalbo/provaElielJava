import { Request, Response } from 'express'
import categoriaService from '../service/categoriaService'

class categoriaController {
    async create(req: Request, res: Response) {
       try{
        const createdCategoria = await categoriaService.create(req.body)
        res.status(201)
        return res.json(createdCategoria)
       }catch(error){
        console.error(error);
       }
    }   

    async findAll(req: Request, res: Response) {
        try{
            const findedCategorias= await categoriaService.findAll()
            return res.json(findedCategorias)
        }catch(error){
            console.error(error);
       }
    }

    async findById(req: Request, res: Response) {
        try{
            const findedCategoria = await categoriaService.findById(req.params.id)
            return res.json(findedCategoria)
        }catch(error){
            console.error(error);
       }
    }

    async update(req: Request, res: Response) {
        try{
            const updatedCategoria= await categoriaService.update(req.params.id, req.body)
            return res.json(updatedCategoria)
        }catch(error){
            console.error(error);
        }     
    }

    async delete(req: Request, res: Response) {
        try{
            const deleteMessage = await categoriaService.delete(req.params.id)
            return res.json(deleteMessage)
        }catch(error){
            console.error(error);
        }
    }
}

export default new categoriaController()