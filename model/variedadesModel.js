
// connection to the database
let conn = require('./db');

// Variedades object constructor
let Variedades = function( variedad ) {
    this.nombre        = variedad.nombre       ;  
};

// createVariedad method
Variedades.createVariedad = function( newVariedad, especieId, result ) {

    newVariedad.IdEspecie = especieId ;

    conn.query('INSERT INTO variedades SET ?', newVariedad , (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            result(null, res.insertId);
        }

    });

};


// Get all Variedades
Variedades.getAllVariedades = function( especieId, result ) {

    conn.query('SELECT id, nombre FROM variedades WHERE IdEspecie = ?', especieId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};



// updating an existing Variedad (PUT)
Variedades.updateById = function( variedadesId, variedad, result ) {

    conn.query('UPDATE variedades SET nombre = ? WHERE id = ?', [variedad.nombre, variedadesId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// delete a Variedad by ID
Variedades.remove = function( variedadesId, result ) {

    conn.query('DELETE FROM variedades where id = ?', variedadesId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// module exports
module.exports = Variedades;




