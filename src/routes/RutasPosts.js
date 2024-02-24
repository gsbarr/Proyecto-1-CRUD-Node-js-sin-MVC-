const { Router } = require("express");
const enrutador = Router();

// Traemos los datos del json
//const ProdData = require('../models/TablaProductos.json');
const Posts = require('../models/Posts.js');

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
enrutador.get('/', async (req, res) => {

    try {
        const post = await Posts.find().lean();
        res.status(200).json(post);
    } catch(e){
        res.status(500).json({error: e});
    }
    
    
});

// Ruta para buscar un producto en particular
enrutador.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    if (id) {

        try{
            const post = await Posts.findById(id).lean();

            if (post){
                res.status(200).json(post);
            } else {
                res.status(404).json({error: 'Recurso no encontrado'});
            }
        } catch (e) {
            res.status(500).json({error: e});
        }
        
    } else
    {
        res.status(404).json({error: 'Faltan datos'});
    }
    
});

// Ruta para crear un nuevo producto
enrutador.post('/nuevo', async (req, res) => {

    // Traemos los parámetros de la petición
    const {autor, titulo, texto} = req.body;
    console.log(req.params);

    // verificamos si tenemos todos los datos
    if (autor && titulo && texto) {
            // Creamos un nuevo post
            const nuevo = new Posts({autor, titulo, texto});
            console.log(nuevo);

            // Guardamos el nuevo post
            try{
                let resp = await nuevo.save();

                // Verificamos si se creó el recurso
                if (resp){
                    res.status(200).json({msg: 'Recurso creado'});
                } else {
                    res.status(500).json({error: 'Recurso no creado'});
                }
            } catch (e){
                console.log(e);
                res.status(500).json({error: e});
            }
        
    } else
    {
        res.status(500).json({error: 'Faltan datos'});
    }

});

// Ruta para actualizar un recurso
enrutador.put('/actualizar/:id', async (req, res) => {
    const { id } = req.params;
    const { autor, titulo, texto } = req.body;

    if (id && autor && titulo && texto){
        
        try{
            let r = await Posts.findByIdAndUpdate(id, {autor, titulo, texto});

            if (r){
                res.status(200).json({msg: 'Recurso actualizado'})
            } else{
                res.status(500).json({error: 'Recurso no encontrado'});
            }
        } catch (e){
            res.status(500).json({error: e});
        }
        


    } else{
        res.status(500).json({error: 'faltan datos'});
    }

});

// Ruta para eliminar un recurso
// ":id" es el id del recurso que queremos eliminar. Es una variable
enrutador.delete('/eliminar/:id', async (req, res) => {
    // Traemos los parámetros de la petición
    const id = req.params.id;
    console.log(req.params.id);

    if (id) {
        try {
            //eliminamos el ID
            let del =  await Posts.findByIdAndDelete(id);
            
            // Verificamos si se eliminó algo
            if (del){
                res.status(200).json({msg: 'Recurso eliminado'});
            } else{
                res.status(404).json({error: 'No se encontró el recurso'});
            }
            
        } catch(err){
            console.log(err);
            res.status(500).json({error: err});
        }
    } else
    {
        res.status(404).json({error: 'Falta ID'});
    }
    
});

// Exporta este módulo
module.exports = enrutador;