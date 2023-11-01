const { Router } = require('express');
const ProductManager = require("../classes/product-manager");
const express = require("express");
const Product = require("../classes/product");
const {uploader} = require('../common/utils');
const router = Router();
const productManager = new ProductManager('./products.json');
router.use(express.urlencoded({extended: true}));
router.get('/products', async (req, res) => {
    try{
        const products = await productManager.getProducts();
        const {query} = req;
        const limit = parseInt(query.limit);
        return res.json(limit ? products.slice(0, limit) : products);
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({error:e.message})
    }
});
router.get('/products/:pid', async (req, res) => {
    try
    {
        const {params} = req;
        const pid = parseInt(params.pid);
        const product = pid ? await productManager.findById(pid) : undefined;
        return product ? res.json(product) : res.status(404).json({'message':'not found'});
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});
router.post('/products', uploader.single('thumbnail'), async (req, res) => {
    let {body} = req;
    body.thumbnail = req.file.path;
    try{
        const _response = await productManager.addProduct(body);
        if(_response.status){
            res.status(201).json({message:_response.message});

        }else{
            res.status(400).json({errors:_response.errors});
        }
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});
router.put('/products/:pid', async (req, res) => {
    const {body} = req;
    const {params} = req;
    try{
        const _response = await productManager.updateProduct(parseInt(params.pid), body);
        if(_response.id){
            res.status(200).json({..._response})
        }else{
            res.status(400).json({errors:"Elemento no existe"})
        }
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});
router.delete('/products/:pid', async (req, res) => {
    const {params} = req;
    try{
        const _response = await productManager.deleteProduct(parseInt(params.pid));
        if(!_response){
            res.status(400).json({errors:"Elemento no existe"});

        }else{
            res.status(200).json({message:"Elemento eliminado correctamente"});;
        }
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
});



module.exports = router;