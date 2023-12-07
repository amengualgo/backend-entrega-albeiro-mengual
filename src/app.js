const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const sessions = require('express-session');
const FileStorage = require('session-file-store');
const SESSION_SECRET = 'Yw3[xh2sa9kRqO52qEU5aAmi;9-v>k';
const MongoStorage = require('connect-mongo');
const {mongo} = require('./db/mongodb')

const productsRouter =  require('./routers/products.router');
const cartsRouter =  require('./routers/carts.router');
const viewsRouter =  require('./routers/views.router');
const chatsRouter = require('./routers/chats.router');
const sessionsRouter = require('./routers/sessions.router');

const fileStorage = FileStorage(sessions);

app.use(sessions({
        //para archivos
        /*store:new fileStorage({
            path:path.join(__dirname, 'sessions'), ttl: 100, retries: 0
        }),*/
        //para bd mongo
        store: MongoStorage.create({
            mongoUrl:mongo.URI,
            mongoOptions:{},
            ttl:60*60*1, //1 hora
        }),
        secret:SESSION_SECRET,
        resave:true,
        saveUninitialized:true
    })
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'../public')));
app.use((error, req, res, next)=>{
    const message = `Ha ocurrido un error desconocido ${error.message}`;
    console.error(message);
    res.status(500).json({message});
});

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine',  'handlebars');


app.use((err, req, res, next)=>{
    const _messageError = `Ha ocurrido un error no controlado 🥴: ${err.message}`
    console.error(_messageError)
    res.status(500).json({_messageError});
    });

app.use('/api', productsRouter, cartsRouter, sessionsRouter);
app.use('/chat', chatsRouter);
app.use('/', viewsRouter);


module.exports = app;
