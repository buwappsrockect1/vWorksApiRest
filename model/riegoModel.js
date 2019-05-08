
// connection to the database
let conn = require('./db');

// Riego object constructor
let Riego = function( riego ) {

    this.fecha             = riego.fecha                   ;
    this.hora              = riego.hora                    ;
    this.IdOperario        = riego.IdOperario              ;
    this.IdSector          = riego.IdSector                ;
    this.comentario        = riego.comentario              ;
};

// createRiego method
Riego.createRiego = function( newRiego, result ) {

    conn.query('INSERT INTO riego SET ?', newRiego , (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            result(null, res.affectedRows);
        }

    });
};


// Get all Riegos of a Sector
Riego.getAllRiegos = function( sectorId, result ) {

    conn.query(`SELECT * FROM riego WHERE IdSector = ? ORDER BY riego.fecha DESC, riego.hora DESC  LIMIT 21`, sectorId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// display a single Riego by fecha, hora , operarioId, sectorId ( key fields )
Riego.getRiegoByPrimaryKey = function( fecha, hora, operarioId, sectorId , result ) {

    conn.query('SELECT * FROM riego WHERE fecha = ? AND hora = ? AND IdOperario = ? AND IdSector = ?', 
                [fecha , hora, operarioId, sectorId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res[0]);
        }

    });
};




// delete a Riego by fecha, hora , operarioId, sectorId ( key fields )
Riego.remove = function( fecha, hora, operarioId, sectorId, result ) {

    conn.query('DELETE FROM riego where WHERE fecha = ? AND hora = ? AND IdOperario = ? AND IdSector = ?', 
    [fecha , hora, operarioId, sectorId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res.affectedRows);
        }

    });
};


// module exports
module.exports = Riego;




