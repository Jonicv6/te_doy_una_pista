const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();

const PUERTO = 3000;


// Settings
app.set('port', process.env.PORT || PUERTO);


// Middlewares
app.use(express.json());

//Access-Control-Allow-Origin
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Routes
app.use(require('./routes/main'));
app.use(require('./routes/reserve'));
app.use(require('./routes/sportcenter'));
app.use(require('./routes/track'));
app.use(require('./routes/comment'));
app.use(require('./routes/email'));


//Creamos el servidor de forma segura SSL
https.createServer({
    cert: fs.readFileSync('/etc/apache2/ssl/mi_certificado.crt'),
    key: fs.readFileSync('/etc/apache2/ssl/mi_certificado.key')
    //cert: fs.readFileSync('/etc/ssl/certs/ssl-cert-snakeoil.pem'),
    //key: fs.readFileSync('/etc/ssl/private/ssl-cert-snakeoil.pem')
    
  },app).listen(PUERTO, function(){
     console.log('Servidor https corriendo en el puerto '+PUERTO);
 });


// No necesario para SSL
/* Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})
*/



