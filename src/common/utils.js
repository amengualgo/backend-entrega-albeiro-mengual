const multer =  require('multer');
const path = require('path');
const {v4: uuidv4} = require("uuid");

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