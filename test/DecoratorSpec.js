'use strict';

const{ createConnection } = require('./databaseSetup');
const{ v4: uuid } = require('uuid');

describe.only('Decorator', () => {
    let connection;

    before(async() => {
        connection = await createConnection();
    });
    describe('test', () => {
        it('should insert row successfully', async() => {
            const sql = `INSERT INTO customer (id, name) VALUES ('${uuid()}', 'Milad E. Fahmy')`;
            const sql2 = 'select * from customer';
            try {
                const[rows] = await connection.execute(sql2);
                console.log(rows[0].id);
            } catch(error) {
                console.log('error', error);
            }
        });
    });
});
