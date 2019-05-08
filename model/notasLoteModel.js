
// connection to the database
let conn = require('./db');

// NotasLote object constructor
let NotasLote = function( notasLote ) {
    this.fecha        = notasLote.fecha       ;
    this.nota         = notasLote.nota        ; 
    this.IdLote       = notasLote.IdLote      ;   
};

// createNotasLote method
NotasLote.createNotasLote = function( newNotasLote, result ) {

    conn.query('INSERT INTO notas_lote SET ?', newNotasLote , (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            result(null, res.insertId);
        }

    });
};


// Get all NotasLotes
NotasLote.getAllNotasLote = function( loteId, result ) {
    
    conn.query('SELECT * FROM notas_lote WHERE IdLote = ? ORDER BY fecha DESC , id DESC', loteId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// display a single NotasLote by ID
NotasLote.getNotasLoteById = function( notaId, result ) {

    conn.query('SELECT * FROM notas_lote WHERE id = ? ORDER BY fecha DESC, id DESC', notaId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res[0]);
        }

    });
};


// updating an existing NotasLote (PUT)
NotasLote.updateById = function( notaId, notasLote, result ) {

    conn.query('UPDATE notas_lote SET ? WHERE id = ?', [notasLote, notaId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// delete a NotasLote by ID
NotasLote.remove = function( notaId, result ) {

    conn.query('DELETE FROM notas_lote where id = ?', notaId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// module exports
module.exports = NotasLote;




