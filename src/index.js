const express = require('express');

// En la variable APP se guarda el servidor
const app = express();

// Inicializamos base de datos
require('./db.js');

// Sirve para ver en consola información útil sobre cómo es llamado el servidor
const morgan = require('morgan');


app.set('port', process.env.PORT || 3000);

// Inicializamos morgan en modo DEV
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Rutas / controladores //
//Creamos una ruta de prueba
app.get('/', (req, res) => {
    res.send("la prueba anda");
});

// Traemos la ruta del módulo productos
// El primer parámetro crea un prefijo /api/productos para todas
// las rutas dentro de productos.js 
app.use('/api/productos', require('./routes/productos.js'));



// Ejecutamos el servidor
app.listen(3000, () => {
    console.log(`Servidor en puerto ${app.get('port')}`);
});