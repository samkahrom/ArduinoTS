const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('data.db');

app.listen(8080, () => {
    console.log('Node toimii localhost:8080');
})

app.post('/person/add', (req, res, next) => {
    let tap = req.body;

    db.run('INSERT INTO person(btdata, datetime) VALUES (?, ?)',
        [tap.btdata, tap.datetime], (error, result) => {
        
        if (error) throw error;
        
        return res.status(200).json( {count: 1} );
    })
})

app.get('/person/all', (req, res, next) => {
    db.all('SELECT * FROM person', (error, results) => {
        
    if(error) throwerror;
            
    return res.status(200).json(results);
    })
})

app.get('*', (req, res, next) => {
    return res.status(404).json({ error: true, message: 'Ei pyydettyä palvelua' })
})