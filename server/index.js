import express from "express";
import morgan from "morgan";
import { Server as SocketS } from "socket.io";
import http from 'http';
import cors from "cors";
import {dirname, join} from 'path';
import { fileURLToPath } from "url";

import { PORT } from "./config.js";
import path from "path";


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
// console.log(__dirname)
const server =http.createServer(app);
const io =new SocketS(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

app.use(cors())
app.use(morgan('dev'));

io.on('connection', (socket) => {
    // console.log(socket.id)
    console.log('Se ha Conectado un cliente')

    socket.on('message', (message) => {
        // console.log(message)
        socket.broadcast.emit('message', {
            body: message,
            from: socket.id,        })
    })
});
app.use(express.static(join(__dirname, '../cliente/build')))
server.listen(PORT);
console.log('servidor corriendo en el puerto ', PORT);