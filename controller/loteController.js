let Lote = require('../model/loteModel');

exports.list_all_lotes = (req, res) => {

    Lote.getAllLotes( (err, lote) => {
        if (err) res.send(err);
        
        res.json(lote);
    });

};


exports.list_all_lotes_sector = (req, res) => {

    Lote.getAllLotesInSector( req.params.id_sector, (err, lote) => {
        if (err) res.send(err);
        
        res.json(lote);
    });

};


exports.create_lote = (req, res) => {
    
    let new_lote = new Lote( req.body );

    // handle null error
    if ( !new_lote.IdEspecie                || 
         !new_lote.IdVariedad               || 
         !new_lote.cantidad                 || 
         !new_lote.IdSector                 ||
         !new_lote.fechaEntrada             || 
         !new_lote.IdOperarioEncargado      || 
         !new_lote.IdProveedorOrigen        ) {

        res.status(400).send({ error:true, message: `Please provide Lote IdEspecie / IdVariedad / cantidad 
                                                     /IdSector /fechaEntrada /IdOperarioEncargado / IdProveedorOrigen`});

    } else {
        
        // Create new Lote
        Lote.createLote( new_lote, (err, loteId) => {
            if (err) res.send(err);
    
            res.json({error:false, id: loteId, msg: "Lote insectado correctamente"});
        });
    }

};

exports.read_lote = (req, res) => {
    
    Lote.getLoteById( req.params.id_lote, (err, lote) => {
        if (err) res.send(err);
        
        res.json(lote || {});

    });

};

exports.update_lote = (req, res) => {

    Lote.updateById( req.params.id_lote, new Lote(req.body), (err, lote) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_lote, msg: "Lote actualizado correctamente"});
        
    });

};

exports.delete_lote = (req, res) => {
    
    Lote.remove( req.params.id_lote , (err, lote) => {

        if (err) res.send(err);
        
        res.json({error:false, id: req.params.id_lote, msg: "Lote eliminado correctamente"});

    });

}




