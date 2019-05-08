let Fungicida = require('../model/fungicidaModel');



exports.list_all_fungicidas = (req, res) => {

    Fungicida.getAllFungicidas( (err, fungicida) => {
        if (err) res.send(err);
        
        res.json(fungicida);
    });

};

exports.create_fungicida = (req, res) => {
    
    let new_fungicida = new Fungicida( req.body );

    // handle null error
    if ( !new_fungicida.nombre ) {

        res.status(400).send({ error:true, message: 'Please provide Fungicida nombre' });

    } else {

        // Create new Fungicida
        Fungicida.createFungicida( new_fungicida, (err, fungicidaId) => {
            if (err) res.send(err);
    
            res.json({error:false, id: fungicidaId, msg: "Fungicida insectado correctamente"});
            
        });
    }

};

exports.read_fungicida = (req, res) => {
    
    Fungicida.getFungicidaById( req.params.id_fungicida, (err, fungicida) => {
        if (err) res.send(err);
        
        res.json(fungicida || {});

    });

};

exports.update_fungicida = (req, res) => {

    Fungicida.updateById( req.params.id_fungicida, new Fungicida(req.body), (err, fungicida) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_fungicida, msg: "Fungicida actualizado correctamente"});
        
    });

};

exports.delete_fungicida = (req, res) => {
    
    Fungicida.remove( req.params.id_fungicida , (err, fungicida) => {

        if (err) res.send(err);
        
        res.json({error:false, id: req.params.id_fungicida, msg: "Fungicida eliminado correctamente"});
        
    });

} 