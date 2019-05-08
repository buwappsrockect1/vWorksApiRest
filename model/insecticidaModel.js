
// connection to the database
let conn = require('./db');

// PrincActivoInsecticida 
let PrincActivoInsecticida = require('./princActivInsecticida');



// Insecticida object constructor
let Insecticida = function (insecticida) {
    this.nombre = insecticida.nombre;
    this.plazoSeguridad = insecticida.plazoSeguridad;
    this.contraindicaciones = insecticida.contraindicaciones;
    this.princActivo = insecticida.princActivo;
};

// createInsecticida method
Insecticida.createInsecticida = function (newInsecticida, result) {

    // insecticida data to insert into insecticida table
    let newInsecticidaData = {
        nombre: newInsecticida.nombre,
        plazoSeguridad: newInsecticida.plazoSeguridad,
        contraindicaciones: newInsecticida.contraindicaciones
    };


    conn.query('INSERT INTO insecticida SET ?', newInsecticidaData, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {

            if ( newInsecticida.princActivo.length > 0 ) {
                    
                    // principios activos del insecticida
                    let princActivosInsecticida = JSON.parse(JSON.stringify(newInsecticida.princActivo));
                    
                    let princActivPromises = [];
                    
                    princActivosInsecticida.forEach((princActiv) => {
                        
                        princActivPromises.push( 
                            conn.query('INSERT INTO princ_activ_insecticida SET ?',
                                        new PrincActivoInsecticida(princActiv.nombre, res.insertId),
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


// Get all Insecticidas
Insecticida.getAllInsecticidas = function (result) {

    conn.query('SELECT * FROM insecticida', (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {

            // if there are elements in the query ( there are results )
            if ( res.length > 0 ) {

                res = JSON.parse(JSON.stringify(res));

                conn.query(`SELECT p.id, p.nombre , p.IdInsecticida FROM insecticida i  
                            INNER JOIN princ_activ_insecticida  p 
                            ON i.id= p.IdInsecticida`, (err, resPrincActivo) => {

                        if (err) {
                            console.log('error: ', err);
                            result(err, null);
                        } else {

                            resPrincActivo = JSON.parse(JSON.stringify(resPrincActivo));

                            res.forEach((insecticida, index) => {
                                const myMatch = resPrincActivo.filter(elemPrincActivo => insecticida.id === elemPrincActivo.IdInsecticida);
                                
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


// display a single Insecticida by ID
Insecticida.getInsecticidaById = function (insecticidaId, result) {

    conn.query('SELECT * FROM insecticida WHERE id = ?', insecticidaId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {

            // if there is an element in the query ( there are results )
            if ( res.length > 0 ) {

                res = JSON.parse(JSON.stringify(res));

                conn.query(`SELECT p.id, p.nombre  FROM insecticida i  
                        INNER JOIN princ_activ_insecticida  p 
                        ON i.id= p.IdInsecticida 
                        and p.IdInsecticida = ?`, insecticidaId, (err, resPrincActivo) => {

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


// updating an existing Insecticida (PUT)
Insecticida.updateById = function (insecticidaId, insecticida, result) {

    // insecticida data to update into insecticida table
    let newInsecticidaData = {
        nombre:             insecticida.nombre              ,
        plazoSeguridad:     insecticida.plazoSeguridad      ,
        contraindicaciones: insecticida.contraindicaciones
    };

    conn.query('UPDATE insecticida SET ? WHERE id = ?', [newInsecticidaData, insecticidaId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {


            // delete my princ_activ_insecticida
            conn.query(`DELETE FROM princ_activ_insecticida WHERE IdInsecticida = ?`, insecticidaId, (err, resDelPrincActiv) => {

                if (err) {
                    console.log('error: ', err);
                    result(err, null);
                } else {
                
                    // insert the new ones princActiv
                    let princActivPromises = [];
                    
                    let princActivosInsecticida = JSON.parse(JSON.stringify(insecticida.princActivo));

                    
                    princActivosInsecticida.forEach( (princActiv) => {
                        
                        princActivPromises.push( 
                            conn.query('INSERT INTO princ_activ_insecticida SET ?',
                                        new PrincActivoInsecticida(princActiv.nombre, insecticidaId),
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


// delete a Insecticida by ID
Insecticida.remove = function (insecticidaId, result) {

    conn.query(`DELETE FROM princ_activ_insecticida WHERE IdInsecticida = ?`, insecticidaId, (err, resPrincActiv) => {

            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {

                // nested query to delete insecticida
                conn.query('DELETE FROM insecticida where id = ?', insecticidaId, (errDel, res) => {

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
module.exports = Insecticida;




