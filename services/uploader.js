const multer = require('multer');
const IMAGEN_LOTE_UPLOAD_DIR = './assets/uploads/lotes-images';


// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, IMAGEN_LOTE_UPLOAD_DIR );
    },
    filename: function (req, file, cb) {
        
        const idLote = req.body.IdLote ;
        const destinationFileName = 'lote' + '-' + idLote + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        
        cb(null, destinationFileName );
    }
});

var upload = multer({ storage: storage });

module.exports = upload;