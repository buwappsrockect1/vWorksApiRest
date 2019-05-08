
// connection to the database
let conn = require('./db');

// class to Insert an AbonadoAbono 
let AbonadoAbono = function(IdAbonado,IdAbono) {
    this.IdAbonado   = IdAbonado  ;
    this.IdAbono     = IdAbono
};


// Abonado object constructor
let Abonado = function( abonado ) {
    this.fecha        = abonado.fecha       ;
    this.IdSector     = abonado.IdSector    ; 
    this.IdOperario   = abonado.IdOperario  ;  
    this.abonos       = abonado.abonos      ; 
};

// createAbonado method
Abonado.createAbonado = function( newAbonado, result ) {

    // Abonado data to insert into abonados
    let newAbonadoData = {
        fecha:      newAbonado.fecha        ,
        IdSector:   newAbonado.IdSector     ,
        IdOperario: newAbonado.IdOperario
    };

    conn.query('INSERT INTO abonados SET ?', newAbonadoData , (err, resAbonados) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {

            // if we have abonos
            if ( newAbonado.abonos.length > 0 ) {
                    
                // abonos del Abonado
                let abonos = JSON.parse(JSON.stringify(newAbonado.abonos));
                
                let abonosPromises = [];
                
                abonos.forEach((abonoAbonar) => {
                    
                    abonosPromises.push( 
                        conn.query('INSERT INTO abonado_abono SET ?',
                                    new AbonadoAbono(resAbonados.insertId, abonoAbonar.id),
                                    (err, resAbonoAbonar) => {

                                        if (err) {
                                            console.log('error: ', err);
                                            result(err, null);
                                        } else {
                                            //console.log('insertado: ' + abonoAbonar.nombre);
                                        }

                                    })
                    );
                    
                });

                Promise.all(
                    abonosPromises
                ).then( (values) => {
                    //console.log(resAbonados.insertId);
                    result(null, resAbonados.insertId);
                })
                .catch(function(err) {
                    console.log(err);
                    result(err, null);
                }); 

            } else {

                resAbonados.abonos = [];
                result(null, resAbonados.insertId);
            }


        }

    });
};


// Get all Abonados
Abonado.getAllAbonados = function( sectorId, result ) {
    
    conn.query('SELECT * FROM abonados WHERE IdSector = ? ORDER BY fecha DESC , id DESC', sectorId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            // if there are elements in the query ( there are results )
            if ( res.length > 0 ) {

                res = JSON.parse(JSON.stringify(res));

                conn.query(`SELECT a.id as abonadoId, abon.id , abon.nombre , abon.simbolo 
                            FROM abonados a  
                            LEFT JOIN abonado_abono ab 
                            INNER JOIN abono abon 
                            ON ab.IdAbono = abon.id 
                            ON a.id = ab.IdAbonado 
                            WHERE a.IdSector = ?  
                            ORDER BY a.fecha DESC, a.id DESC`, sectorId ,(err, resAbonadoAbono) => {

                            if (err) {
                                console.log('error: ', err);
                                result(err, null);
                            } else {

                                resAbonadoAbono = JSON.parse(JSON.stringify(resAbonadoAbono));
                                
                                res.forEach((abonado, index) => {
                                    const myMatch = resAbonadoAbono.filter(elemAbono => abonado.id === elemAbono.abonadoId);
                                    
                                    if ( myMatch.length === 0  ) {
                                        res[index].abonos = [];
                                    } else {
                                        res[index].abonos = myMatch.map( (elem) =>{
                                            return {
                                                id:       elem.id      ,
                                                nombre:   elem.nombre  ,
                                                simbolo:  elem.simbolo
                                            }   
                                        });
                                    }
                                    
                                });
                                
                                result(null, res);
                            }

                });

            } else {

                // empty table
                result( null , res );
            }    

        }

    });
};


// display a single Abonado by ID
Abonado.getAbonadoById = function( abonadoId, result ) {

    conn.query('SELECT * FROM abonados WHERE id = ? ORDER BY fecha DESC, id DESC', abonadoId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {

            // if there are elements in the query ( there are results )
            if ( res.length > 0 ) {

                res = JSON.parse(JSON.stringify(res));

                conn.query(`SELECT a.id as abonadoId, abon.id , abon.nombre , abon.simbolo 
                            FROM abonados a 
                            LEFT JOIN abonado_abono ab 
                            INNER JOIN abono abon 
                            ON ab.IdAbono = abon.id 
                            ON a.id = ab.IdAbonado 
                            WHERE a.id = ?   
                            ORDER BY a.fecha DESC, a.id DESC`, abonadoId ,(err, resAbonadoAbono) => {

                            if (err) {
                                console.log('error: ', err);
                                result(err, null);
                            } else {

                                resAbonadoAbono = JSON.parse(JSON.stringify(resAbonadoAbono));
                                
                                res.forEach((abonado, index) => {
                                    const myMatch = resAbonadoAbono.filter(elemAbono => abonado.id === elemAbono.abonadoId);
                                    
                                    if ( myMatch.length === 0  ) {
                                        res[index].abonos = [];
                                    } else {
                                        res[index].abonos = myMatch.map( (elem) =>{
                                            return {
                                                id:       elem.id      ,
                                                nombre:   elem.nombre  ,
                                                simbolo:  elem.simbolo
                                            }   
                                        });
                                    }
                                    
                                });
                                
                                result(null, res[0]);
                            }

                });
                // result(null, res[0]);

            } else {
                // empty table
                result( null , {} );
            }     
            
        }

    });
};


// updating an existing Abonado (PUT)
Abonado.updateById = function( abonadoId, abonado, result ) {

    conn.query('UPDATE abonados SET ? WHERE id = ?', [abonado, abonadoId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// delete a Abonado by ID
Abonado.remove = function( abonadoId, result ) {

    conn.query('DELETE FROM abonados WHERE id = ?', abonadoId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            result(null, res);
        }

    });
};


// module exports
module.exports = Abonado;




