const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

app.get('/adios', (req, res) => {
    res.send('bye World!')
})

app.get('/variable/:nombre', (req, res) => {
    let x = req.params.nombre;
    let saludo = "hola ";
    x = saludo + x;
    res.send(x)
})

app.post('/suma', (req, res) => {
    let x = parseFloat(req.body.primero);
    let y = parseFloat(req.body.segundo);
    let resultado = x + y;
    let m = resultado.toString();
    console.log(m);
    res.send(m)
})

app.post('/resta', (req, res) => {
    let x = parseFloat(req.body.primero);
    let y = parseFloat(req.body.segundo);
    let resultado = x - y;
    let m = resultado.toString();
    console.log(m);
    res.send(m)
})

app.post('/multiplicacion', (req, res) => {
    let x = parseFloat(req.body.primero);
    let y = parseFloat(req.body.segundo);
    let resultado = x * y;
    let m = resultado.toString();
    console.log(m);
    res.send(m)
})

app.post('/division', (req, res) => {
    let x = parseFloat(req.body.primero);
    let y = parseFloat(req.body.segundo);
    let resultado = x / y;
    let m = resultado.toString();
    console.log(m);
    res.send(m)
})


app.use('/fotoGato', express.static('tama.jpg'))

app.use('/PaginaTama', express.static('../paginaBootstrap/pagina2CSF.html'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})