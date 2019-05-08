let Proveedor = require('../model/proveedorModel');



exports.list_all_proveedores = (req, res) => {

    Proveedor.getAllProveedores( (err, proveedor) => {
        if (err) res.send(err);
        
        res.json(proveedor);
    });

};

exports.create_proveedor = (req, res) => {
    
    let new_proveedor = new Proveedor( req.body );

    // handle null error
    if ( !new_proveedor.nombre  || !new_proveedor.nombre2Digitos ) {

        res.status(400).send({ error:true, message: 'Please provide Proveedor nombre/Proveedor nombre2Digitos' });

    } else {

        // Create new Proveedor
        Proveedor.createProveedor( new_proveedor, (err, proveedorId) => {
            if (err) res.send(err);
    
            res.json({error:false, id: proveedorId, msg: "Proveedor insectado correctamente"});
        });
    }

};

exports.read_proveedor = (req, res) => {
    
    Proveedor.getProveedorById( req.params.id_proveedor, (err, proveedor) => {
        if (err) res.send(err);
        
        res.json(proveedor || {});

    });

};

exports.update_proveedor = (req, res) => {

    Proveedor.updateById( req.params.id_proveedor, new Proveedor(req.body), (err, proveedor) => {
        if (err) res.send(err);

        res.json({error:false, id: req.params.id_proveedor, msg: "Proveedor actualizado correctamente"});
        
    });

};

exports.delete_proveedor = (req, res) => {
    
    Proveedor.remove( req.params.id_proveedor , (err, proveedor) => {

        if (err) res.send(err);
        
        res.json({error:false, id: req.params.id_proveedor, msg: "Proveedor eliminado correctamente"});

    });

} 