'use strict';

const _ = require('lodash');
const SchemaValidator = require('../SchemaValidator');

class ValidatableIllegalArgumentError extends Error {

    constructor(message) {
        super(message);
        this.name = 'ValidatableIllegalArgument';
    }

}

class ValidatableValidationError extends Error {

    constructor(message) {
        super(message);
        this.name = 'ValidatableValidation';
    }

}

class Validatable {
   
    constructor(schema, omittableFields) {
        if(_.isNil(schema)) {
            throw new ValidatableIllegalArgumentError('missing schema');
        }

        if(!_.isNil(omittableFields)) {
            this.omittableFields = !_.isArray(omittableFields) ? [omittableFields] : omittableFields;
        }

        this.validator = new SchemaValidator(schema);
    }

    beforeInsertOne(doc) {
        return this.validator.validate(this._omit(doc));
    }
  
    _omit(doc) {
        return _.omit(doc, this.omittableFields);
    }

}

module.exports = Validatable;
module.exports.Errors = { 
    ValidatableIllegalArgumentError,
    ValidatableValidationError,
};
