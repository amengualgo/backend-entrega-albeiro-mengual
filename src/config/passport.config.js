const passport = require('passport');
const {Strategy : LocalStrategy} = require('passport-local');
const {Strategy : GithubStrategy} = require('passport-github2');
const UserModel = require('../dao/models/user.model');
const User = require("../dao/models/user.model");
const {utils} = require("../common/utils");


const init = ()=>{
    const registerOpts = {
        usernameField : 'email',
        passReqToCallBack : true
    };
    const githubOpts={
        clientID: 'Iv1.fc0f7f17685f2399',
        clientSecret: 'c205edbab2a1fb247a0ceba7281524f3bcf49dda',
        callbackURL:'http://localhost:8080/api/sessions/github/callback'
    };
    passport.use('register', new LocalStrategy(registerOpts, async (req, email, password, done) => {
        const {body: {first_name, last_name, age,}} = req;

        if (!first_name || !last_name) {
            //return res.status(400).json({'message': 'Todos los campos son requeridos.'});
            return done(new Error('Todos los campos son requeridos.'));
        }

        const user = await UserModel.findOne({email});

        if (user) {
            //return res.status(400).json({'message': 'Todos los campos son requeridos.'});
            return done(new Error(`Usuario ya existe un usuario con el correo ${email}`));
        }

        const newUser = await User.create({
            first_name,
            last_name,
            age,
            email,
            password: utils.createHash(password)
        });

        done(null, newUser);


    }));
    passport.use('login', new LocalStrategy({usernameField : 'email',}, async (email, password, done) => {
        const user = await UserModel.findOne({email});
        if(!user){
            return  done(new Error('Credenciales inválidas'));
        }

        const isNotValidPass = utils.isValidPassword(password, user);

        if(isNotValidPass){
            return  done(new Error('Credenciales inválidas'));
        }

        done(null, user);

    }));
    passport.serializeUser((user, done)=>{
        done(null, user._id);
    });
    passport.deserializeUser(async (uid, done)=>{
        const user = await UserModel.findById(uid);
        done(null, user);
    });
    passport.use('github', new GithubStrategy(githubOpts, async (accesstoken, refreshtoken, profile, done)=>{
        const email = profile._json.email;
        let user = await  UserModel.findOne({email});
        if(user){
            return done(null, user);
        }
        user = {
            password: '',
            email,
            first_name: profile._json.name,
            last_name : '',
            age:18
        }
        const newUser =  await UserModel.create(user);
        done(null, newUser);
    }))

}


module.exports = init;