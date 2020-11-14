'use strict';

const _ = require('lodash');
const httpStatus = require('http-status-codes');
const{ v4: uuidv4 } = require('uuid');
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

    constructor(elasticClient, behaviors, indexName) {
        if(_.isNil(elasticClient) || !_.isArray(behaviors) || _.isEmpty(behaviors)) {
            throw new DecoratorIllegalArgumentError('invalid elasticClient or behaviors');
        }

        this.elasticClient = elasticClient;
        this.behaviors = behaviors;
        this.indexName = indexName;
    }

    async insertOne(doc) {
        if(_.isNil(doc) || _.isEmpty(doc)) {
            throw new DecoratorIllegalArgumentError('invalid document');
        }

        for(const aBehavior of this.behaviors) {
            if(!_.isNil(aBehavior.beforeInsertOne)) {
                await aBehavior.beforeInsertOne(doc);
            }
        }

        try {
            const id = uuidv4();
            const result = await this.elasticClient.index({
                index: this.indexName,
                id,
                body: { id, ...doc },
            });

            if(result.statusCode === httpStatus.CREATED) {
                return {
                    id: result.body._id,
                    ...doc,
                };
            } else {
                const error = new DecoratorInternalError('document not created');
                error.details = result.body;
                throw error;
            }
        } catch(error) {
            throw new DecoratorInternalError(error.message);
        }
    }

}

module.exports = Decorator;

module.exports.Errors = {
    DecoratorInternalError,
    DecoratorNotFoundError,
    DecoratorIllegalArgumentError,
};
