const express = require('express');
const app = express();
const http = require('http');
const server = http. createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const multer = require('multer');
const ip = '192.168.189.1';
const io = require('socket.io')(server);
const mercadopago = require('mercadopago');
mercadopago.configure({
    sandbox: true,
    access_token: 'Bearer TEST-4332423066954571-102200-779dd861dfaa9f6acb7609a1887ee3f3-191014229' // Access token here
});

/* 
* IMPORTAR SOCKETS
*/
const ordersSocket = require('./sockets/ordersSocket');

/* 
* IMPORTAR RUTAS
*/
const usersRoutes = require('./routes/userRoutes');
const categoriesRoutes = require('./routes/categoryRoutes');
const productsRoutes = require('./routes/productRoutes');
const addressRoutes = require('./routes/addressRoutes');
const ordersRoutes = require('./routes/orderRoutes');
const mercadoPagoRoutes = require('./routes/mercadoPagoRoutes');


const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.disable('x-powered-by');

app.set('port', port);

/* 
* LLAMADO A LOS SOCKETS
*/
ordersSocket(io);

const upload = multer({
    storage: multer.memoryStorage()
});

/* 
* LLAMAR RUTAS
*/
usersRoutes(app, upload);
categoriesRoutes(app, upload);
productsRoutes(app, upload);
addressRoutes(app);
ordersRoutes(app);
mercadoPagoRoutes(app);

server.listen(3000, ip || 'localhost', function() {
    console.log('Aplicacion de NodeJS ' + process.pid + ' Iniciada...');
    console.log(`Listening on ${this.address().port}`);
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del backend')
});

app.get('/test', (req, res) => {
    res.send('Esta es la ruta TEST')
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});