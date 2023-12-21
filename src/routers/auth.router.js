const { Router } = require('express');
const express = require("express");
const router = Router();
router.use(express.urlencoded({extended: true}));
const UserModel = require('../dao/models/user.model');
const {utils} = require('../common/utils');
const passport = require('passport');

const jwtAuth = async (req, res, next)=>{

    try {
        const { headers: {authorization:token} } = req;
        const payload = await utils.verifyToken(token);
        if(!payload){
            return res.status(401).json({message:'No estás autorizado'});
        }

        res.user = payload;
        next();
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }


}
router.post('/auth/login', async (req, res) =>{
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(401).json({message:'Usuario o password inválido'});
        }

        const isValidPassword = utils.isValidPassword(password, user);
        if(!isValidPassword){
            return res.status(401).json({message:'Usuario o password inválido'});
        }
        const token = utils.generateToken(user);

        res.status(200).json({access_token:token});

    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
} )




router.get('/auth/current', jwtAuth,async (req, res) =>{
    try {
        res.status(200).json(res.user);
    }catch (e) {
        console.log('A ocurrido un error: ', e.message);
        return  res.status(500).json({message:e.message})
    }
} )



module.exports = router;