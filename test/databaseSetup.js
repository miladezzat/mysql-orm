'use strict';

const logger = require('../src/logger');
const mysql = require('mysql2/promise');

const createConnection = async() => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Milad@2020',
        database: 'mydb',
    });
    
    try {        
        await connection.connect();
        logger.info('connected to database successfully');
        return connection;
    } catch(error) {
        logger.error('Error to connect to database', { error });
    }
};

module.exports = { createConnection };
