'use strict';

const _ = require('lodash');
const{ v4: uuid } = require('uuid');

class FormattableIllegalArgumentError extends Error {

    constructor(message) {
        super(message);
        this.name = 'FormattableIllegalArgument';
    }

}

class Formattable {

    beforeInsertOne(doc) {
        _.set(doc, 'id', uuid);
        return Promise.resolve(doc);
    }

}

module.exports = Formattable;
module.exports.Errors = {
    FormattableIllegalArgumentError,
};
