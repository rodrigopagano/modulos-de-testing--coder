//const config = require('dotenv');
const express = require('express');
const {connectionSocket} = require('./utils/soket.io');
const {Server} = require('socket.io');
const mongoose = require('mongoose');
const server = express();

const handlebars = require('express-handlebars');
const productsRoute = require('./routes/products.routes');
const productsDBroute = require('./routes/ProductsDB.routes');
const cartsDBroute = require('./routes/cartsDB.routes');
const Chatroute = require('./routes/chat.routes')
const cardsRoute = require ('./routes/carts.routes');
const sessionRoute = require('./routes/session.routes');
const viewRoute = require('./routes/views.route');
const initpassaport =require('./utils/passport.config');
const passport = require('passport');
const { MONGODBURL, PORT } = require('./config/config');
const mdwError = require('./utils/middleware/errors');
const mdwLogger = require('./config/configWinston');
const loggerTest = require('./controller/controller.logger');
const { logger } = require('winston');
if (MONGODBURL) import('./config/configDB');
const cookie = require('cookie-parser');


const httpServer = server.listen(PORT, () => 
 Logger.debug(` Server started on port http://localhost:${PORT}`),
)



server.engine('handlebars', handlebars.engine());
server.set('views', __dirname + '/views');
server.set('view engine', 'handlebars');

initpassaport();
server.use(passport.initialize());
server.use(cookie())

server.use(express.static(__dirname+'/public'));
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use(mdwLogger);


server.use("/api/products/", productsRoute);
server.use("/api/carts/", cardsRoute);
server.use("/", viewRoute);
server.use("/api/productsDB/",productsDBroute);
server.use("/api/cartsDB/",cartsDBroute);
server.use("/api/chat/",Chatroute);
server.use("/api/session/",sessionRoute)
server.use('api/loggertest',loggertest)


server.use(mdwerror);



connectionSocket (httpServer);
