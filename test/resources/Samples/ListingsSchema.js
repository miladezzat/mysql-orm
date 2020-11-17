'use strict';

module.exports = {
    $id: '/schemas/jassad/projects',
    title: ' Schema',

    type: 'object',
    additionalProperties: false,    
    required: ['developerName'],
    properties: {
        developerName: {
            $ref: '#/definitions/non_empty_string',
        },
        developerNameAr: {
            $ref: '#/definitions/non_empty_string',
        },
        compoundName: {
            $ref: '#/definitions/non_empty_string',
        },
        phaseName: {
            $ref: '#/definitions/non_empty_string',
        },
        unitDesign: {
            $ref: '#/definitions/non_empty_string',
        },
        unitId: {
            $ref: '#/definitions/non_empty_string',
        },
        description: {
            $ref: '#/definitions/non_empty_string', 
        },
        totalPrice: {
            $ref: '#/definitions/positive_number',
        },
        slug: {
            $ref: '#/definitions/non_empty_string',
        },
        slugAr: {
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
