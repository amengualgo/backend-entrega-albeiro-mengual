import { Server } from 'socket.io';

export const init = (httpServer) =>{
    const socketServer = new Server();
    socketServer.on('connection', (socketClient)=>{
        console.log(`Nuevo cliente socket conectado: ${socketClient.id} `);
        socketClient.emit('init', {status:'ok'})
        socketClient.on('message', (msg)=>{
            console.log(`Mensaje desde el cliente: ${msg}`)
        });
    });
}