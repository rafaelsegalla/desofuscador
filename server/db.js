const Sequelize = require('sequelize');

require('dotenv').config();
const sequelize = new Sequelize(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPASS,{
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        dialect: process.env.DBTYPE,
        define: {
            timestamp: false,
            freezeTableName: true
        }
    }
);

// console.log(sequelize);

module.exports = sequelize;