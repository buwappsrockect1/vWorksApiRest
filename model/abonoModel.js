
// connection to the database
let conn = require('./db');

// Abono object constructor
let Abono = function( abono ) {
    this.nombre        = abono.nombre       ;
    this.simbolo       = abono.simbolo      ;
    this.composicion   = abono.composicion  ;
    this.otros         = abono.otros        ;
};

// createAbono method
Abono.createAbono = function( newAbono, result ) {

    conn.query('INSERT INTO abono SET ?', newAbono , (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            result(null, res.insertId);
        }

    });
};


// Get all Abonos
Abono.getAllAbonos = function( result ) {

    conn.query('SELECT * FROM abono', (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// display a single Abono by ID
Abono.getAbonoById = function( AbonoId, result ) {

    conn.query('SELECT * FROM abono WHERE id = ?', AbonoId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res[0]);
        }

    });
};


// updating an existing Abono (PUT)
Abono.updateById = function( abonoId, abono, result ) {

    conn.query('UPDATE abono SET ? WHERE id = ?', [abono, abonoId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// delete a Abono by ID
Abono.remove = function( AbonoId, result ) {

    conn.query('DELETE FROM abono where id = ?', AbonoId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// module exports
module.exports = Abono;




