let Abono = require('../model/abonoModel');

exports.list_all_abonos = (req, res) => {

    Abono.getAllAbonos( (err, abono) => {
        if (err) res.send(err);
        
        res.json(abono);
    });

};

exports.create_abono = (req, res) => {
    
    let new_abono = new Abono( req.body );

    // handle null error
    if ( !new_abono.nombre  || !new_abono.simbolo ) {

        res.status(400).send({ error:true, message: 'Please provide abono nombre/abono simbolo' });

    } else {

        // Create new abono
        Abono.createAbono( new_abono, (err, abonoId) => {
            if (err) res.send(err);
    
            res.json({error:false, id: abonoId, msg: "Abono insectado correctamente"});
        });
    }

};

exports.read_abono = (req, res) => {
    
    Abono.getAbonoById( req.params.id_abono, (err, abono) => {
        if (err) res.send(err);
        
        res.json(abono || {});

    });

};

exports.update_abono = (req, res) => {

    Abono.updateById( req.params.id_abono, new Abono(req.body), (err, abono) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_abono, msg: "Abono actualizado correctamente"});
        
    });

};

exports.delete_abono = (req, res) => {
    
    Abono.remove( req.params.id_abono , (err, abono) => {

        if (err) res.send(err);
        
        res.json({error:false, id: req.params.id_abono, msg: "Abono eliminado correctamente"});

    });

}


