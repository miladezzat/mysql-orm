'use strict';

const _ = require('lodash');
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

    constructor(connection, behaviors, tableName) {
        if(_.isNil(connection) || _.isNil(tableName) || !_.isArray(behaviors) || _.isEmpty(behaviors)) {
            throw new DecoratorIllegalArgumentError('invalid collection or behaviors');
        }

        this.connection = connection;
        this.behaviors = behaviors;
        this.tableName = tableName;
    }

    async insertOne(sql) {
        if(_.isNil(sql)) {
            throw new DecoratorIllegalArgumentError('missing sql');
        }

        for(const aBehavior of this.behaviors) {
            if(!_.isNil(aBehavior.beforeInsertOne)) {
                await aBehavior.beforeInsertOne(sql);
            }
        }
        
        const result = await this.connection.query(sql);
    }

}

module.exports = Decorator;

module.exports.Errors = {
    DecoratorInternalError,
    DecoratorNotFoundError,
    DecoratorIllegalArgumentError,
};
