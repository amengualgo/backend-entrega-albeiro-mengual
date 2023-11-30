const http = require('http');
const app = require('./app');
const PORT = 8080;
const {init} = require('./socket');


const initDB = require('./db/mongodb')
const server = http.createServer(app);

(async() => {
    await initDB().then(()=>{
        server.listen(PORT, () => {
            console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
            init(server);
        })
    });
})();

