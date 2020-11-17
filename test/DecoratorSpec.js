'use strict';

const _ = require('lodash');
const{ createConnection } = require('./databaseSetup');
const Decorator = require('../src/Decorator');
const{ Timestampable, ObjectId } = require('../src/Behaviors');

describe.only('Decorator', () => {
    let connection;
    let decorator;

    before(async() => {
        connection = await createConnection();        

        decorator = new Decorator(connection, [
            new Timestampable(),
            new ObjectId(),
        ], 'customer');
    });

    describe('test', () => {
        it('should insert row successfully', async() => {
            const result = await decorator.insertOne({ firstName: 'milad' });
            console.log(result);
        });
    });
});
