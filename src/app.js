
const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');

const PORT = 8080;
const productsRouter =  require('./routers/products.router');
const cartsRouter =  require('./routers/carts.router');
const viewsRouter =  require('./routers/views.router');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'../public')));

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine',  'handlebars');

app.use('/api', productsRouter, cartsRouter);
app.use('/', viewsRouter);
app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en el puerto ${PORT}`);
})