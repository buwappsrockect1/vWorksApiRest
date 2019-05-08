let RiegoInfo = require('../model/riegoInfoModel');

exports.list_all_riegos = (req, res) => {

    RiegoInfo.getAllRiegosInfo( req.params.id_sector, (err, riegoInfo) => {
        if (err) res.send(err);
        
        res.json(riegoInfo);
    });

};



exports.read_riego = (req, res) => {
    
    let fecha           = req.query.f  ;
    let hora            = req.query.h  ;   
    let operarioId      = req.query.o  ;
    let sectorId        = req.query.s  ;

    RiegoInfo.getRiegoInfoByPrimaryKey( fecha, hora, operarioId, sectorId, (err, riegoInfo) => {
        if (err) res.send(err);
        
        res.json(riegoInfo || {});

    });


};



