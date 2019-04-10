const express = require('express');
const path = require('path')

const cors = require('cors')
const mongoose = require('mongoose')

const app = express();

app.use(cors())

//Associa a biblioteca express através da constante app à escutar
//solicitações http(padrão) e a associa a escutar requisições web socket também
const server = require('http').Server(app)
const io = require('socket.io')(server)

//Configuração global de conexão('connection')
//Configuração específica para broadcast('connectionRoom')
io.on('connection', socket => {
    socket.on('connectionRoom', box => {
        socket.join(box)
    })
})

mongoose.connect("mongodb+srv://oministack:oministack@cluster0-qb0nz.mongodb.net/oministack?retryWrites=true", {
    useNewUrlParser: true
})

//Middware afim de associar o websocket a todas as requisições realizadas a api 
app.use((req, res, next) => {
    req.io = io
    //Processa o middware e passa adiante para as próximas configurações
    return next()
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//Habilita o acesso a rota 'files' e consecutivamente a rota a buscar os arquivos
//na pasta tmp
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))
app.use(require('./routes'))

server.listen(process.env.PORT || 3333)