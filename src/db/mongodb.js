const mongoose = require('mongoose');

const URI = 'mongodb+srv://amengualgo:P77f3m3Ao8bz0WnF@cluster0.vxiyarj.mongodb.net/ecommerce?retryWrites=true&w=majority';

const initDB = async function (){
    try {
        await mongoose.connect(URI);
        console.log('Database connected suscessfully');

    }catch (e) {
        console.error(`An error occurred while trying to connect to the DB: ${e.message}`)
        throw(`An error occurred while trying to connect to the DB: ${e.message}`);
    }
}
module.exports = {
    mongo: {
        initDB: initDB,
        URI: URI
    }
}

