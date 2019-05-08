let Insecticida = require('../model/insecticidaModel');



exports.list_all_insecticidas = (req, res) => {

    Insecticida.getAllInsecticidas( (err, insecticida) => {
        if (err) res.send(err);
        
        res.json(insecticida);
    });

};

exports.create_insecticida = (req, res) => {
    
    let new_insecticida = new Insecticida( req.body );

    // handle null error
    if ( !new_insecticida.nombre ) {

        res.status(400).send({ error:true, message: 'Please provide Insecticida nombre' });

    } else {

        // Create new Insecticida
        Insecticida.createInsecticida( new_insecticida, (err, insecticidaId) => {
            if (err) res.send(err);
    
            res.json({error:false, id: insecticidaId, msg: "Insecticida insectado correctamente"});
            
        });
    }

};

exports.read_insecticida = (req, res) => {
    
    Insecticida.getInsecticidaById( req.params.id_insecticida, (err, insecticida) => {
        if (err) res.send(err);
        
        res.json(insecticida || {});

    });

};

exports.update_insecticida = (req, res) => {

    Insecticida.updateById( req.params.id_insecticida, new Insecticida(req.body), (err, insecticida) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_insecticida, msg: "Insecticida actualizado correctamente"});
        
    });

};

exports.delete_insecticida = (req, res) => {
    
    Insecticida.remove( req.params.id_insecticida , (err, insecticida) => {

        if (err) res.send(err);
        
        res.json({error:false, id: req.params.id_insecticida, msg: "Insecticida eliminado correctamente"});
        
    });

} 