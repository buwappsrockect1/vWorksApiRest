
let Abonado = require('../model/abonadosModel');

exports.list_all_abonados = (req, res) => {
    
    Abonado.getAllAbonados( req.params.id_sector, (err, abonado) => {
        if (err) res.send(err);
        
        res.json(abonado);
    });

};

exports.create_abonado = (req, res) => {
    
    let new_abonado = new Abonado( req.body );

    // handle null error
    if ( !new_abonado.fecha  || !new_abonado.IdSector || !new_abonado.IdOperario ) {

        res.status(400).send({ error:true, message: 'Please provide Abonado fecha/IdSector/IdOperario' });

    } else {

        // Create new Abonado
        Abonado.createAbonado( new_abonado, (err, abonadoId) => {
            if (err) res.send(err);
    
            res.json({error:false, id: abonadoId, msg: "Abonado insectado correctamente"});
        });
    }

};

exports.read_abonado = (req, res) => {
    
    Abonado.getAbonadoById( req.params.id_abonado, (err, abonado) => {
        if (err) res.send(err);
        
        res.json(abonado || {});

    });

};

exports.update_abonado = (req, res) => {

    Abonado.updateById( req.params.id_abonado, new Abonado(req.body), (err, abonado) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_abonado, msg: "Abonado actualizado correctamente"});
        
    });

};

exports.delete_abonado = (req, res) => {
    
    Abonado.remove( req.params.id_abonado , (err, abonado) => {

        if (err) res.send(err);
        
        res.json({error:false, id: req.params.id_abonado, msg: "Abonado eliminada correctamente"});

    });

}


