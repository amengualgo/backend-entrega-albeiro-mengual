const { Router } = require('express');
const express = require("express");
const router = Router();
router.use(express.urlencoded({extended: true}));
const User = require('../dao/models/user.model');

router.post('/sessions/register', async (req, res) =>{
    try {
        const {body: {first_name,last_name,age,email,password}} = req;

        if (!first_name || !last_name || !email || !password) {
            //return res.status(400).json({'message': 'Todos los campos son requeridos.'});
            return  res.render('error', {tittle:'error', messageError : 'Todos los campos son requeridos.'})
        }
        const user = await User.create({
            first_name,
            last_name,
            age,
            email,
            password
        });
        res.redirect('/login');
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        //return  res.status(500).json({message:e.message})
        return  res.render('error', {tittle:'error', messageError : 'Todos los campos son requeridos.'})
    }
} )
router.post('/sessions/login', async (req, res) =>{
    try {
        const {body: {email,password}} = req;

        if (!email || !password) {
            //return res.status(400).json({'message': 'El email y el password son requeridos'});
            return  res.render('error', {tittle:'error', messageError : 'Credenciales inválidas'})
        }
        const user = await User.findOne({email});
        if(!user)
            //return res.status(401).json({'message': 'Credenciales inválidas'});
            return  res.render('error', {tittle:'error', messageError : 'Credenciales inválidas'})

        if(user.password !== password)
            //return res.status(401).json({'message': 'Credenciales inválidas'});
            return  res.render('error', {tittle:'error', messageError : 'Credenciales inválidas'})

        req.session.user =   (({ password, ...o }) => o)(user._doc);

        //return res.status(200).json({'message': 'Sesion iniciada correctamente'});

        return  res.redirect('/products');



    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
} )
router.get('/sessions/profile', async (req, res) =>{
    try {
        if(!req.session.user)
            return res.status(401).json({message:"No estás autenticado"})
        res.status(200).json(req.session.user);
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
} )

router.get('/sessions/logout', async (req, res) =>{
    try {
        req.session.destroy((error) =>{
            return  res.render('error', {tittle:'error', messageError : error.message})
        })
        res.redirect('/login');
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
} )

module.exports = router;