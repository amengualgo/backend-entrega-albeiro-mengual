
const express = require('express');
const ProductManager = require('./product-manager');
const app = express();
const productManager = new ProductManager('./products.json');

app.use(express.urlencoded({extended: true}));
app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    const {query} = req;
    const limit = parseInt(query.limit);
    return res.json(limit ? products.slice(0, limit) : products);
});

app.get('/products/:pid', async (req, res) => {
    const {params} = req;
    const pid = parseInt(params.pid);
    const product = pid ? await productManager.findById(pid) : undefined;
    return product ? res.json(product) : res.status(404).json({'message':'not found'});
});

app.listen(8080, ()=>{
    console.log('Servidor corriendo en puerto 8080.')
})