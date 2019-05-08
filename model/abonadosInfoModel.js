
// connection to the database
let conn = require('./db');

// AbonadoInfo object constructor
let AbonadoInfo = function( abonado ) {
    this.fecha        = abonado.fecha       ;
    this.IdSector     = abonado.IdSector    ; 
    this.IdOperario   = abonado.IdOperario  ;
    this.abonos       = abonado.abonos      ;   
};




// Get all AbonadoInfo
AbonadoInfo.getAllAbonadosInfo = function( sectorId, result ) {
    
    conn.query( `SELECT a.id , a.fecha ,  
                    s.id as sectorId , s.nombre as sectorNombre , 
                    s.numero as sectorNumero , s.numLotes as sectorNumLotes , 
                    s.numEspecies as sectorNumEspecies ,
                    o.id as operarioId , o.codigo as operarioCodigo , 
                    o.nombreOperaciones as operarioNombreOperaciones  
                    FROM  abonados a 
                    INNER JOIN sector s  
                    ON a.IdSector = s.id 
                    INNER JOIN  operario o 
                    ON a.IdOperario = o.id 
                    WHERE a.IdSector = ?     
                    ORDER BY a.fecha DESC , a.id DESC`
                , sectorId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            
            // if there are elements in the query ( there are results )
            if ( res.length > 0 ) {

                res = JSON.parse(JSON.stringify(res));

                // Aplied abonos on the Abonados table
                conn.query(`SELECT a.id as abonadoId, abon.id , abon.nombre , abon.simbolo , abon.composicion 
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
                                
                                res = res.map( (abonadosInfo, index) => {
                                    
                                    const myMatch = resAbonadoAbono.filter(elemAbono => abonadosInfo.id === elemAbono.abonadoId);

                                    // abonos applied
                                    let abonosApplied ;

                                    if ( myMatch.length === 0  ) {
                                        abonosApplied = [];
                                    } else {
                                        
                                        abonosApplied = myMatch.map( (elem) =>{
                                            return {
                                                id:             elem.id           ,
                                                nombre:         elem.nombre       ,
                                                simbolo:        elem.simbolo      ,
                                                composicion:    elem.composicion
                                            }   
                                        });
                                    };

                                    // object to return to show abonadosInfo
                                    return {
                                        id:                 abonadosInfo.id             ,
                                        fecha:              abonadosInfo.fecha          ,
                                        sector:             {
                                                                id:             abonadosInfo.sectorId           ,
                                                                nombre:         abonadosInfo.sectorNombre       ,
                                                                numero:         abonadosInfo.sectorNumero       ,
                                                                numLotes:       abonadosInfo.sectorNumLotes     ,
                                                                numEspecies:    abonadosInfo.sectorNumEspecies
                                                            },
                                        operario:           {
                                                                id:                 abonadosInfo.operarioId                 ,
                                                                codigo:             abonadosInfo.operarioCodigo             ,
                                                                nombreOperaciones:  abonadosInfo.operarioNombreOperaciones   
                                                            },
                                        abonos:             abonosApplied 
                                    };

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


// display a single AbonadoInfo by ID
AbonadoInfo.getAbonadoInfoById = function( abonadoId, result ) {
    // 'SELECT * FROM abonados WHERE id = ? ORDER BY fecha DESC, id DESC'
    conn.query(`SELECT a.id , a.fecha ,  
                    s.id as sectorId , s.nombre as sectorNombre , 
                    s.numero as sectorNumero , s.numLotes as sectorNumLotes , 
                    s.numEspecies as sectorNumEspecies ,
                    o.id as operarioId , o.codigo as operarioCodigo , 
                    o.nombreOperaciones as operarioNombreOperaciones  
                    FROM  abonados a 
                    INNER JOIN sector s  
                    ON a.IdSector = s.id 
                    INNER JOIN  operario o 
                    ON a.IdOperario = o.id 
                    WHERE a.id = ?     
                    ORDER BY a.fecha DESC , a.id DESC`, 
                abonadoId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {

            // if there are elements in the query ( there are results )
            if ( res.length > 0 ) {

                res = JSON.parse(JSON.stringify(res));

                conn.query(`SELECT a.id as abonadoId, abon.id , abon.nombre , abon.simbolo , abon.composicion 
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
                                                                
                                res = res.map( (abonadosInfo, index) => {
                                    
                                    const myMatch = resAbonadoAbono.filter(elemAbono => abonadosInfo.id === elemAbono.abonadoId);

                                    // abonos applied
                                    let abonosApplied ;

                                    if ( myMatch.length === 0  ) {
                                        abonosApplied = [];
                                    } else {
                                        
                                        abonosApplied = myMatch.map( (elem) =>{
                                            return {
                                                id:             elem.id             ,
                                                nombre:         elem.nombre         ,
                                                simbolo:        elem.simbolo        ,
                                                composicion:    elem.composicion
                                            }   
                                        });
                                    };

                                    // object to return to show abonadosInfo
                                    return {
                                        id:                 abonadosInfo.id             ,
                                        fecha:              abonadosInfo.fecha          ,
                                        sector:             {
                                                                id:             abonadosInfo.sectorId           ,
                                                                nombre:         abonadosInfo.sectorNombre       ,
                                                                numero:         abonadosInfo.sectorNumero       ,
                                                                numLotes:       abonadosInfo.sectorNumLotes     ,
                                                                numEspecies:    abonadosInfo.sectorNumEspecies
                                                            },
                                        operario:           {
                                                                id:                 abonadosInfo.operarioId                 ,
                                                                codigo:             abonadosInfo.operarioCodigo             ,
                                                                nombreOperaciones:  abonadosInfo.operarioNombreOperaciones   
                                                            },
                                        abonos:             abonosApplied 
                                    };

                                });


                                result(null, res[0]);

                            }

                });
                

            } else {
                // empty table
                result( null , {} );
            }     
            
        }

    });
};





// module exports
module.exports = AbonadoInfo;




