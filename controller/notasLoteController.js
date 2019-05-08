let NotasLote = require('../model/notasLoteModel');

exports.list_all_notas = (req, res) => {
    
    NotasLote.getAllNotasLote( req.params.id_lote, (err, notasLote) => {
        if (err) res.send(err);
        
        res.json(notasLote);
    });

};

exports.create_nota = (req, res) => {
    
    let new_nota = new NotasLote( req.body );

    // handle null error
    if ( !new_nota.fecha  || !new_nota.nota ) {

        res.status(400).send({ error:true, message: 'Please provide NotasLote fecha/nota' });

    } else {

        // Create new NotasLote
        NotasLote.createNotasLote( new_nota, (err, notaId) => {
            if (err) res.send(err);
    
            res.json({error:false, id: notaId, msg: "Nota insectada correctamente"});
        });
    }

};

exports.read_nota = (req, res) => {
    
    NotasLote.getNotasLoteById( req.params.id_nota, (err, nota) => {
        if (err) res.send(err);
        
        res.json(nota || {});

    });

};

exports.update_nota = (req, res) => {

    NotasLote.updateById( req.params.id_nota, new NotasLote(req.body), (err, nota) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_nota, msg: "Nota actualizado correctamente"});
        
    });

};

exports.delete_nota = (req, res) => {
    
    NotasLote.remove( req.params.id_nota , (err, nota) => {

        if (err) res.send(err);
        
        res.json({error:false, id: req.params.id_nota, msg: "Nota eliminada correctamente"});

    });

}


