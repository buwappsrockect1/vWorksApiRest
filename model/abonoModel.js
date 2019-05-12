
// connection to the database
let conn = require('./db');

// Abono object constructor
let Abono = function( abono ) {
    this.nombre        = abono.nombre       ;
    this.simbolo       = abono.simbolo      ;
    this.composicion   = abono.composicion  ;
    this.otros         = abono.otros        ;
    this.deleted       = abono.deleted      ;
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

    conn.query(`SELECT * 
                FROM abono 
                WHERE deleted = 0 
                ORDER BY nombre`, (err, res) => {

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

    conn.query('SELECT * FROM abono WHERE id = ? AND deleted = 0', AbonoId, (err, res) => {

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


// delete a Abono by ID ( removes it logically - deleted column )
Abono.remove = function( AbonoId, result ) {

    conn.query('UPDATE abono SET deleted = 1 WHERE id = ?', AbonoId, (err, res) => {

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




