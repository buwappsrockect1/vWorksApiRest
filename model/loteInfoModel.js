
// connection to the database
let conn = require('./db');

// LoteInfo object constructor
let LoteInfo = function( lote ) {
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




// Get all LoteInfo
LoteInfo.getAllLotesInfo = function( result ) {
    
    conn.query( `SELECT l.id, l.nombre , 
                    e.id as especieId, e.nombre as especieNombre , e.nombreCientifico as especieNombreCientifico , e.nombreComun as especieNombreComun,
                    v.id as variedadId , v.nombre as variedadNombre ,
                    s.id as sectorId, s.nombre as sectorNombre , s.numero as sectorNumero, s.numLotes as sectorNumLotes, s.numEspecies as sectorNumEspecies ,
                    l.cantidad , l.stockMinimo , l.fechaEntrada ,
                    o.id as operarioId , o.codigo as operarioCodigo, o.nombreOperaciones as operarioNombreOperaciones ,
                    p.id as proveedorId , p.nombre as proveedorNombre , p.nombre2Digitos as proveedorNombre2Digitos ,  
                    l.codProveedor , l.qrTrazabilidad , l.notas , l.deleted  
                    
                    FROM lote l
                    INNER JOIN especie e 
                    ON l.IdEspecie = e.id 
                    INNER JOIN variedades v 
                    ON l.IdVariedad = v.id  
                    INNER JOIN sector s 
                    ON l.IdSector = s.id 
                    INNER JOIN operario o 
                    ON l.IdOperarioEncargado = o.id 
                    INNER JOIN proveedor p 
                    ON l.IdProveedorOrigen = p.id 
                    WHERE l.deleted = 0`, 
                (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            res = res.map( (loteI, index) => {
                
                return {
                    id:                 loteI.id                        ,
                    nombre:             loteI.nombre                    ,
                    especie:            {
                                            id:                 loteI.especieId                 ,
                                            nombre:             loteI.especieNombre             ,
                                            nombreCientifico:   loteI.especieNombreCientifico   ,
                                            nombreComun:        loteI.nombreComun
                    },
                    variedad:           {
                                            id:                 loteI.variedadId        ,
                                            nombre:             loteI.variedadNombre
                    },
                    cantidad:           loteI.cantidad                  ,
                    stockMinimo:        loteI.stockMinimo               ,
                    sector:             {
                                            id:                 loteI.sectorId          ,
                                            nombre:             loteI.sectorNombre      ,
                                            numero:             loteI.sectorNumero      ,
                                            numLotes:           loteI.numLotes          ,
                                            numEspecies:        loteI.numEspecies
                    },
                    fechaEntrada:       loteI.fechaEntrada              ,
                    operarioEncargado: {
                                            id:                 loteI.operarioId        ,
                                            codigo:             loteI.operarioCodigo    ,
                                            nombreOperaciones:  loteI.operarioNombreOperaciones
                    },
                    proveedorOrigen:   {
                                            id:                 loteI.proveedorId       ,
                                            nombre:             loteI.proveedorNombre   ,
                                            nombre2Digitos:     loteI.proveedorNombre2Digitos
                    },
                    codProveedor:       loteI.codProveedor              ,
                    qrTrazabilidad:     loteI.qrTrazabilidad            ,
                    notas:              loteI.notas                     ,
                    deleted:            loteI.deleted

                };

            });
            result(null, res);
        }

    });
};

// Get all LoteInfo in a Sector
LoteInfo.getAllLotesInfoInSector = function( sectorId, result ) {

    conn.query( `SELECT l.id, l.nombre , 
                    e.id as especieId, e.nombre as especieNombre , e.nombreCientifico as especieNombreCientifico , e.nombreComun as especieNombreComun,
                    v.id as variedadId , v.nombre as variedadNombre ,
                    s.id as sectorId, s.nombre as sectorNombre , s.numero as sectorNumero, s.numLotes as sectorNumLotes, s.numEspecies as sectorNumEspecies ,
                    l.cantidad , l.stockMinimo , l.fechaEntrada ,
                    o.id as operarioId , o.codigo as operarioCodigo, o.nombreOperaciones as operarioNombreOperaciones ,
                    p.id as proveedorId , p.nombre as proveedorNombre , p.nombre2Digitos as proveedorNombre2Digitos ,  
                    l.codProveedor , l.qrTrazabilidad , l.notas , l.deleted  
                    
                    FROM lote l
                    INNER JOIN especie e 
                    ON l.IdEspecie = e.id 
                    INNER JOIN variedades v 
                    ON l.IdVariedad = v.id  
                    INNER JOIN sector s 
                    ON l.IdSector = s.id 
                    INNER JOIN operario o 
                    ON l.IdOperarioEncargado = o.id 
                    INNER JOIN proveedor p 
                    ON l.IdProveedorOrigen = p.id 
                    WHERE l.IdSector = ? AND l.deleted = 0 
                    ORDER BY l.id`, 
                sectorId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            res = res.map( (loteI, index) => {
                
                return {
                    id:                 loteI.id                        ,
                    nombre:             loteI.nombre                    ,
                    especie:            {
                                            id:                 loteI.especieId                 ,
                                            nombre:             loteI.especieNombre             ,
                                            nombreCientifico:   loteI.especieNombreCientifico   ,
                                            nombreComun:        loteI.nombreComun
                    },
                    variedad:           {
                                            id:                 loteI.variedadId        ,
                                            nombre:             loteI.variedadNombre
                    },
                    cantidad:           loteI.cantidad                  ,
                    stockMinimo:        loteI.stockMinimo               ,
                    sector:             {
                                            id:                 loteI.sectorId          ,
                                            nombre:             loteI.sectorNombre      ,
                                            numero:             loteI.sectorNumero      ,
                                            numLotes:           loteI.numLotes          ,
                                            numEspecies:        loteI.numEspecies
                    },
                    fechaEntrada:       loteI.fechaEntrada              ,
                    operarioEncargado: {
                                            id:                 loteI.operarioId        ,
                                            codigo:             loteI.operarioCodigo    ,
                                            nombreOperaciones:  loteI.operarioNombreOperaciones
                    },
                    proveedorOrigen:   {
                                            id:                 loteI.proveedorId       ,
                                            nombre:             loteI.proveedorNombre   ,
                                            nombre2Digitos:     loteI.proveedorNombre2Digitos
                    },
                    codProveedor:       loteI.codProveedor              ,
                    qrTrazabilidad:     loteI.qrTrazabilidad            ,
                    notas:              loteI.notas                     ,
                    deleted:            loteI.deleted

                };

            });
            result(null, res);
        }

    });
};

// display a single LoteInfo by ID
LoteInfo.getLoteInfoById = function( loteId, result ) {

    conn.query(`SELECT l.id, l.nombre , 
                    e.id as especieId, e.nombre as especieNombre , e.nombreCientifico as especieNombreCientifico , e.nombreComun as especieNombreComun,
                    v.id as variedadId , v.nombre as variedadNombre ,
                    s.id as sectorId, s.nombre as sectorNombre , s.numero as sectorNumero, s.numLotes as sectorNumLotes, s.numEspecies as sectorNumEspecies ,
                    l.cantidad , l.stockMinimo , l.fechaEntrada ,
                    o.id as operarioId , o.codigo as operarioCodigo, o.nombreOperaciones as operarioNombreOperaciones ,
                    p.id as proveedorId , p.nombre as proveedorNombre , p.nombre2Digitos as proveedorNombre2Digitos ,  
                    l.codProveedor , l.qrTrazabilidad , l.notas , l.deleted  
                    
                    FROM lote l
                    INNER JOIN especie e 
                    ON l.IdEspecie = e.id 
                    INNER JOIN variedades v 
                    ON l.IdVariedad = v.id  
                    INNER JOIN sector s 
                    ON l.IdSector = s.id 
                    INNER JOIN operario o 
                    ON l.IdOperarioEncargado = o.id 
                    INNER JOIN proveedor p 
                    ON l.IdProveedorOrigen = p.id 
                    WHERE l.id = ? AND l.deleted = 0`, 
                loteId, (err, res) => {

        if (err) {
            console.log('error: ', err);
            result(err,null);
        } else {
            res = res.map( (loteI, index) => {
                
                return {
                    id:                 loteI.id                        ,
                    nombre:             loteI.nombre                    ,
                    especie:            {
                                            id:                 loteI.especieId                 ,
                                            nombre:             loteI.especieNombre             ,
                                            nombreCientifico:   loteI.especieNombreCientifico   ,
                                            nombreComun:        loteI.nombreComun
                    },
                    variedad:           {
                                            id:                 loteI.variedadId        ,
                                            nombre:             loteI.variedadNombre
                    },
                    cantidad:           loteI.cantidad                  ,
                    stockMinimo:        loteI.stockMinimo               ,
                    sector:             {
                                            id:                 loteI.sectorId          ,
                                            nombre:             loteI.sectorNombre      ,
                                            numero:             loteI.sectorNumero      ,
                                            numLotes:           loteI.numLotes          ,
                                            numEspecies:        loteI.numEspecies
                    },
                    fechaEntrada:       loteI.fechaEntrada              ,
                    operarioEncargado: {
                                            id:                 loteI.operarioId        ,
                                            codigo:             loteI.operarioCodigo    ,
                                            nombreOperaciones:  loteI.operarioNombreOperaciones
                    },
                    proveedorOrigen:   {
                                            id:                 loteI.proveedorId       ,
                                            nombre:             loteI.proveedorNombre   ,
                                            nombre2Digitos:     loteI.proveedorNombre2Digitos
                    },
                    codProveedor:       loteI.codProveedor              ,
                    qrTrazabilidad:     loteI.qrTrazabilidad            ,
                    notas:              loteI.notas                     ,
                    deleted:            loteI.deleted

                };

            });
            result(null, res[0]);
        }

    });
};



// module exports
module.exports = LoteInfo;




