const ImagenLote = require('../model/imagenLoteModel');
const upload = require('../services/uploader');



// Creates the imagen of the lote ( receives the uploaded image )
exports.create_imagen_lote = (req, res ) => {
    
    const singleUpload = upload.single('imagen');

    singleUpload(req, res, function(err) {
        
        const file = req.file;
        if (!file) {
            
            res.status(400).send({ error:true, message: 'Please upload an image file' });

        } else {

            
            // file name to insert into the database
            req.body.imagen  = file.filename;

            let new_imagenLote = new ImagenLote( req.body );

            // handle null error
            if ( !new_imagenLote.fecha  || !new_imagenLote.imagen ) {
        
                res.status(400).send({ error:true, message: 'Please provide ImagenLote fecha/imagen' });
        
            } else {
        
                // Create new ImagenLote
                ImagenLote.createImagenLote( new_imagenLote, (err, imagenLoteId) => {
                    if (err) res.send(err);
            
                    res.json({error:false, id: imagenLoteId, msg: "Imagen del Lote insectada correctamente"});
                });
            }


        }
        
    
    });

};

exports.list_all_imagenes_lote = (req, res) => {

    ImagenLote.getAllImagenesLotes( req.params.id_lote , (err, imagenLote) => {
        if (err) res.send(err);
        
        res.json(imagenLote);
    });

};

exports.read_imagen_lote = (req, res) => {
    
    ImagenLote.getImagenLoteById( req.params.id_imagen, (err, imagenLote) => {
        if (err) res.send(err);
        
        res.json(imagenLote || {});

    });

};

/*
exports.update_abono = (req, res) => {

    Abono.updateById( req.params.id_abono, new Abono(req.body), (err, abono) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_abono, msg: "Abono actualizado correctamente"});
        
    });

};
*/

exports.delete_imagen_lote = (req, res) => {
    
    ImagenLote.remove( req.params.id_imagen , (err, imagenLote) => {

        if (err) res.send(err);
        
        res.json({error:false, id: req.params.id_imagen, msg: "Imagen eliminada correctamente"});

    });

}





