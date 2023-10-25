
const express = require('express');
const app = express();
const PORT = 8080;
const productsRouter =  require('./routers/products.router');
const cartsRouter =  require('./routers/carts.router');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', productsRouter, cartsRouter);
app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
})