let Especie = require('../model/especieModel');



exports.list_all_especies = (req, res) => {

    Especie.getAllEspecies( (err, especie) => {
        if (err) res.send(err);
        
        res.json(especie);
    });

};

exports.create_especie = (req, res) => {
    
    let new_especie = new Especie( req.body );

    // handle null error
    if ( !new_especie.nombre || !new_especie.nombreCientifico || !new_especie.familia || !new_especie.nombreComun ) {

        res.status(400).send({ error:true, message: 'Please provide Especie nombre / nombreCientifico / familia / nombreComun' });

    } else {

        // Create new Especie
        Especie.createEspecie( new_especie, (err, especieId) => {
            if (err) res.send(err);
    
            res.json({error:false, id: especieId, msg: "Especie insectada correctamente"});
            
        });
    }

};


exports.read_especie = (req, res) => {
    
    Especie.getEspecieById( req.params.id_especie, (err, especie) => {
        if (err) res.send(err);
        
        res.json(especie || {});

    });

};

exports.update_especie = (req, res) => {

    Especie.updateById( req.params.id_especie, new Especie(req.body), (err, especie) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_especie, msg: "Especie actualizada correctamente"});
        
    });

};

exports.delete_especie = (req, res) => {
    
    Especie.remove( req.params.id_especie , (err, especie) => {

        if (err) res.send(err);
        
        res.json({error:false, id: req.params.id_especie, msg: "Especie eliminada correctamente"});
        
    });

} 
