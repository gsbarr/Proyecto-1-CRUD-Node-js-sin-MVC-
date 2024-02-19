require('dotenv').config();

const mongoose = require('mongoose');

console.log(process.env.BD_PASSWORD);
const MONGODB_URI = `mongodb+srv://admin:${process.env.BD_PASSWORD}@redsocial.8ywwweo.mongodb.net/?retryWrites=true&w=majority`;

// Conectamos a bd
mongoose.connect(MONGODB_URI)
.then (db => console.log('BD conectada'))
.catch(err => console.log(err));
