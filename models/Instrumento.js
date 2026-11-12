import mongoose from "mongoose";

// Criação do Schema do instrumento
const instrumentoSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true
    },

    fabricante: {
        type: String,
        required: true
    },

    preco: {
        type: Number,
        required: true
    },

    tipo: {
        type: String,
        required: true
    }

});

// Criação do Model
const Instrumento = mongoose.model(
    "Instrumento",
    instrumentoSchema
);

// Exportação do Model
export default Instrumento;