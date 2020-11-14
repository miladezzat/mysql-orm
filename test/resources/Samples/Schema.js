'use strict';

module.exports = {
    $id: '/schemas/jassad/projects',
    title: ' Schema',

    type: 'object',
    additionalProperties: false,        
    properties: {
        name: {
            $ref: '#/definitions/non_empty_string',
        },
        email: {
            $ref: '#/definitions/non_empty_string',
        },        
        isDeleted: {
            $ref: '#/definitions/boolean_type',
        },
    },

    definitions: {
        non_empty_string: {
            type: 'string',
            minLength: 1,
        },

        positive_number: {
            minimum: 1,
            multipleOf: 1,
            type: 'number',
        },

        boolean_type: {
            type: 'boolean',
            default: false,
        },
    },
};
