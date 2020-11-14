'use strict';

const _ = require('lodash');
const Ajv = require('ajv');

class SchemaValidatorIllegalArgumentError extends Error {

    constructor(message) {
        super(message);
        this.name = 'SchemaValidatorIllegalArgument';
    }
    
}
class SchemaValidator {

    constructor(schema) {
        this.schemas = _.isArray(schema) ? schema : [schema];
        this.ajvValidate = null;
    }

    validate(doc) {
        const validationResult = this._validate(doc);
        if(validationResult) {
            return Promise.resolve(doc);
        }
        const errorObject = new SchemaValidatorIllegalArgumentError('invalid object');
        errorObject.details = this._formatErrors(this.ajvValidate.errors);

        return Promise.reject(errorObject);
    }

    _validate(doc) {
        if(_.isNil(this.ajvValidate)) {
            this._createValidatorInstance();
        }

        return this.ajvValidate(doc);
    }

    _createValidatorInstance() {
        const ajv = new Ajv({
            allErrors: true, useDefaults: true, extendRefs: true,
            $data: true,
        });

        const lastSchema = _.last(this.schemas);
        const schemas = _.dropRight(this.schemas);
        
        if(!_.isEmpty(schemas)) {
            ajv.addSchema(schemas);
        }

        this.ajvValidate = ajv.compile(lastSchema);
    }

    _formatErrors(errorsArray) {
        return _.map(errorsArray, anError => _.omit(anError, 'schemaPath'));
    }

}

module.exports = SchemaValidator;

module.exports.Errors = {
    SchemaValidatorIllegalArgumentError,
};
