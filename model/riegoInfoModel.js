
// connection to the database
let conn = require('./db');

// RiegoInfo object constructor
let RiegoInfo = function( riego ) {

    this.fecha             = riego.fecha                   ;
    this.hora              = riego.hora                    ;
    this.IdOperario        = riego.IdOperario              ;
    this.IdSector          = riego.IdSector                ;
    this.comentario        = riego.comentario              ;
};




// Get all RiegoInfos of a Sector
RiegoInfo.getAllRiegosInfo = function( sectorId, result ) {

    conn.query( `SELECT r.fecha , r.hora ,
                    o.id as operarioId , o.codigo as operarioCodigo, o.nombreOperaciones as operarioNombreOperaciones  ,   
                    s.id as sectorId , s.nombre as sectorNombre , s.numero as sectorNumero , s.numLotes as sectorNumLotes, s.numEspecies as sectorNumEspecies ,
                    r.comentario 
                    FROM riego r 
                    INNER JOIN operario o 
                    ON r.IdOperario = o.id 
                    INNER JOIN sector s 
                    ON r.IdSector = s.id 
                    WHERE r.IdSector = ? 
                    ORDER BY r.fecha DESC , r.hora DESC 
                    LIMIT 21`, sectorId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            res = res.map( (riegoI, index) => {
                
                return {
                    fecha:                 riegoI.fecha                   ,
                    hora:                  riegoI.hora                    ,
                    sector:             {
                                            id:                 riegoI.sectorId          ,
                                            nombre:             riegoI.sectorNombre      ,
                                            numero:             riegoI.sectorNumero      ,
                                            numLotes:           riegoI.numLotes          ,
                                            numEspecies:        riegoI.numEspecies
                    },
                    operario:           {
                                            id:                 riegoI.operarioId        ,
                                            codigo:             riegoI.operarioCodigo    ,
                                            nombreOperaciones:  riegoI.operarioNombreOperaciones
                    },
                    comentario:              riegoI.comentario

                };

            });

            result(null, res);
        }

    });
};


// display a single RiegoInfo by fecha, hora , operarioId, sectorId ( key fields )
RiegoInfo.getRiegoInfoByPrimaryKey = function( fecha, hora, operarioId, sectorId , result ) {

    conn.query(`SELECT r.fecha , r.hora ,
                o.id as operarioId , o.codigo as operarioCodigo, o.nombreOperaciones as operarioNombreOperaciones  ,   
                s.id as sectorId , s.nombre as sectorNombre , s.numero as sectorNumero , s.numLotes as sectorNumLotes, s.numEspecies as sectorNumEspecies ,
                r.comentario 
                FROM riego r 
                INNER JOIN operario o 
                ON r.IdOperario = o.id 
                INNER JOIN sector s 
                ON r.IdSector = s.id  
                WHERE r.fecha = ? AND r.hora = ? AND r.IdOperario = ? AND r.IdSector = ? 
                ORDER BY r.fecha DESC , r.hora DESC 
                LIMIT 21`, 
                [fecha , hora, operarioId, sectorId], (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            res = res.map( (riegoI, index) => {
                
                return {
                    fecha:                 riegoI.fecha                   ,
                    hora:                  riegoI.hora                    ,
                    sector:             {
                                            id:                 riegoI.sectorId          ,
                                            nombre:             riegoI.sectorNombre      ,
                                            numero:             riegoI.sectorNumero      ,
                                            numLotes:           riegoI.numLotes          ,
                                            numEspecies:        riegoI.numEspecies
                    },
                    operario:           {
                                            id:                 riegoI.operarioId        ,
                                            codigo:             riegoI.operarioCodigo    ,
                                            nombreOperaciones:  riegoI.operarioNombreOperaciones
                    },
                    comentario:             riegoI.comentario 

                };

            });
            
            result(null, res[0]);
        }

    });
};





// module exports
module.exports = RiegoInfo;




