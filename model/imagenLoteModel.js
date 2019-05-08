 
// connection to the database
let conn = require('./db');



// ImagenLote object constructor
let ImagenLote = function( imagenLote ) {
    this.fecha        = imagenLote.fecha       ;
    this.imagen       = imagenLote.imagen      ;
    this.IdLote       = imagenLote.IdLote      ;
    this.comentario   = imagenLote.comentario  ;
};

// createImagenLote method
ImagenLote.createImagenLote = function( newImagenLote, result ) {

    conn.query('INSERT INTO imagenes_lote SET ?', newImagenLote , (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            result(null, res.insertId);
        }

    });
    
};



// Get all ImagenLotes
ImagenLote.getAllImagenesLotes = function( imagenLoteId , result ) {

    conn.query(`SELECT * 
                FROM imagenes_lote  
                WHERE imagenes_lote.IdLote = ?    
                ORDER BY imagenes_lote.fecha DESC, imagenes_lote.id DESC  
                LIMIT 0, 9`, imagenLoteId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// display a single ImagenLote by ID
ImagenLote.getImagenLoteById = function( imagenLoteId, result ) {

    conn.query(`SELECT * 
                FROM imagenes_lote  
                WHERE imagenes_lote.id = ?`, imagenLoteId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res[0]);
        }

    });
};

/*
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
*/

// delete a ImagenLote by ID
ImagenLote.remove = function( imagenLoteId, result ) {

    conn.query('DELETE FROM imagenes_lote WHERE id = ?', imagenLoteId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};



// module exports
module.exports = ImagenLote;




