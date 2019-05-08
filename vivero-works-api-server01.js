// Setting up the Express Server
const express = require('express');
const port = process.env.PORT || 3051;
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const routes = require('./route/appRoutes');


// Cfg del puerto de escucha
app.set( 'port' , port );



// Use Node body-parser middleware
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({
    extended: true
}))

// enable cors
app.use( cors() );



// accept routes ( routes module )
routes(app);

// ROUTES
app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
   
});



// configuracion del directorio 'dist' como directorio estático
// directorio donde tenemos los archivos obtenidos en el build de nuestro aplicacion Angular
//app.use( express.static( path.join( __dirname, 'dist') ) );

/*
app.get('*', (req, res) => {
    res.sendFile( path.join( __dirname, 'dist/index.html' ) );
});
*/



// global error handler
app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500).send({ error: err });
});





// Start the Server
const server = app.listen( port , (error) => {
    
    if ( error ) 
        return console.log(`Error: ${error}`);

    console.log(`Server is listening on port ${port}`);


});


