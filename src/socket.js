const server = require('socket.io');
const {Server} = require("socket.io");
const ProductManager = require("../src/classes/product-manager");
const productManager = new ProductManager('./products.json');

let socketServer;

const emit = (event, data)=>{
    socketServer.emit(event, data);
}
const init = (httpServer) =>{
    socketServer = new Server(httpServer);
    socketServer.on('connection', async (socketClient) => {
        console.log(`Nuevo cliente socket conectado: ${socketClient.id} `);
        socketClient.emit('init', {products: await productManager.getProducts()});
        socketClient.on('message', async (msg) => {
            console.log(`Mensaje desde el cliente: ${JSON.stringify(msg)}`);
            await productManager.addProduct(msg);
            socketClient.broadcast.emit('init', {products: await productManager.getProducts()});
            socketClient.emit('init', {products: await productManager.getProducts()});
        });

        socketClient.on('delete', async (msg) => {
            console.log(`delete desde el cliente: ${JSON.stringify(msg)}`);
            await productManager.deleteProduct(msg.id);
            socketClient.broadcast.emit('init', {products: await productManager.getProducts()});
            socketClient.emit('init', {products: await productManager.getProducts()});
        });
    });
}


module.exports.init = init;
module.exports.emit = emit;
