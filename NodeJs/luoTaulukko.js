const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db')

db.serialize( () => {

    let sql = 'CREATE TABLE Person (' + 
        'id integer PRIMARY KEY NOT NULL, ' +
        'btdata text NOT NULL, ' +
        'datetime TEXT)';

    db.run(sql, (err) => {
        if (err) {
            return console.log(err.message);
        }
    })
})