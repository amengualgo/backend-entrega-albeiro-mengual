const multer =  require('multer');
const path = require('path');
const {v4: uuidv4} = require("uuid");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken')
const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        const folderPath = path.join(__dirname, '../../public/img');
        console.log('folderPath', folderPath);
        callback(null, folderPath);
    },
    filename:(req, file, callback)=>{
        callback(null, uuidv4()+'__'+file.originalname);
    }
})
const opts={
    storage
};

module.exports.uploader = multer(opts);
const JWTSecret = '9^R353Q*49YuzMit'
module.exports = {
    utils: {
        uploader: multer(opts),
        createHash: (password)=>{
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        },
        isValidPassword : (password, user)=>{
            return bcrypt.compareSync(password, user.password);
        },
        generateToken:(user)=>{
            const payload = {
                id:user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email:user.email
            }
            return JWT.sign(payload,JWTSecret, {expiresIn: '24h'});
        },
        verifyToken:(token)=>{
            return new Promise((resolve)=>{
                return JWT.verify(token,JWTSecret,(error, payload)=>{
                    if(error){
                        return resolve(false);
                    }
                    resolve(payload);
                });
            });

        }
    }
}
