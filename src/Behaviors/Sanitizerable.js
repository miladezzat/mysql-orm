'use strict';

const _ = require('lodash');
const sanitizer = require('sanitizer');
const striptags = require('striptags');

class SanitizerableIllegalArgumentError extends Error {

    constructor(message) {
        super(message);
        this.name = 'SanitizerableIllegalArgumentError';
    }

}

class Sanitizerable {

    constructor(paths) {
        if(!_.isArray(paths) || _.isEmpty(paths)) {
            throw new SanitizerableIllegalArgumentError('missing or invalid paths');
        }

        this.paths = paths;
    }

    beforeInsertOne(doc) {
        if(!_.isPlainObject(doc)) {
            throw new SanitizerableIllegalArgumentError('missing doc or invalid');
        }
        _.map(this.paths, path => {
            this._removeHTMLTags(doc, path);
        });
        return Promise.resolve(doc);
    }    
    _removeHTMLTags(doc, path) {
        const value = _.get(doc, path);
        const data = _.isString(value) ? striptags(value.trim()) : null;
        if(data) {
            _.set(doc, path, sanitizer.sanitize(data.trim()));
        } 
    }

}

module.exports = Sanitizerable;
module.exports.Errors = {
    SanitizerableIllegalArgumentError,
};
