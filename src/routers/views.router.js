const { Router } = require('express');
const express = require("express");
const ProductManager = require("../classes/product-manager");
const router = Router();
const {init, emit} = require('../socket');
const productManager = new ProductManager('./products.json');
router.use(express.urlencoded({extended: true}));

router.get('/', async (req, res) => {
    try
    {
        const _products = await productManager.getProducts()
        res.render('home', {title:`Lista de productos 🛒`, products:_products })
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});
router.get('/realtimeproducts', async (req, res) => {
    try
    {
       /* const _products = await productManager.getProducts();
        emit('real-time-products', _products);*/
        res.render('real-time-products', {title:`Real time products 🛒`});

    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});

module.exports = router;