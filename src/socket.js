const server = require('socket.io');
const {Server} = require("socket.io");
const ProductManager = require("./dao/managers/files-system/product-manager");
const ProductManagerDB = require("./dao/managers/mongo/product-manager-db");
const productManager = new ProductManager('./products.json');
const productManagerDB = new ProductManagerDB();

let socketServer;

const emit = (event, data)=>{
    socketServer.emit(event, data);
}
const init = (httpServer) =>{
    socketServer = new Server(httpServer);
    socketServer.on('connection', async (socketClient) => {
        console.log(`Nuevo cliente socket conectado: ${socketClient.id} `);
        let _products = await productManagerDB.getProducts();
        socketClient.emit('init', {products: _products.map(prod => prod.toJSON()) });
        socketClient.on('message', async (msg) => {
            console.log(`Mensaje desde el cliente: ${JSON.stringify(msg)}`);
            await productManagerDB.addProduct(msg);
            _products = await productManagerDB.getProducts();
            socketClient.broadcast.emit('init', {products: _products.map(prod => prod.toJSON())});
            socketClient.emit('init', {products: _products.map(prod => prod.toJSON())});
        });

        socketClient.on('delete', async (msg) => {
            console.log(`delete desde el cliente: ${JSON.stringify(msg)}`);
            await productManagerDB.deleteProduct(msg.id);
            _products = await productManagerDB.getProducts();
            socketClient.broadcast.emit('init', {products: _products.map(prod => prod.toJSON())});
            socketClient.emit('init', {products: _products.map(prod => prod.toJSON())});
        });
    });
}


module.exports.init = init;
module.exports.emit = emit;
