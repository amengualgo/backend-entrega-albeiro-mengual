const { Router } = require('express');
const express = require("express");
const ProductManager = require("../dao/managers/files-system/product-manager");
const ProductManagerDB = require("../dao/managers/mongo/product-manager-db");
const router = Router();
const {init, emit} = require('../socket');
const productManager = new ProductManager('./products.json');
const productManagerDB = new ProductManagerDB();
router.use(express.urlencoded({extended: true}));

router.get('/', async (req, res) => {
    try
    {
        const _products = await productManagerDB.getProducts();
        res.render('home', {title:`Lista de productos 🛒`, products:_products.map(prod => prod.toJSON()) })
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});
router.get('/realtimeproducts', async (req, res) => {
    try
    {

        res.render('real-time-products', {title:`Real time products 🛒`});

    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});

module.exports = router;