import { Sequelize } from 'sequelize';

// Inicializar Sequelize com SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

export default sequelize; 