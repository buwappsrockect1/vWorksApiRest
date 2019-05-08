
module.exports = (app) => {
    
    // controllers
    let abonoCtrl               = require('../controller/abonoController');
    let proveedorCtrl           = require('../controller/proveedorController');
    let insecticidaCtrl         = require('../controller/insecticidaController');
    let fungicidaCtrl           = require('../controller/fungicidaController');
    let sectorCtrl              = require('../controller/sectorController');
    let especieCtrl             = require('../controller/especieController');
    let variedadesCtrl          = require('../controller/variedadesController');
    let loteCtrl                = require('../controller/loteController');
    let loteInfoCtrl            = require('../controller/loteInfoController');
    let operarioCtrl            = require('../controller/operarioController');
    let riegoCtrl               = require('../controller/riegoController');
    let riegoInfoCtrl           = require('../controller/riegoInfoController');
    let notasLoteCtrl           = require('../controller/notasLoteController');
    let notasPrivLoteCtrl       = require('../controller/notasPrivLoteController');
    let abonadosCtrl            = require('../controller/abonadosController');
    let abonadosInfoCtrl        = require('../controller/abonadosInfoController');
    let imagenLoteCtrl          = require('../controller/imagenLoteController');
 

    // abono Routes
    app.route('/abonos')
        .get(abonoCtrl.list_all_abonos)
        .post(abonoCtrl.create_abono);

    app.route('/abonos/:id_abono')
        .get( abonoCtrl.read_abono )
        .put( abonoCtrl.update_abono )
        .delete( abonoCtrl.delete_abono );


    // proveedor Routes
    app.route('/proveedores')
        .get(proveedorCtrl.list_all_proveedores)
        .post(proveedorCtrl.create_proveedor);

    app.route('/proveedores/:id_proveedor')
        .get( proveedorCtrl.read_proveedor )
        .put( proveedorCtrl.update_proveedor )
        .delete( proveedorCtrl.delete_proveedor );        


    // insecticida Routes
    app.route('/insecticidas')
        .get(insecticidaCtrl.list_all_insecticidas)
        .post(insecticidaCtrl.create_insecticida);

    app.route('/insecticidas/:id_insecticida')
        .get( insecticidaCtrl.read_insecticida )
        .put( insecticidaCtrl.update_insecticida )
        .delete( insecticidaCtrl.delete_insecticida );



    // fungicida Routes
    app.route('/fungicidas')
        .get(fungicidaCtrl.list_all_fungicidas)
        .post(fungicidaCtrl.create_fungicida);

    app.route('/fungicidas/:id_fungicida')
        .get( fungicidaCtrl.read_fungicida )
        .put( fungicidaCtrl.update_fungicida )
        .delete( fungicidaCtrl.delete_fungicida );    


    // sector Routes
    app.route('/sectores')
        .get(sectorCtrl.list_all_sectores)
        .post(sectorCtrl.create_sector);

    app.route('/sectores/:id_sector')
        .get( sectorCtrl.read_sector )
        .put( sectorCtrl.update_sector )
        .delete( sectorCtrl.delete_sector );    
    
    // numLotes in a sector
    app.route('/sectores/:id_sector/numLotes')
        .get( sectorCtrl.read_num_lotes_sector );
  
    // numEspecies in a sector

    app.route('/sectores/:id_sector/numEspecies')
        .get( sectorCtrl.read_num_especies_sector );


    // especies Routes
    app.route('/especies')
        .get(especieCtrl.list_all_especies)
        .post(especieCtrl.create_especie);

    app.route('/especies/:id_especie')
        .get( especieCtrl.read_especie )
        .put( especieCtrl.update_especie )
        .delete( especieCtrl.delete_especie );    


    // variedades Routes
    app.route('/variedades/:id_especie')
        .get(variedadesCtrl.list_all_variedades)
        .post(variedadesCtrl.create_variedad);
        
    app.route('/variedades/:id_variedad')
        .put( variedadesCtrl.update_variedad )
        .delete( variedadesCtrl.delete_variedad );    


    // lote Routes
    app.route('/lotes')
        .get(loteCtrl.list_all_lotes)
        .post(loteCtrl.create_lote);

    // all last 9 images of a sector    
    app.route('/lotes/:id_lote/images')
        .get( imagenLoteCtrl.list_all_imagenes_lote );
        
    app.route('/lotes/:id_lote')
        .get( loteCtrl.read_lote )
        .put( loteCtrl.update_lote )
        .delete( loteCtrl.delete_lote ); 
 

    // all lotes in a sector
    app.route('/lotes/sector/:id_sector')
        .get( loteCtrl.list_all_lotes_sector );


    
    // upload lote images
    app.route('/lotes/imagen-upload')
        .post( imagenLoteCtrl.create_imagen_lote  );    

    app.route('/lotes/images/:id_imagen')
        .get( imagenLoteCtrl.read_imagen_lote )
        .delete( imagenLoteCtrl.delete_imagen_lote );





    // LotesInfo Routes
    app.route('/lotesInfo')
        .get(loteInfoCtrl.list_all_lotesInfo);
        
    app.route('/lotesInfo/:id_lote')
        .get(loteInfoCtrl.read_loteInfo);
        
    app.route('/lotesInfo/sector/:id_sector')
        .get(loteInfoCtrl.list_all_lotesInfo_sector);    

  
    // operarios Routes
    app.route('/operarios')
        .get(operarioCtrl.list_all_operarios)
        .post(operarioCtrl.create_operario);

    app.route('/operarios/:id_operario')
        .get( operarioCtrl.read_operario )
        .put( operarioCtrl.update_operario )
        .delete( operarioCtrl.delete_operario );    
    

    // riego Routes
    app.route('/riegos/:id_sector')
        .get(riegoCtrl.list_all_riegos)
        .post(riegoCtrl.create_riego);

    // get query parameters f=DD/MM/YYYY & h=HH:MM & o= operarioId & s = sectorId ( primary key fields)
    app.route('/riegos')
        .get( riegoCtrl.read_riego )
        .delete( riegoCtrl.delete_riego );    



    // RiegosInfo Routes        
    app.route('/riegosInfo/:id_sector')
        .get( riegoInfoCtrl.list_all_riegos );
    
    // get query parameters f=DD/MM/YYYY & h=HH:MM & o= operarioId & s = sectorId ( primary key fields)    
    app.route('/riegosInfo')
        .get( riegoInfoCtrl.read_riego );          


    // notasLote Routes
    app.route('/notasLote')
        .post( notasLoteCtrl.create_nota );

    app.route('/notasLote/lote/:id_lote')
        .get( notasLoteCtrl.list_all_notas );

    app.route('/notasLote/:id_nota')
        .get( notasLoteCtrl.read_nota )
        .put( notasLoteCtrl.update_nota )
        .delete( notasLoteCtrl.delete_nota );


    // notasPrivLote Routes
    app.route('/notasPrivLote')
        .post( notasPrivLoteCtrl.create_nota_priv );

    app.route('/notasPrivLote/lote/:id_lote')
        .get( notasPrivLoteCtrl.list_all_notas_priv );
            
    app.route('/notasPrivLote/:id_nota')
        .get( notasPrivLoteCtrl.read_nota_priv )
        .put( notasPrivLoteCtrl.update_nota_priv )
        .delete( notasPrivLoteCtrl.delete_nota_priv );        


    // abonados Routes
    app.route('/abonados')
        .post( abonadosCtrl.create_abonado );

    app.route('/abonados/sector/:id_sector')
        .get( abonadosCtrl.list_all_abonados );
            
    app.route('/abonados/:id_abonado')
        .get( abonadosCtrl.read_abonado )
        .put( abonadosCtrl.update_abonado )
        .delete( abonadosCtrl.delete_abonado );    



    // abonadosInfo Routes
    app.route('/abonadosInfo/sector/:id_sector')
        .get( abonadosInfoCtrl.list_all_abonados_info );

    app.route('/abonadosInfo/:id_abonado')
        .get( abonadosInfoCtrl.read_abonado_info );

   
};