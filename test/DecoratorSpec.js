'use strict';

// const _ = require('lodash');
const{ createConnection } = require('./databaseSetup');
const Decorator = require('../src/Decorator');
const{ Timestampable, ObjectId } = require('../src/Behaviors');

describe.only('Decorator', () => {
    let connection;
    let decorator;
    let id;
    before(async() => {
        connection = await createConnection();        

        decorator = new Decorator(connection, [
            new Timestampable(),
            new ObjectId(),
        ], 'customer');
    });

    describe('Insert', () => {
        it('should insert row successfully', async() => {
            const result = await decorator.insertOne({ firstName: 'fahmy' });
            console.log(result);
        });
    });

    describe('find', () => {
        it('should findData', async() => {
            const result = await decorator.find();
            console.log(result);
        });

        it('should findData', async() => {
            const result = await decorator.find(`SELECT * FROM customer WHERE firstName='fahmy'`);
            id = result[0].id;
            console.log(result);
        });
    });

    describe('findById', () => {
        it('should findData', async() => {
            const result = await decorator.findById(id);
            console.log(result);
        });
    });
});
