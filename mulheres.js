const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

const mulheres = [
  {
    nome: "Tainá Simões",
    imagem: "#",
    minibio: "Dev JS/CSS",
  },
  {
    nome: "Thais Viana",
    imagem: "#",
    minibio: "Dev Python",
  },
  {
    nome: "Bruna Santos",
    imagem: "#",
    minibio: "Dev React",
  },
];

function mostraMulheres(resquest, response) {
  response.json(mulheres);
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}

app.use(router.get("/mulheres", mostraMulheres));
app.listen(porta, mostraPorta);
