'use strict';

const _ = require('lodash');

class QueryBuilderIllegalArgumentError extends Error {

    constructor(message) {
        super(message);
        this.name = 'QueryBuilderIllegalArgument';
    }

}
class QueryBuilder {

    constructor(tableName) {        
        this.tableName = tableName;
    }

    async createInsertQuery(document) {
        try {
            let keys = '(';
            let values = '(';
            const{ length } = _.keys(document);
            let count = 0;

            _.map(document, (value, key) => {
                if(count < length - 1) {
                    keys += `${key}, `;
                    values += `'${value}', `;
                } else if(count === length - 1) {
                    keys += `${key})`;
                    values += `'${value}')`;
                }
                count++;
            });

            const sql = `INSERT INTO ${this.tableName} ${keys} VALUES ${values}`;
            return sql;
        } catch(error) {
            throw new QueryBuilderIllegalArgumentError(error.message);
        }        
    }

    async createTable(definition, connection) {
        if(definition) {            
            try {
                const sql = `CREATE TABLE IF NOT EXISTS ${this.tableName} (${definition})`;
                await connection.execute(sql);                
            } catch(error) {
                throw new QueryBuilderIllegalArgumentError(error.message);
            }
        }
    }

}
module.exports = QueryBuilder;
