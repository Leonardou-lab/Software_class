const express = require('express')
const cors = require('cors')
const mysql = require('mysql2');
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

// app.js


// Create a connection to the database
/*const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'passtest',
    database: 'tienda_gatos'
});*/

// Connect to the database
/*connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');

    // Example query
    connection.query('SELECT * FROM comidas', (err, results, fields) => {
        if (err) throw err;
        console.log(results);
    });

    // Close the connection
    connection.end();
});*/

app.post('/consulta', (req, res) => {
    const nombre = req.body.input;
    console.log(nombre);
    const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'passtest',
        database: 'tienda_gatos'
    });
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected to MySQL Database!');
        // Example query             
        connection.query('SELECT * FROM comidas WHERE nombre_plato = ?', [nombre], (err, results, fields) => {
            if (err) throw err;
            console.log(results);

        });
        // Close the connection     
        connection.end();
    });
    res.send("Ok")
});

app.get('/consulta', (req, res) => {
    console.log("Get");

    const connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'passtest',
        database: 'tienda_gatos'
    });
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected to MySQL Database!');
        // Example query             
        connection.query('SELECT * FROM comidas;', [], (err, results, fields) => {
            if (err) throw err;
            console.log(results);

        });

        // Close the connection     
        connection.end();
    });


    res.send("Ok")
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});