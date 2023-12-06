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
        const {query} = req;
        const _products = await productManagerDB.getProducts(query, undefined);
        let paginateValues = (({ docs, ...o }) => o)(_products);
        paginateValues.nextLink = paginateValues.nextLink ? paginateValues.nextLink.replaceAll('/api/products','') : null;
        paginateValues.prevLink = paginateValues.prevLink  ? paginateValues.prevLink.replaceAll('/api/products',''):null
        res.render('home', {title:`Lista de productos 🛒`, products:_products.payload.map(prod => prod.toJSON()),
        ...paginateValues});
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