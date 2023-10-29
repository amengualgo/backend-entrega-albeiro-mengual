const multer =  require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        const folderPath = path.join(__dirname, '../public/img');
        console.log('folderPath', folderPath);
        callback(null, folderPath);
    },
    filename:(req, file, callback)=>{
        callback(null, file.originalname);
    }
})

const opts={
    storage
};

module.exports.uploader = multer(opts);