
// connection to the database
let conn = require('./db');

// Operario object constructor
let Operario = function( Operario ) {

    this.nombre             = operario.nombre                   ;
    this.apellidos          = operario.apellidos                ;
    this.codigo             = operario.codigo                   ;
    this.nombreOperaciones  = operario.nombreOperaciones        ;
    this.departamento       = operario.departamento             ;
    this.puestoTrabajo      = operario.puestoTrabajo            ;
    this.telefono           = operario.telefono                 ;
   
};

// createOperario method
Operario.createOperario = function( newOperario, result ) {

    conn.query('INSERT INTO operario SET ?', newOperario , (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            result(null, res.insertId);
        }

    });
};


// Get all Operarios
Operario.getAllOperarios = function( result ) {

    conn.query('SELECT * FROM operario', (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// display a single Operario by ID
Operario.getOperarioById = function( operarioId, result ) {

    conn.query('SELECT * FROM operario WHERE id = ?', operarioId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res[0]);
        }

    });
};


// updating an existing Operario (PUT)
Operario.updateById = function( operarioId, operario, result ) {

    conn.query('UPDATE operario SET ? WHERE id = ?', [operario, operarioId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// delete a Operario by ID
Operario.remove = function( operarioId, result ) {

    conn.query('DELETE FROM operario where id = ?', operarioId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// module exports
module.exports = Operario;




