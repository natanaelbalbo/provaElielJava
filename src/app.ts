import express from 'express'
import cors from 'cors';
import { routes } from './routes'
import sequelize from './database';

class App {
    public express: express.Application

    constructor() {
        this.express = express()
        this.middleware()
        this.database()
        this.routes()
    }

    public middleware() {
        this.express.use(cors())
        this.express.use(express.json())
    }

    public async database() {
        try {
            await sequelize.authenticate();
            await sequelize.sync();
            console.log("Sucesso ao conectar com o banco de dados SQLite")
        } catch (error) {
            console.error("Não foi possível conectar na base de dados:", error)
        }
    }

    public routes() {
        this.express.use(routes)
    }
}

export default new App().express