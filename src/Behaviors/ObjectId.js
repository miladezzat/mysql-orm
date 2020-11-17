'use strict';

const _ = require('lodash');
const{ v4: uuid } = require('uuid');

class ObjectIdIllegalArgumentError extends Error {

    constructor(message) {
        super(message);
        this.name = 'ObjectIdIllegalArgument';
    }

}

class ObjectId {

    beforeInsertOne(doc) {
        _.set(doc, 'id', uuid());
        return Promise.resolve(doc);
    }

}

module.exports = ObjectId;
module.exports.Errors = {
    ObjectIdIllegalArgumentError,
};
