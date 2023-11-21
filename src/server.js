const http = require('http');
const app = require('./app');
const PORT = 8080;
const {init} = require('./socket');
const initDB = require('./db/mongodb')
const server = http.createServer(app);
initDB();
init(server);



server.listen(PORT, () => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
})
