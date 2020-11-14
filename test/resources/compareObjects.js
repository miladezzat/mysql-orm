'use strict';

const{ expect } = require('./chai');
const _ = require('lodash');
const compare2Objects = ( 
    resListingData, 
    exListingData, 
    esc1 = [], 
    esc2 = []) =>
    expect(_.omit(resListingData, esc1))
        .to.containSubset(_.omit(exListingData, esc2));

module.exports = compare2Objects;
