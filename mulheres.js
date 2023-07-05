const express = require("express"); // inicia o express
const router = express.Router(); // configura a primeira parte da rota
const cors = require("cors"); // tras o  pacote cors que permite consumir essa api no frontend
// const { v4: uuidv4 } = require("uuid");
const conectaBancoDeDados = require("./bancoDeDados"); // liga ao arquivo banco de dados
const Mulher = require("./mulherModel");

conectaBancoDeDados(); // chama a função que conecta o banco de dados

const app = express(); // inicia o app
app.use(express.json());
app.use(cors());

const porta = 3333; // cria a porta

// cria a lista inicial de mulheres
// const mulheres = [
//   {
//     id: "1",
//     nome: "Tainá Simões",
//     imagem: "#",
//     minibio: "Dev JS/CSS",
//   },
//   {
//     id: "2",
//     nome: "Thais Viana",
//     imagem: "#",
//     minibio: "Dev Python",
//   },
//   {
//     id: "3",
//     nome: "Bruna Santos",
//     imagem: "#",
//     minibio: "Dev React",
//   },
// ];

// GET
async function mostraMulheres(request, response) {
  // response.json(mulheres);
  try {
    const mulheresVindasDoBancoDeDados = await Mulher.find();
    response.json(mulheresVindasDoBancoDeDados);
  } catch (erro) {
    console.log(erro);
  }
}

// POST
async function criaMulher(request, response) {
  // const novaMulher = {
  //   id: uuidv4(),
  //   nome: request.body.nome,
  //   imagem: request.body.imagem,
  //   minibio: request.body.minibio,
  // };
  // mulheres.push(novaMulher);
  // response.json(mulheres);

  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao,
  });

  try {
    const mulherCriada = await novaMulher.save();
    response.status(201).json(mulherCriada);
  } catch (erro) {
    console.log(erro);
  }
}

// PATCH
async function corrigeMulher(request, response) {
  // function encontraMulher(mulher) {
  //   if (mulher.id === request.params.id) {
  //     return mulher;
  //   }
  // }
  // const mulherEncontrada = mulheres.find(encontraMulher);
  // if (request.body.nome) {
  //   mulherEncontrada.nome = request.body.nome;
  // }
  // if (request.body.imagem) {
  //   mulherEncontrada.imagem = request.body.imagem;
  // }
  // if (request.body.minibio) {
  //   mulherEncontrada.minibio = request.body.minibio;
  // }
  // response.json(mulheres);

  try {
    const mulherEncontrada = await Mulher.findById(request.params.id);
    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome;
    }
    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem;
    }
    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio;
    }
    if (request.body.citacao) {
      mulherEncontrada.citacao = request.body.citacao;
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();
    response.json(mulherAtualizadaNoBancoDeDados);
  } catch (erro) {
    console.log(erro);
  }
}

// DELETE
async function deletaMulher(request, response) {
  // function todasMenosEla(mulher) {
  //   if (mulher.id !== request.params.id) {
  //     return mulher;
  //   }
  // }
  // const mulheresQueFicam = mulheres.filter(todasMenosEla);
  // response.json(mulheresQueFicam);

  try {
    await Mulher.findByIdAndDelete(request.params.id);
    response.json({ messagem: "Mulher deletada com sucesso!" });
  } catch (erro) {
    console.log(erro);
  }
}

app.use(router.get("/mulheres", mostraMulheres)); // configura rota GET /mulheres
app.use(router.post("/mulheres", criaMulher)); // configura rota POST /mulheres
app.use(router.patch("/mulheres/:id", corrigeMulher)); // configura a rota PATCH /mulheres/:id
app.use(router.delete("/mulheres/:id", deletaMulher)); // confugura rota DELETE /mulheres

// porta
function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}
app.listen(porta, mostraPorta); // escuta a porta
