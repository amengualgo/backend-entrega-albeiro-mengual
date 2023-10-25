const { Router } = require('express');
const CartManager = require("../classes/cart-manager");
const express = require("express");
const router = Router();
const cartManager = new CartManager('./carts.json');

router.use(express.urlencoded({extended: true}));

router.post('/carts', async (req, res) => {
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
        const _response = await cartManager.addProductInCart(cid, pid, quantity);
        if(_response == 200){
            res.status(200).json({'message':'Producto actualizado en el carrito'});
        }else{
            if(_response == 201){
                res.status(201).json({'message':'Producto creado en el carrito'});
            }else {
                res.status(404).json({'error':'Carrito no existe o producto no existe en el inventario'});
            }
        }


    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});

module.exports = router;