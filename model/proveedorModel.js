
// connection to the database
let conn = require('./db');

// Proveedor object constructor
let Proveedor = function( proveedor ) {
    this.nombre             = proveedor.nombre              ;
    this.nombre2Digitos     = proveedor.nombre2Digitos      ;
    this.telefono           = proveedor.telefono            ;
    this.email              = proveedor.email               ;
    this.personaResponsable = proveedor.personaResponsable  ;
    this.personaContacto    = proveedor.personaContacto     ;
    this.direccion          = proveedor.direccion           ;
    this.localidad          = proveedor.localidad           ;
    this.deleted            = proveedor.deleted             ;
};

// createProveedor method
Proveedor.createProveedor = function( newProveedor, result ) {

    conn.query('INSERT INTO proveedor SET ?', newProveedor , (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res.insertId);
        }

    });
};


// Get all Proveedores
Proveedor.getAllProveedores = function( result ) {

    conn.query('SELECT * FROM proveedor WHERE deleted = 0', (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// display a single Proveedor by ID
Proveedor.getProveedorById = function( proveedorId, result ) {

    conn.query('SELECT * FROM proveedor WHERE id = ? AND deleted = 0', proveedorId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res[0]);
        }

    });
};


// updating an existing Proveedor (PUT)
Proveedor.updateById = function( proveedorId, proveedor, result ) {

    conn.query('UPDATE proveedor SET ? WHERE id = ?', [proveedor, proveedorId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// delete a Proveedor by ID
Proveedor.remove = function( proveedorId, result ) {

    conn.query('UPDATE proveedor SET deleted = 1 WHERE id = ?', proveedorId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// module exports
module.exports = Proveedor;




