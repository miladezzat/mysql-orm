'use strict';

const _ = require('lodash');
const QueryBuilder = require('./QueryBuilder');
class DecoratorIllegalArgumentError extends Error {

    constructor(message) {
        super(message);
        this.name = 'DecoratorIllegalArgument';
    }

}

class DecoratorInternalError extends Error {

    constructor(message) {
        super(message);
        this.name = 'DecoratorInternal';
    }

}

class DecoratorNotFoundError extends Error {

    constructor(message) {
        super(message);
        this.name = 'DecoratorNotFound';
    }

}
class Decorator {

    constructor(connection, behaviors, tableName, tableDefinition) {
        if(_.isNil(connection) || _.isNil(tableName) || !_.isArray(behaviors)) {
            throw new DecoratorIllegalArgumentError('invalid collection or behaviors');
        }

        this.connection = connection;
        this.behaviors = behaviors;
        this.tableName = tableName;
        this.queryBuilder = new QueryBuilder(tableName);
        this.queryBuilder.createTable(tableDefinition, connection);
    }

    async insertOne(doc) {
        if(!_.isPlainObject(doc) || _.isEmpty(doc)) {
            throw new DecoratorIllegalArgumentError('invalid or missing document');
        }

        try {
            for(const aBehavior of this.behaviors) {
                if(!_.isNil(aBehavior.beforeInsertOne)) {
                    await aBehavior.beforeInsertOne(doc);
                }
            }
            const sql = await this.queryBuilder.createInsertQuery(doc);
            const result = await this.connection.query(sql);
            return { result, doc };
        } catch(error) {
            throw new DecoratorIllegalArgumentError(error.message);
        }
    }

    async find(query) {
        try {
            for(const aBehavior of this.behaviors) {
                if(!_.isNil(aBehavior.beforeFind)) {
                    await aBehavior.beforeFind(query);
                }
            }
            const sql = query ? query : `SELECT * FROM ${this.tableName}`;
            const[rows] = await this.connection.query(sql);
            return rows;
        } catch(error) {
            throw new DecoratorIllegalArgumentError(error.message);
        }
    }

    async findById(id) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE id='${id}'`;
            const[rows] = await this.connection.query(sql);
            return rows[0];
        } catch(error) {
            throw new DecoratorIllegalArgumentError(error.message);
        }
    }

}

module.exports = Decorator;

module.exports.Errors = {
    DecoratorInternalError,
    DecoratorNotFoundError,
    DecoratorIllegalArgumentError,
};
