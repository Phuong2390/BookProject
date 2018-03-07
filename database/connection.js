const connection = require('knex')({
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'root',
        password : ' ',
        database : 'bookdemo'
    },
    useNullAsDefault: true
});

module.exports = connection;