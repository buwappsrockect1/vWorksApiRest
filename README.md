# vWorksApiRest

## Version ejemplo10-api

# Arreglos

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

