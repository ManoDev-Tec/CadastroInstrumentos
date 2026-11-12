import dns from "node:dns";
import "dotenv/config";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const url = process.env.MONGODB_URI;

if (!url) {
    throw new Error("MONGODB_URI não encontrada no arquivo .env");
}

let conexao;

try {
    conexao = await mongoose.connect(url);
    console.log("MongoDB conectado com sucesso!");
} catch (erro) {
    console.error("Erro ao conectar com MongoDB:", erro);
    process.exit(1);
}

export default conexao;