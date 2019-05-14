
// connection to the database
let conn = require('./db');

// Lote object constructor
let Lote = function( lote ) {
    this.nombre                     = lote.nombre               ;
    this.IdEspecie                  = lote.IdEspecie            ;
    this.IdVariedad                 = lote.IdVariedad           ;
    this.cantidad                   = lote.cantidad             ;
    this.stockMinimo                = lote.stockMinimo          ;
    this.IdSector                   = lote.IdSector             ;
    this.fechaEntrada               = lote.fechaEntrada         ;
    this.IdOperarioEncargado        = lote.IdOperarioEncargado  ;
    this.IdProveedorOrigen          = lote.IdProveedorOrigen    ;
    this.codProveedor               = lote.codProveedor         ;
    this.qrTrazabilidad             = lote.qrTrazabilidad       ;
    this.notas                      = lote.notas                ; 
    this.deleted                    = lote.deleted              ;         
};


// createLote method
Lote.createLote = function( newLote, result ) {

     // Generate lote nombre

     // where to store the name of the Lote 
     let nombreLoteCalculado = [];


     let query = 'SELECT nombre2Digitos FROM proveedor WHERE id = ?';
     let IdProveedorOrigen = newLote.IdProveedorOrigen;
     
     addToLoteNombre( query, IdProveedorOrigen , nombreLoteCalculado )
        .then( function(nombreLoteCalculado) {

            // we get the num lote ( global number )
            let promise = new Promise( function(resolve, reject) {
                
                let today = new Date();
                let year = parseInt( today.getFullYear() );

                conn.query('SELECT numeroLote FROM contador_lotes WHERE anio = ?', year, (err, rows) => {
            
                    if (err) throw err;
                    
                    // increases the numeroLote 
                    let tmpNumLote = parseInt(rows[0].numeroLote) +1 ;

                    // updates this
                    conn.query('UPDATE contador_lotes SET numeroLote = ? WHERE anio = ?', [tmpNumLote, year], (err, rowsUpdated) => {
                    
                        // adds the number with padding 0s on the left side ( max length 5 digits )
                        nombreLoteCalculado.push( pad(tmpNumLote , 5) );

                        resolve(nombreLoteCalculado);

                    });
                        
                });
              
              
            })
            
            return promise;
        })
        .then( function(nombreLoteCalculado) {

            let promise = new Promise( function(resolve, reject) {
               
                tmpFecha = removeSlashInDate( newLote.fechaEntrada );
                nombreLoteCalculado.push(tmpFecha);

                resolve(nombreLoteCalculado);
              
            })
            
            return promise;
        })
        .then( function( nombreLoteCalculado ) {
            let promise = new Promise( function(resolve, reject) {
                    
                conn.query(`SELECT codigo FROM operario WHERE id = ?`, newLote.IdOperarioEncargado, (err, rows) => {
            
                    if (err) throw err;
                     
                    nombreLoteCalculado.push(rows[0].codigo);
                    resolve(nombreLoteCalculado);
                });
              
            })
            
            return promise;    
        })
        .then( function(nombreLoteCalculado) {

            // calculated lote name
            newLote.nombre = nombreLoteCalculado.join('-');
            
            conn.query('INSERT INTO lote SET ?', newLote , (err, res) => {

                if (err) {
                    console.log('error: ', err);
                    result(err,null);
                } else {
                    result(null, res.insertId);
                }
        
            });
        })
        .catch(err => console.log(err.message));
 

    
    
};


// Get all Lotes
Lote.getAllLotes = function( result ) {

    conn.query('SELECT * FROM lote WHERE deleted = 0', (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};

// Get all Lotes in a Sector
Lote.getAllLotesInSector = function( sectorId, result ) {

    conn.query('SELECT * FROM lote WHERE IdSector = ? AND deleted = 0', sectorId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};

// display a single Lote by ID
Lote.getLoteById = function( loteId, result ) {

    conn.query('SELECT * FROM lote WHERE id = ? AND deleted = 0', loteId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res[0]);
        }

    });
};


// updating an existing Lote (PUT)
Lote.updateById = function( loteId, lote, result ) {

    conn.query('UPDATE lote SET ? WHERE id = ?', [lote, loteId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// delete a Lote by ID
Lote.remove = function( loteId, result ) {

    conn.query('UPDATE lote SET deleted = 1 where id = ?', loteId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


 

addToLoteNombre = function (query, data, array) {
    const promise = new Promise( function(resolve, reject) {
        
        conn.query(query, data, (err, rows) => {
    
            if (err) throw err;
    
            array.push(rows[0].nombre2Digitos);
            resolve(array);
        });
      
      if (!array) {
        reject(new Error('No existe un array'))
      }
    })
    
    return promise;

};

// converts 12/02/2019  into 12022019 ( remove '/' ) 
removeSlashInDate= function( dateStr ) {

    let fechaEntradaLote = dateStr ;
    let tmpFecha = '';
    let idx_first = fechaEntradaLote.indexOf('/');
    // day in date
    tmpFecha += fechaEntradaLote.substr(0, idx_first);              
    

    let idx_last  = fechaEntradaLote.lastIndexOf('/');
    // month in date
    tmpFecha += fechaEntradaLote.substr( idx_first+1, 2);          
    
    // year in date (2 digits)
    tmpFecha += fechaEntradaLote.substr( idx_last+3);             

    return tmpFecha;

}


// adds 0 to the left filling the number
pad = function(number, length) {
   
    let str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}

// module exports
module.exports = Lote;




