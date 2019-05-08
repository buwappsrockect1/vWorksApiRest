let LoteInfo = require('../model/loteInfoModel');

exports.list_all_lotesInfo = (req, res) => {

    LoteInfo.getAllLotesInfo( (err, loteInfo) => {
        if (err) res.send(err);
        
        res.json(loteInfo);
    });

};


exports.list_all_lotesInfo_sector = (req, res) => {

    LoteInfo.getAllLotesInfoInSector( req.params.id_sector, (err, loteInfo) => {
        if (err) res.send(err);
        
        res.json(loteInfo);
    });

};


exports.read_loteInfo = (req, res) => {
    
    LoteInfo.getLoteInfoById( req.params.id_lote, (err, loteInfo) => {
        if (err) res.send(err);
        
        res.json(loteInfo || {});

    });

};




