
let AbonadoInfo = require('../model/abonadosInfoModel');

exports.list_all_abonados_info = (req, res) => {
    
    AbonadoInfo.getAllAbonadosInfo( req.params.id_sector, (err, abonado) => {
        if (err) res.send(err);
        
        res.json(abonado);
    });

};



exports.read_abonado_info = (req, res) => {
    
    AbonadoInfo.getAbonadoInfoById( req.params.id_abonado, (err, abonado) => {
        if (err) res.send(err);
        
        res.json(abonado || {});

    });

};






