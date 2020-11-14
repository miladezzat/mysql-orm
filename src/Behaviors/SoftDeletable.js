'use strict';

const _ = require('lodash');
const moment = require('moment');

const DELETE_AT_FIELD = 'deletedAt';
const IS_DELETE_FIELD = 'isDeleted';
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class SoftDeleteable {

    constructor() {
        this.deleteTimestampField = DELETE_AT_FIELD;
        this.isDeleteField = IS_DELETE_FIELD;
    }

    beforeRemoveOne(doc) {
        _.set(doc, this.isDeleteField, true);
        _.set(doc, this.deleteTimestampField, moment().format(TIMESTAMP_FORMAT));
        
        return Promise.resolve(doc);
    }

    beforeRemoveMany(docs) {
        _.map(docs, doc => {
            _.set(doc, this.isDeleteField, true);
            _.set(doc, this.deleteTimestampField, moment().format(TIMESTAMP_FORMAT));
        });
        
        return Promise.resolve(docs);
    }

}

module.exports = SoftDeleteable;
