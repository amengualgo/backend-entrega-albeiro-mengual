const { Router } = require('express');
const express = require("express");
const router = Router();
router.use(express.urlencoded({extended: true}));
const User = require('../dao/models/user.model');
const {utils} = require('../common/utils');
const passport = require('passport');

router.post('/sessions/register',passport.authenticate('register', {failureRedirect:'/register'}), async (req, res) =>{
    try {
        res.redirect('/login');
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.render('error', {tittle:'error', messageError : 'Todos los campos son requeridos.'})
    }
} )
router.post('/sessions/login',passport.authenticate('login', {failureRedirect:'/login'}), async (req, res) =>{
    try {
        console.log('req.user', req.user);
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
router.post('/sessions/recover-pass', async (req, res) =>{
    try {
        const {body: {email,password}} = req;

        if (!email || !password) {
            return  res.render('error', {tittle:'error', messageError : 'Todos los datos son requeridos'})
        }
        const user = await User.findOne({email});
        if(!user)

            return  res.render('error', {tittle:'error', messageError : 'Credenciales inválidas'})

        user.password = utils.createHash(password);
        await User.updateOne({email}, user)

        return  res.redirect('/login');



    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
} )
router.get('/sessions/github', passport.authenticate('github', {scope:['user:email']}));
router.get('/sessions/github/callback', passport.authenticate('github', {failureRedirect:'/login'}), (req, res)=>{
    console.log('req.user', req.user);
    return  res.redirect('/products');
});

module.exports = router;