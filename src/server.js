const http = require('http');
const app = require('./app');
const PORT = 8080;
const {init} = require('./socket');
const server = http.createServer(app);
init(server);
server.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`);
})