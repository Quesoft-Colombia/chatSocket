import express from "express";
import morgan from "morgan";
import { Server as SocketS } from "socket.io";
import http from 'http';
import cors from "cors";
import { PORT } from "./config.js";


const app = express();
const server =http.createServer(app);
const io =new SocketS(server, {
    cors: {
        origin: 'http://localhost:3000',
    }
});

app.use(cors())
app.use(morgan('dev'));

io.on('connection', (socket) => {
    console.log(socket.id)
    console.log('Se ha Conectado un cliente')
})
server.listen(PORT);
console.log('servidor corriendo en el puerto ', PORT);