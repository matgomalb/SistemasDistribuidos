//Criacao do server
const http = require('http');
const express = require('express');
const app = express();
const porta = 3030;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);

//Criacao de um Json de teste
const livros = [
    {
    id: 1,
    titulo: 'Quero Entender a Biblia',
    descricao: 'Entenda a Biblia da uma vez e de maneira simples',
    edicao: 'CPAD',
    autor: 'Frances',
    isbn: '85-263-0209-4'
    }
]

const bodyParser = require ('body-parser');
app.use (bodyParser.json());


// GET - SELECT *
app.get('/livro', (req, res, next) => {
    res.json(livros);
});

//Post - Insert
let contador = 2;
app.post('/livro', (req, res, next) => {
    const livro = req.body;
    livros.push({id: contador++, 
                titulo: livro.titulo, 
                descricao: livro.descricao, 
                edicao: livro.edicao, 
                autor: livro.autor, 
                isbn: livro.isbn});
    console.log(livros);
    res.status(201).json(livros);
})

//PUT - Atualizar 
app.put('/livro',(req, res, next)=>{
    let update = false;
    const msg = 'Cliente não encontrado.'
    livros.forEach((livro) => {
        if(livro.id == req.body.id) {
            livro.titulo = req.body.titulo;
            livro.descricao = req.body.descricao;
            livro.edicao = req.body.edicao;
            livro.autor = req.body.autor;
            livro.isbn = req.body.isbn;
            update = true;
        }
    })
    if(update) res.status(200).json(livros);
    else res.status(404).json(msg);
})

//Delete
app.delete("/livro", (req, res, next) =>{
    livros.forEach((livro) => {
        if(livro.id == req.body.id) {
            const index = livros.indexOf(livro, 0);
            livros.splice(index, 1);
        }
    })
    res.status(200).json(livros);
})