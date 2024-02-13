const { Router } = require("express");
const enrutador = Router();

// Traemos los datos del json
const ProdData = require('../models/TablaProductos.json');

// Rutas de CONTROLADORES
enrutador.get('/prueba',(req, res) => {
    // Creamos un JSON de prueba
    const json = {
        "item":"facturas",
        "precio":"2000"
    };
    // Para enviar un JSON a la página
    res.json(json);

    // Para enviar texto a la página
    //res.send("hola");
});

// Ruta para obtener la lista de todos los productos
enrutador.get('/', (req, res) => {
    res.json(ProdData);
});

// Ruta para buscar un producto en particular
enrutador.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    // Recorremos todos los productos
    // Dentro del FOREACH, prod = ProdData[i]
    ProdData.forEach( (prod) => {
        // Si un producto coincide con el id que nos mandaron
        if(prod.id == id){
            console.log(prod);
            // Devolvemos el producto
            res.json(prod);
        }
    });
    res.status(404).json({error: 'No se encontró el producto'});
});

// Ruta para crear un nuevo producto
enrutador.post('/nuevo', (req, res) => {
    // Para obtener un dato en particular
    const { item, precio, cantidad } = req.body;

    // Si existen los 4 datos
    if ( item && precio && cantidad) {
        //Generamos un nuevo ID
        const id = ProdData.length + 1;
        
        // Creamos un json a partir de los datos
        const nuevoProd = {id, ...req.body};
        
        // Grabamos el nuevo producto
        ProdData.push();
        res.send('Recurso creado');
    }
    else {
        res.status(500).json({error: 'Error en creación del recurso: '});
    }

    
});

// Ruta para actualizar un recurso
enrutador.put('/actualizar/:id', (req, res) => {
    const { id } = req.params;
    const { item, precio, cantidad } = req.body;

    if ( item && precio && cantidad) {
        ProdData.forEach( (prod) => {
            if(prod.id == id){
                console.log(prod.item);
                // actualizamos los ítems
                prod.item = item;
                prod.precio = precio;
                prod.cantidad = cantidad;

                res.send("Recurso actualizado");
            }
        });
    }

});

// Ruta para eliminar un recurso
// ":id" es el id del recurso que queremos eliminar. Es una variable
enrutador.delete('/eliminar/:id', (req, res) => {
    // Traemos los parámetros de la petición
    const { id } = req.params;
    console.log(req.params);

    if ( item && precio && cantidad) {
        ProdData.forEach( (prod, i) => {
            if(prod.id == id){
                console.log(prod.item);
                // eliminamos el item
                ProdData.splice(i, 1);

                res.send("Recurso eliminado");
            }
        });
    }

});

// Exporta este módulo
module.exports = enrutador;