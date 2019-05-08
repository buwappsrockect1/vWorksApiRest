let NotasPrivLote = require('../model/notasPrivLoteModel');

exports.list_all_notas_priv = (req, res) => {
    
    NotasPrivLote.getAllNotasPrivLote( req.params.id_lote, (err, notasPrivLote) => {
        if (err) res.send(err);
        
        res.json(notasPrivLote);
    });

};

exports.create_nota_priv = (req, res) => {
    
    let new_nota = new NotasPrivLote( req.body );

    // handle null error
    if ( !new_nota.fecha  || !new_nota.nota ) {

        res.status(400).send({ error:true, message: 'Please provide NotasPrivLote fecha/nota' });

    } else {

        // Create new NotasPrivLote
        NotasPrivLote.createNotasPrivLote( new_nota, (err, notaId) => {
            if (err) res.send(err);
    
            res.json({error:false, id: notaId, msg: "Nota insectada correctamente"});
        });
    }

};

exports.read_nota_priv = (req, res) => {
    
    NotasPrivLote.getNotasPrivLoteById( req.params.id_nota, (err, nota) => {
        if (err) res.send(err);
        
        res.json(nota || {});

    });

};

exports.update_nota_priv = (req, res) => {

    NotasPrivLote.updateById( req.params.id_nota, new NotasPrivLote(req.body), (err, nota) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_nota, msg: "Nota actualizado correctamente"});
        
    });

};

exports.delete_nota_priv = (req, res) => {
    
    NotasPrivLote.remove( req.params.id_nota , (err, nota) => {

        if (err) res.send(err);
        
        res.json({error:false, id: req.params.id_nota, msg: "Nota eliminada correctamente"});

    });

}


