let Sector = require('../model/sectorModel');

exports.list_all_sectores = (req, res) => {

    Sector.getAllSectores( (err, sector) => {
        if (err) res.send(err);
        
        res.json(sector);
    });

};

exports.create_sector = (req, res) => {
    
    let new_sector = new Sector( req.body );

    // handle null error
    if ( !new_sector.nombre  || !new_sector.numero ) {

        res.status(400).send({ error:true, message: 'Please provide Sector nombre/Sector numero' });

    } else {

        // Create new sector
        Sector.createSector( new_sector, (err, sectorId) => {
            if (err) res.send(err);
    
            res.json({error:false, id: sectorId, msg: "Sector insectado correctamente"});
        });
    }

};

exports.read_sector = (req, res) => {
    
    Sector.getSectorById( req.params.id_sector, (err, sector) => {
        if (err) res.send(err);
        
        res.json(sector || {});

    });

};

exports.update_sector = (req, res) => {

    Sector.updateById( req.params.id_sector, new Sector(req.body), (err, sector) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_sector, msg: "Sector actualizado correctamente"});
        
    });

};

exports.delete_sector = (req, res) => {
    
    Sector.remove( req.params.id_sector , (err, sector) => {
        
        if (err) {
            return res.json({ error: true , msg: err.message , code: err.code , errorObj: err });
        }

        res.json({error:false, id: req.params.id_sector, msg: "Sector eliminado correctamente"});

    });

}

// the numLotes of a sector
exports.read_num_lotes_sector = (req, res) => {
    
    Sector.getNumLotes( req.params.id_sector, (err, sectorNumLotes) => {
        if (err) res.send(err);
        
        res.status(200).send({ error:false, numLotes: ( sectorNumLotes ) ? sectorNumLotes.numLotes : 0 });
        

    });

};


// get the numEspecies of a sector
exports.read_num_especies_sector = (req, res) => {
    
    Sector.getNumEspecies( req.params.id_sector, (err, sectorNumEspecies) => {
        if (err) res.send(err);
         
        res.status(200).send({ error:false, numEspecies: ( sectorNumEspecies ) ? sectorNumEspecies.numEspecies : 0 });
        

    });

};

