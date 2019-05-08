
// connection to the database
let conn = require('./db');

// Variedad
let Variedad = require('./variedadEspecie');



// Especie object constructor
let Especie = function (especie) {
    this.nombre             = especie.nombre              ;
    this.nombreCientifico   = especie.nombreCientifico    ;
    this.familia            = especie.familia             ;
    this.variedad           = especie.variedad            ;
    this.nombreComun        = especie.nombreComun         ;
    this.origen             = especie.origen              ;
    this.caracteristicas    = especie.caracteristicas     ;
    this.imagen             = especie.imagen              ;
    
};

// createEspecie method
Especie.createEspecie = function (newEspecie, result) {

    // Especie data to insert into especie table ( variedades goes into variedades table - NOT variedad field )
    let newEspecieData = {        
        nombre:                 newEspecie.nombre,
        nombreCientifico:       newEspecie.nombreCientifico,
        familia:                newEspecie.familia,
        nombreComun:            newEspecie.nombreComun,
        origen:                 newEspecie.origen,
        caracteristicas:        newEspecie.caracteristicas,
        imagen:                 newEspecie.imagen
    };


    conn.query('INSERT INTO especie SET ?', newEspecieData, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {

            if ( newEspecie.variedad.length > 0 ) {
                    
                    // variedades de la  Especie
                    let variedadesEspecie = JSON.parse(JSON.stringify(newEspecie.variedad));
                    
                    let variedadesPromises = [];
                    
                    variedadesEspecie.forEach((variedad) => {
                        
                        variedadesPromises.push( 
                            conn.query('INSERT INTO variedades SET ?',
                                        new Variedad(variedad.nombre, res.insertId),
                                        (err, resInsertVariedad) => {

                                            if (err) {
                                                console.log('error: ', err);
                                                result(err, null);
                                            } else {
                                                //console.log('insertado: ' + variedad.nombre);
                                            }

                                        })
                        );
                        
                    });

                    Promise.all(
                        variedadesPromises
                    ).then( (values) => {
                        //console.log(res.insertId);
                        result(null, res.insertId);
                    })
                    .catch(function(err) {
                        console.log(err);
                        result(err, null);
                    }); 

            } else {

                res.variedad = [];
                result(null, res.insertId);
            }
   
            
            
        }

    });
};


// Get all Especies
Especie.getAllEspecies = function (result) {

    conn.query('SELECT * FROM especie', (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {

            // if there are elements in the query ( there are results )
            if ( res.length > 0 ) {

                res = JSON.parse(JSON.stringify(res));

                conn.query(`SELECT v.id, v.nombre , v.IdEspecie  
                            FROM especie e  
                            INNER JOIN variedades  v  
                            ON e.id= v.IdEspecie`, (err, resVariedades) => {

                        if (err) {
                            console.log('error: ', err);
                            result(err, null);
                        } else {

                            resVariedades = JSON.parse(JSON.stringify(resVariedades));

                            res.forEach((especie, index) => {
                                const myMatch = resVariedades.filter(elemVariedad => especie.id === elemVariedad.IdEspecie);
                                
                                if ( myMatch.length === 0  ) {
                                    res[index].variedad = [];
                                } else {
                                    res[index].variedad = myMatch.map( (elem) =>{
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


// display a single Especie by ID
Especie.getEspecieById = function (especieId, result) {

    conn.query('SELECT * FROM especie WHERE id = ?', especieId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {

            // if there is an element in the query ( there are results )
            if ( res.length > 0 ) {

                res = JSON.parse(JSON.stringify(res));

                conn.query(`SELECT v.id, v.nombre   
                            FROM especie e  
                            INNER JOIN variedades  v  
                            ON e.id= v.IdEspecie  
                            and v.IdEspecie = ?`, especieId, (err, resVariedad) => {

                    if (err) {
                        console.log('error: ', err);
                        result(err, null);
                    } else {

                        res[0].variedad = resVariedad ;
                        result(null, res[0]);
                    }

                });

            } else {
                result(null, res);
            }
            
        }

    });
};


// updating an existing Especie (PUT)
Especie.updateById = function (especieId, especie, result) {

    // Especie data to insert into especie table ( variedades goes into variedades table - NOT variedad field )
    let newEspecieData = {        
        nombre:                 especie.nombre              ,
        nombreCientifico:       especie.nombreCientifico    ,
        familia:                especie.familia             ,
        nombreComun:            especie.nombreComun         ,
        origen:                 especie.origen              ,
        caracteristicas:        especie.caracteristicas     ,
        imagen:                 especie.imagen
    };

    conn.query('UPDATE especie SET ? WHERE id = ?', [newEspecieData, especieId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err, null);
        } else {


            result(null, res);

/*
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
*/
        }

    });
};


// delete a Especie by ID
Especie.remove = function (especieId, result) {

    conn.query(`DELETE FROM variedades WHERE IdEspecie = ?`, especieId, (err, resVariedades) => {

            if (err) {
                console.log('error: ', err);
                result(err, null);
            } else {

                // nested query to delete Especie
                conn.query('DELETE FROM especie where id = ?', especieId, (errDel, res) => {

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
module.exports = Especie;




