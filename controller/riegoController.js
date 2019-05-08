let Riego = require('../model/riegoModel');

exports.list_all_riegos = (req, res) => {

    Riego.getAllRiegos( req.params.id_sector, (err, riegos) => {
        if (err) res.send(err);
        
        res.json(riegos);
    });

};

exports.create_riego = (req, res) => {
    
    let new_riego = new Riego( req.body );

    // handle null error
    if ( !new_riego.fecha                   || 
         !new_riego.hora                    || 
         !new_riego.IdOperario              ||
         !new_riego.IdSector               
         ) {

        res.status(400).send({ error:true, message: 'Please provide Riego fecha/ hora/IdOperario / IdSector' });

    } else {

        // Create new Riego
        Riego.createRiego( new_riego, (err, riegoAffectedRows) => {
            if (err) res.send(err);
    
            res.json({error:false, id: riegoAffectedRows, msg: "Riego insectado correctamente"});
        });
    }

};

exports.read_riego = (req, res) => {
    
    let fecha           = req.query.f  ;
    let hora            = req.query.h  ;   
    let operarioId      = req.query.o  ;
    let sectorId        = req.query.s  ;

    Riego.getRiegoByPrimaryKey( fecha, hora, operarioId, sectorId, (err, riego) => {
        if (err) res.send(err);
        
        res.json(riego || {});

    });


};


exports.delete_riego = (req, res) => {

    let fecha           = req.query.f  ;
    let hora            = req.query.h  ;   
    let operarioId      = req.query.o  ;
    let sectorId        = req.query.s  ;


    Riego.remove( fecha, hora, operarioId, sectorId , (err, riegoAffectedRow) => {

        if (err) res.send(err);
        
        res.json({error:false, id: riegoAffectedRow, msg: "Riego eliminado correctamente"});

    });

};



