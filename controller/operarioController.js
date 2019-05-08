let Operario = require('../model/operarioModel');

exports.list_all_operarios = (req, res) => {

    Operario.getAllOperarios( (err, operario) => {
        if (err) res.send(err);
        
        res.json(operario);
    });

};

exports.create_operario = (req, res) => {
    
    let new_operario = new Operario( req.body );

    // handle null error
    if ( !new_operario.codigo                   || 
         !new_operario.nombreOperaciones        || 
         !new_operario.nombre                   ||
         !new_operario.apellidos                ||
         !new_operario.departamento 
         ) {

        res.status(400).send({ error:true, message: 'Please provide Operario nombre/ apellidos/codigo / nombreOperaciones/ departamento' });

    } else {

        // Create new Operario
        Operario.createOperario( new_operario, (err, operarioId) => {
            if (err) res.send(err);
    
            res.json({error:false, id: operarioId, msg: "Operario insectado correctamente"});
        });
    }

};

exports.read_operario = (req, res) => {
    
    Operario.getOperarioById( req.params.id_operario, (err, operario) => {
        if (err) res.send(err);
        
        res.json(operario || {});

    });

};

exports.update_operario = (req, res) => {

    Operario.updateById( req.params.id_operario, new Operario(req.body), (err, operario) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_operario, msg: "Operario actualizado correctamente"});
        
    });

};

exports.delete_operario = (req, res) => {
    
    Operario.remove( req.params.id_operario , (err, operario) => {

        if (err) res.send(err);
        
        res.json({error:false, id: req.params.id_operario, msg: "Operario eliminado correctamente"});

    });

};



