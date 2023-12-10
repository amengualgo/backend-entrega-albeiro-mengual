const multer =  require('multer');
const path = require('path');
const {v4: uuidv4} = require("uuid");
const bcrypt = require('bcrypt');
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

module.exports = {
    utils: {
        uploader: multer(opts),
        createHash: (password)=>{
            return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        },
        isValidPassword : (password, user)=>{
            return bcrypt.compareSync(password, user.password);
        }
    }
}
