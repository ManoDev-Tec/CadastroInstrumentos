import express from "express";

// Importa a conexão com MongoDB
import conexao from "./config/conexao.js";

// Importa o Model Instrumento
import Instrumento from "./models/Instrumento.js";

// Cria a aplicação Express
const app = express();


// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// Permite receber dados dos formulários
app.use(express.urlencoded({ extended: true }));

// Disponibiliza os arquivos da pasta public
app.use(express.static("public"));


// ROTA INICIAL
app.get("/", (req, res) => {

    res.render("index");

});


// ROTA GET - Formulário de cadastro
app.get("/instrumentos/novo", (req, res) => {

    res.render("instrumento/add");

});


// ROTA POST - Cadastro de instrumento
app.post("/instrumentos", async (req, res) => {

    try {

        // Recebe os dados do formulário
        const instrumento = new Instrumento({

            nome: req.body.nome,

            fabricante: req.body.fabricante,

            preco: req.body.preco,

            tipo: req.body.tipo

        });

        // Salva no MongoDB
        await instrumento.save();

        // Apresenta a confirmação
        res.render("instrumento/addok", {
            instrumento: instrumento
        });

    } catch (erro) {

        console.log("Erro ao cadastrar:", erro);

        res.status(500).send("Erro ao cadastrar instrumento.");

    }

});

// ROTA GET - Listagem de instrumentos
app.get("/instrumentos", async (req, res) => {

    try {

        // Consulta os instrumentos no MongoDB
        const instrumentos = await Instrumento.find();

        // Envia os registros para o EJS
        res.render("instrumento/lst", {
            instrumentos: instrumentos
        });

    } catch (erro) {

        console.log("Erro ao listar:", erro);

        res.status(500).send("Erro ao consultar instrumentos.");

    }

});

// Inicialização do servidor
app.listen(3000, () => {

    console.log("Servidor rodando em http://localhost:3000");

    console.log("Conexão com MongoDB estabelecida!");

});