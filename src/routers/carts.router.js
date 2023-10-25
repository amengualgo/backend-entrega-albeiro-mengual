const { Router } = require('express');
const CartManager = require("../classes/cart-manager");
const ProductManager = require("../classes/product-manager");
const express = require("express");
const Product = require("../classes/product");
const Cart = require("../classes/cart");
const router = Router();
const cartManager = new CartManager('./carts.json');
const productManager = new ProductManager('./products.json');
router.use(express.urlencoded({extended: true}));

router.post('/carts', async (req, res) => {
    const {body} = req;
    try{
        const _response = await cartManager.createCart();
        if(_response.status){
            res.status(201).json({..._response})
        }else{
            res.status(400).json({errors:'Error creando el carrito'})
        }
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});
router.get('/carts/:cid', async (req, res) => {
    try
    {
        const {params} = req;
        const cid = params.cid;
        const products = cid ? await cartManager.findById(cid) : undefined;
        return products ? res.json(products) : res.status(404).json({'message':'not found'});
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});
router.post('/carts/:cid/product/:pid', async (req, res) => {
    try
    {
        const {params} = req;
        const {quantity} = req.body;
        const {cid, pid} = params;
        const _carts = cid ? await cartManager.findById(cid) : undefined;
        if(_carts){
            const _product = await  productManager.findById(pid);
            if(_product){
                const idx = _carts.products.findIndex(value => parseInt(value.id) === parseInt(pid));
                if(idx>=0){
                    _carts.products[idx].quantity = _carts.products[idx].quantity + parseInt(quantity);
                    let carrito = await cartManager.getJSONFromFile('./carts.json');
                    carrito = carrito.carts.filter(value => value.id != cid);
                    carrito.push(_carts);
                    await cartManager.saveJSONToFile('./carts.json', {"carts": carrito, "path": "./carts.json"});
                    res.status(200).json({'message':'Producto actualizado en el carrito'});
                }else{
                    _carts.products.push({id:parseInt(pid), quantity:parseInt(quantity)});
                    let carrito = await cartManager.getJSONFromFile('./carts.json');
                    carrito = carrito.carts.filter(value => value.id != cid);
                    carrito.push(_carts);
                    await cartManager.saveJSONToFile('./carts.json', {"carts": carrito, "path": "./carts.json"});
                    res.status(201).json({'message':'Producto creado en el carrito'});
                }
            }else{
                res.status(404).json({'message':'Producto no existe en el inventario'});
            }
        }else{
            res.status(404).json({'message':'Carrito no existe'});
        }

    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});

module.exports = router;