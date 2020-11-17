'use strict';

const _ = require('lodash');

class QueryBuilder {

    constructor(tableName, doc) {
        this.tableName = tableName;
        this.document = doc;
    }

    createQuery() {
        let keys = '(';
        let values = '(';
        const{ length } = _.keys(this.document);
        let count = 0;
        
        _.map(this.document, (value, key) => {
            if(count < length - 1) {
                keys += `${key}, `;
                values += `${value}, `;
            } else if(count === length - 1) {
                keys += `${key})`;
                values += `${value})`;
            }
            count++;
        });

        return { keys, values };
    }

}
module.exports = QueryBuilder;
