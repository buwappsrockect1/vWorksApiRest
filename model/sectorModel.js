
// connection to the database
let conn = require('./db');
let async = require('async');

// Sector object constructor
let Sector = function( sector ) {
    this.nombre        = sector.nombre          ;
    this.numero        = sector.numero          ;
    this.numLotes      = sector.numLotes    || 0;
    this.numEspecies   = sector.numEspecies || 0;
};

// createSector method
Sector.createSector = function( newSector, result ) {

    conn.query('INSERT INTO sector SET ?', newSector , (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            result(null, res.insertId);
        }

    });
};



// Get all Sectores
Sector.getAllSectores = function( result ) {


    async.parallel({

        arrSectores: function(callback) {
            
            conn.query( `SELECT * FROM sector ORDER BY numero ASC`, (err, resSectores) => {

                if (err) {
                    console.log('error: ', err);
                    callback(err,null);
                } else {

                    callback(null, resSectores);
      
                }
    
            });
        },
        
        arrNumLotes: function(callback) {
          
            conn.query( `SELECT s.id, count(*) as numLotes   
                            FROM sector s 
                            INNER JOIN lote l  
                            ON s.id = l.IdSector  
                            GROUP BY s.id`, (err, resNumLotes) => {

                if (err) {
                    console.log('error: ', err);
                    callback(err,null);
                } else {
                    
                    callback(null, resNumLotes);
                }

            });

        },
        arrNumEspecies: function(callback) {
            conn.query( `SELECT s.id , count(distinct(l.IdEspecie)) as numEspecies   
                            FROM sector s 
                            INNER JOIN lote l  
                            ON s.id = l.IdSector     
                            GROUP BY s.id`,  (err, resNumEspecies) => {

                if (err) {
                    console.log('error: ', err);
                    callback(err,null);
                } else {

                    callback(null, resNumEspecies);
                }

            });
        }

      },
      function(err, results) {
        if ( err ) result(err,null);
        
        // results array calculated in parallel
        arrSectores         = JSON.parse(JSON.stringify(results.arrSectores));
        arrNumLotes         = JSON.parse(JSON.stringify(results.arrNumLotes));
        arrNumEspecies      = JSON.parse(JSON.stringify(results.arrNumEspecies));

        arrSectores.map( (sector, index) => {
            
            let nLotes = [];
            nLotes = arrNumLotes.filter( (elemArrNumLotes) => elemArrNumLotes.id === sector.id);
            
            let nEspecies = [];
            nEspecies = arrNumEspecies.filter( (elemArrNumEspecies) => elemArrNumEspecies.id === sector.id);

            // set the numLotes of this sector
            sector.numLotes     = ( nLotes.length    === 0 ) ? 0 : nLotes[0].numLotes;
            sector.numEspecies  = ( nEspecies.length === 0 ) ? 0 : nEspecies[0].numEspecies;
        });

        result(null, arrSectores );

      });


    
};


// display a single Sector by ID
Sector.getSectorById = function( sectorId, result ) {


    async.parallel({

        arrSectores: function(callback) {
            
            conn.query( `SELECT * FROM sector  WHERE id = ? ORDER BY numero ASC`, sectorId, (err, resSector) => {

                if (err) {
                    console.log('error: ', err);
                    callback(err,null);
                } else {

                    callback(null, resSector);
    
                }

            });
        },
        
        arrNumLotes: function(callback) {
        
            conn.query( `SELECT s.id, count(*) as numLotes   
                            FROM sector s 
                            INNER JOIN lote l  
                            ON s.id = l.IdSector  
                            WHERE s.id = ?  
                            GROUP BY s.id`, sectorId, (err, resNumLotes) => {

                if (err) {
                    console.log('error: ', err);
                    callback(err,null);
                } else {
                    
                    callback(null, resNumLotes);
                }

            });

        },
        arrNumEspecies: function(callback) {
            conn.query( `SELECT s.id , count(distinct(l.IdEspecie)) as numEspecies   
                            FROM sector s 
                            INNER JOIN lote l  
                            ON s.id = l.IdSector 
                            WHERE s.id = ?      
                            GROUP BY s.id`, sectorId, (err, resNumEspecies) => {

                if (err) {
                    console.log('error: ', err);
                    callback(err,null);
                } else {

                    callback(null, resNumEspecies);
                }

            });
        }

    },
    function(err, results) {
        if ( err ) result(err,null);
        
        // results array calculated in parallel
        arrSectores         = JSON.parse(JSON.stringify(results.arrSectores));
        arrNumLotes         = JSON.parse(JSON.stringify(results.arrNumLotes));
        arrNumEspecies      = JSON.parse(JSON.stringify(results.arrNumEspecies));

        arrSectores.map( (sector, index) => {
            
            let nLotes = [];
            nLotes = arrNumLotes.filter( (elemArrNumLotes) => elemArrNumLotes.id === sector.id);
            
            let nEspecies = [];
            nEspecies = arrNumEspecies.filter( (elemArrNumEspecies) => elemArrNumEspecies.id === sector.id);

            // set the numLotes of this sector
            sector.numLotes     = ( nLotes.length    === 0 ) ? 0 : nLotes[0].numLotes;
            sector.numEspecies  = ( nEspecies.length === 0 ) ? 0 : nEspecies[0].numEspecies;
        });

        result(null, arrSectores[0] );

    });


};


// updating an existing Sector (PUT) (only updates nombre and numero )
Sector.updateById = function( sectorId, sector, result ) {

    conn.query('UPDATE sector SET nombre = ? , numero = ? WHERE id = ?', [sector.nombre, sector.numero, sectorId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// delete a Sector by ID
Sector.remove = function( sectorId, result ) {

    conn.query('DELETE FROM sector where id = ?', sectorId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// get numLotes of a  Sector by ID
Sector.getNumLotes = function( sectorId, result ) {
              
    conn.query( `SELECT s.id, count(*) as numLotes   
                    FROM sector s 
                    INNER JOIN lote l  
                    ON s.id = l.IdSector 
                    WHERE s.id = ?  
                    GROUP BY s.id`, sectorId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res[0] || null);
        }

    });
};


// get numEspecies of a  Sector by ID
Sector.getNumEspecies = function( sectorId, result ) {
              
    conn.query( `SELECT s.id , count(distinct(l.IdEspecie)) as numEspecies   
                    FROM sector s 
                    INNER JOIN lote l  
                    ON s.id = l.IdSector 
                    WHERE s.id = ?     
                    GROUP BY s.id`, sectorId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res[0] || null);
        }

    });
};


// module exports
module.exports = Sector;




