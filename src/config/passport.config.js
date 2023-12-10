const passport = require('passport');
const {Strategy : LocalStrategy} = require('passport-local');

const UserModel = require('../dao/models/user.model');
const User = require("../dao/models/user.model");
const {utils} = require("../common/utils");

const init = ()=>{
    const registerOpts = {
        usernameField : 'email',
        passReqToCallBack : true
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
    })
}


module.exports = init;