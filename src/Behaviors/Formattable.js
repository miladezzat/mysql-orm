'use strict';

const _ = require('lodash');

class FormattableIllegalArgumentError extends Error {

    constructor(message) {
        super(message);
        this.name = 'FormattableIllegalArgument';
    }

}

class Formattable {
    
    constructor(formatters) {
        if(!_.isPlainObject(formatters) || _.isNil(formatters)) {
            throw new FormattableIllegalArgumentError('missing or invalid formatters');
        }

        this.formatters = formatters;
    }

    beforeInsertOne(doc) {
        if(!_.isNil(this.formatters.create)) {
            return Promise.resolve(this.formatters.create(doc));
        }

        return Promise.resolve(doc);
    }
}

module.exports = Formattable;
module.exports.Errors = {
    FormattableIllegalArgumentError,
};
