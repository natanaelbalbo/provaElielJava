import { Schema, model } from 'mongoose'

const usuarioSchema = new Schema({
    id: Number,
    nome: String,
    peso: String,
    senha: String,
    email: String
}, { timestamps: true });

export default model("Usuário", usuarioSchema)