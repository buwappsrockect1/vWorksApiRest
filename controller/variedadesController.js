let Variedades = require('../model/variedadesModel');

exports.list_all_variedades = (req, res) => {

    Variedades.getAllVariedades( req.params.id_especie, (err, variedad) => {
        if (err) res.send(err);
        
        res.json(variedad);
    });

};

exports.create_variedad = (req, res) => {
    
    let new_variedad = new Variedades( req.body );


    // handle null error
    if ( !new_variedad.nombre ) {

        res.status(400).send({ error:true, message: 'Please provide Variedad nombre' });

    } else {

        // Create new Variedades
        Variedades.createVariedad( new_variedad, req.params.id_especie, (err, variedadesId) => {
            if (err) res.send(err);
    
            res.json({error:false, id: variedadesId, msg: "Variedad insectada correctamente"});
        });
    }

};



exports.update_variedad = (req, res) => {

    Variedades.updateById( req.params.id_variedad, new Variedades(req.body), (err, variedad) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_variedad, msg: "Variedad actualizada correctamente"});
        
    });

};


exports.delete_variedad = (req, res) => {
    
    Variedades.remove( req.params.id_variedad , (err, variedad) => {

        if (err) res.send(err);
        
        res.json({error:false, id: req.params.id_variedad, msg: "Variedad eliminada correctamente"});

    });

}


