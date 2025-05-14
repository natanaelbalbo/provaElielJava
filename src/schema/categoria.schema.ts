import { Schema, model } from 'mongoose'

const categoriaSchema = new Schema({
    id: Number,
    nome: String,
    cor: String
}, { timestamps: true });

export default model("Categoria", categoriaSchema)