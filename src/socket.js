const server = require('socket.io');
const {Server} = require("socket.io");
const ProductManager = require("./dao/managers/files-system/product-manager");
const ProductManagerDB = require("./dao/managers/mongo/product-manager-db");
const productManager = new ProductManager('./products.json');
const productManagerDB = new ProductManagerDB();

const MessageManagerDB= require('./dao/managers/mongo/message-manager-db');
const messageManagerDB = new MessageManagerDB();

let socketServer;

const emit = (event, data)=>{
    socketServer.emit(event, data);
}
const init = (httpServer) =>{
    socketServer = new Server(httpServer);
    socketServer.on('connection', async (socketClient) => {
        console.log(`Nuevo cliente socket conectado: ${socketClient.id} `);
        let _products = await productManagerDB.getProducts();
        let _conversations = await messageManagerDB.getMessages();

        socketClient.emit('init', {products: _products.payload.map(prod => prod.toJSON()) });
        socketClient.emit('conversations', {conversations: _conversations.map(conversation => conversation)});

        socketClient.on('message', async (msg) => {

            await productManagerDB.addProduct(msg);
            _products = await productManagerDB.getProducts();
            socketClient.broadcast.emit('init', {products: _products.map(prod => prod.toJSON())});
            socketClient.emit('init', {products: _products.map(prod => prod.toJSON())});
        });

        socketClient.on('delete', async (msg) => {

            await productManagerDB.deleteProduct(msg.id);
            _products = await productManagerDB.getProducts();
            socketClient.broadcast.emit('init', {products: _products.map(prod => prod.toJSON())});
            socketClient.emit('init', {products: _products.map(prod => prod.toJSON())});
        });

        socketClient.on('new-message', async (newMessage) => {
            await messageManagerDB.addMessage(newMessage);
            _conversations = await messageManagerDB.getMessages();
            socketClient.broadcast.emit('conversations', {conversations: _conversations.map(conversation => conversation)});
            socketClient.emit('conversations', {conversations: _conversations.map(conversation => conversation)});
        });

    });
}


module.exports.init = init;
module.exports.emit = emit;
