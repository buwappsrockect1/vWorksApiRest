# vWorksApiRest

## Version ejemplo10-api

# Arreglos


# Borrado logico de princ_activ_insecticida ( principios activos del insecticida - borrado logico )
Se agrega campo deleted para el principio activo del insecticida.
Se mostrarán los insecticidas que no estén borrados ( borrado lógico )




# Borrar Insecticida ( Arreglo )
Se arregla borrar Insecticida.
Se hace un borrado lógico. ( campo en la tabla deleted )
NO se borran sus principios activos. ( tabla princ_activ_fungicida )

Se agrega el campo deleted en tabla princ_activ_insecticida también.

Se mostrarán los insecticidas que no estén borrados. ( borrados lógicos )



# Borrado logico de princ_activ_fungicida ( principios activos del fungicida - borrado logico )
Se agrega campo deleted para el principio activo del fungicida.
Se mostrarán los fungicidas que no estén borrados ( borrado lógico )


# Borrar Fungicida ( Arreglo )
Se arregla borrar Fungicida.
Se hace un borrado lógico. ( campo en la tabla deleted )
NO se borran sus principios activos. ( tabla princ_activ_fungicida )

Se agrega el campo deleted en tabla princ_activ_fungicida también.

Se mostrarán los fungicidas que no estén borrados. ( borrados lógicos )




# Borrar Proveedores ( Arreglo )
Se arregla borrar Proveedor.
Se hace un borrado lógico. ( campo en la tabla deleted )

Se mostrarán los proveedores que no estén borrados. ( borrados lógicos )




# Borrar Abonos ( Arreglo )
Se arregla borrar Abono.
Se hace un borrado lógico. ( campo en la tabla deleted )

Se mostrarán los abonos para abonar que no estén borrados. ( borrados lógicos )





# Borrar Sectores con lotes ( Arreglo )
Se arregla borrar sectores.
Si el sector contiene especies se devuelve objeto de error.

Solo se puede borrar un sector si no contiene especies.
Avisar a Administrador para poder borrarlo.

Mensaje de error generado
res.json({ error: true , msg: err.message , code: err.code , errorObj: err });

const err = new DeleteError('Sector con lotes. Error al borrar', 50);

