
// connection to the database
let conn = require('./db');

// PrincActivoFungicida
let PrincActivoFungicida = require('./princActivFungicida');



// Fungicida object constructor
let Fungicida = function (fungicida) {
    this.nombre             = fungicida.nombre              ;
    this.plazoSeguridad     = fungicida.plazoSeguridad      ;
    this.contraindicaciones = fungicida.contraindicaciones  ;
    this.princActivo        = fungicida.princActivo         ;
};

// createFungicida method
Fungicida.createFungicida = function (newFungicida, result) {

    // Fungicida data to insert into fungicida table
    let newFungicidaData = {        
        nombre:                 newFungicida.nombre,
        plazoSeguridad:         newFungicida.plazoSeguridad,
        contraindicaciones:     newFungicida.contraindicaciones
    };


    conn.query('INSERT INTO fungicida SET ?', newFungicidaData, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {

            if ( newFungicida.princActivo.length > 0 ) {
                    
                    // principios activos del Fungicida
                    let princActivosFungicida = JSON.parse(JSON.stringify(newFungicida.princActivo));
                    
                    let princActivPromises = [];
                    
                    princActivosFungicida.forEach((princActiv) => {
                        
                        princActivPromises.push( 
                            conn.query('INSERT INTO princ_activ_fungicida SET ?',
                                        new PrincActivoFungicida(princActiv.nombre, res.insertId),
                                        (err, resPrinActiv) => {

                                            if (err) {
                                                console.log('error: ', err);
                                                result(err, null);
                                            } else {
                                                //console.log('insertado: ' + princActiv.nombre);
                                            }

                                        })
                        );
                        
                    });

                    Promise.all(
                        princActivPromises
                    ).then( (values) => {
                        //console.log(res.insertId);
                        result(null, res.insertId);
                    })
                    .catch(function(err) {
                        console.log(err);
                        result(err, null);
                    }); 

            } else {

                res.princActivo = [];
                result(null, res.insertId);
            }
   
            
            
        }

    });
};


// Get all Fungicidas
Fungicida.getAllFungicidas = function (result) {

    conn.query('SELECT * FROM fungicida', (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {

            // if there are elements in the query ( there are results )
            if ( res.length > 0 ) {

                res = JSON.parse(JSON.stringify(res));

                conn.query(`SELECT p.id, p.nombre , p.IdFungicida FROM fungicida f  
                            INNER JOIN princ_activ_fungicida  p 
                            ON f.id= p.IdFungicida`, (err, resPrincActivo) => {

                        if (err) {
                            console.log('error: ', err);
                            result(err, null);
                        } else {

                            resPrincActivo = JSON.parse(JSON.stringify(resPrincActivo));

                            res.forEach((fungicida, index) => {
                                const myMatch = resPrincActivo.filter(elemPrincActivo => fungicida.id === elemPrincActivo.IdFungicida);
                                
                                if ( myMatch.length === 0  ) {
                                    res[index].princActivo = [];
                                } else {
                                    res[index].princActivo = myMatch.map( (elem) =>{
                                        return {
                                            id:       elem.id     ,
                                            nombre:   elem.nombre
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


// display a single Fungicida by ID
Fungicida.getFungicidaById = function (fungicidaId, result) {

    conn.query('SELECT * FROM fungicida WHERE id = ?', fungicidaId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {

            // if there is an element in the query ( there are results )
            if ( res.length > 0 ) {

                res = JSON.parse(JSON.stringify(res));

                conn.query(`SELECT p.id, p.nombre  FROM fungicida f  
                        INNER JOIN princ_activ_fungicida  p 
                        ON f.id= p.IdFungicida 
                        and p.IdFungicida = ?`, fungicidaId, (err, resPrincActivo) => {

                    if (err) {
                        console.log('error: ', err);
                        result(err, null);
                    } else {

                        res[0].princActivo = resPrincActivo ;
                        result(null, res[0]);
                    }

                });

            } else {
                result(null, {});
            }
            
        }

    });
};


// updating an existing Fungicida (PUT)
Fungicida.updateById = function (fungicidaId, fungicida, result) {

    // Fungicida data to update into fungicida table
    let newFungicidaData = {
        nombre:             fungicida.nombre              ,
        plazoSeguridad:     fungicida.plazoSeguridad      ,
        contraindicaciones: fungicida.contraindicaciones
    };

    conn.query('UPDATE fungicida SET ? WHERE id = ?', [newFungicidaData, fungicidaId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {


            // delete my princ_activ_fungicida
            conn.query(`DELETE FROM princ_activ_fungicida WHERE IdFungicida = ?`, fungicidaId, (err, resDelPrincActiv) => {

                if (err) {
                    console.log('error: ', err);
                    result(err, null);
                } else {
                
                    // insert the new ones princActiv
                    let princActivPromises = [];
                    
                    let princActivosFungicida = JSON.parse(JSON.stringify(fungicida.princActivo));

                    
                    princActivosFungicida.forEach( (princActiv) => {
                        
                        princActivPromises.push( 
                            conn.query('INSERT INTO princ_activ_fungicida SET ?',
                                        new PrincActivoFungicida(princActiv.nombre, fungicidaId),
                                        (err, resInsertPrinActiv) => {
        
                                            if (err) {
                                                console.log('error: ', err);
                                                result(err, null);
                                            } 
        
                                        })
                        );
                       
                    });
                    
                    
                    Promise.all(
                        princActivPromises
                    ).then( (values) => {
                        result(null, res);
                    })
                    .catch(function(err) {
                        console.log(err);
                        result(err, null);
                    });  
                    
                }

            }); 

        }

    });
};


// delete a Fungicida by ID
Fungicida.remove = function (fungicidaId, result) {

    conn.query(`DELETE FROM princ_activ_fungicida WHERE IdFungicida = ?`, fungicidaId, (err, resPrincActiv) => {

            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {

                // nested query to delete fungicida
                conn.query('DELETE FROM fungicida where id = ?', fungicidaId, (errDel, res) => {

                    if (errDel) {
                        console.log('error: ', errDel);
                        result(errDel, null);
                    } else {
            
                        result(null, res);
                    }
            
                });
            }

        });
 

};


// module exports
module.exports = Fungicida;




