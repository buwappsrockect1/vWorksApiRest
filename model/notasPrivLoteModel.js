
// connection to the database
let conn = require('./db');

// NotasLotePriv object constructor
let NotasPrivLote = function( notasPrivLote ) {
    this.fecha        = notasPrivLote.fecha       ;
    this.nota         = notasPrivLote.nota        ; 
    this.IdLote       = notasPrivLote.IdLote      ;   
};

// createNotasPrivLote method
NotasPrivLote.createNotasPrivLote = function( newNotasPrivLote, result ) {

    conn.query('INSERT INTO notas_priv_lote SET ?', newNotasPrivLote , (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            result(null, res.insertId);
        }

    });
};


// Get all NotasPrivLotes
NotasPrivLote.getAllNotasPrivLote = function( loteId, result ) {
    
    conn.query('SELECT * FROM notas_priv_lote WHERE IdLote = ? ORDER BY fecha DESC , id DESC', loteId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// display a single NotasPrivLote by ID
NotasPrivLote.getNotasPrivLoteById = function( notaId, result ) {

    conn.query('SELECT * FROM notas_priv_lote WHERE id = ? ORDER BY fecha DESC, id DESC', notaId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res[0]);
        }

    });
};


// updating an existing NotasPrivLote (PUT)
NotasPrivLote.updateById = function( notaId, notasPrivLote, result ) {

    conn.query('UPDATE notas_priv_lote SET ? WHERE id = ?', [notasPrivLote, notaId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// delete a NotasPrivLote by ID
NotasPrivLote.remove = function( notaId, result ) {

    conn.query('DELETE FROM notas_priv_lote where id = ?', notaId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// module exports
module.exports = NotasPrivLote;




