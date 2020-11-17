'use strict';

const _ = require('lodash');
const moment = require('moment');

const CREATED_AT_FIELD = 'createdAt';
const UPDATED_AT_FIELD = 'updatedAt';
const RESTORED_AT_FIELD = 'restoredAt';
const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

class Timestampable {

    constructor() {
        this.createTimestampField = CREATED_AT_FIELD;
        this.updateTimestampField = UPDATED_AT_FIELD;
        this.restoreTimestampField = RESTORED_AT_FIELD;
    }

    beforeInsertOne(doc) {
        _.set(doc, this.createTimestampField, moment().format(TIMESTAMP_FORMAT));

        return Promise.resolve(doc);
    }

}

module.exports = Timestampable;
