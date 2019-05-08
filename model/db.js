let mysql = require('mysql');

//local mysql db connection

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'vivero_w01'
});


/*
var connection = mysql.createConnection({
    host     : '51.77.140.197',
    user     : 'buwappsMYSQL01',
    password : '9bhl0sM>34-.R',
    database : 'vivero_w01'
});
*/
/*
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'buwappsMYSQL01',
    password : '9bhl0sM>34-.R',
    database : 'vivero_w01'
});
*/

connection.connect( (err) => {
    if (err) throw err;
});

/*
connection.on('close', function(err) {
    
    if (err) {
      
        // Oops! Unexpected closing of connection, lets reconnect back.
      connection = mysql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'vivero_w01'
      });

    } else {
      console.log('Connection closed normally.');
    }

});
*/

// Si el proceso node termina se cierra la conexion mongoose
process.on( 'SIGINT' , () => {
    connection.end( () => {
        console.log( 'Mysql database default connection disconnected trought app termination' );
        process.exit(0);
    });
});

// exports the connection
module.exports = connection;