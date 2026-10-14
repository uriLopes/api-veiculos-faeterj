require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Arquivos estáticos do Frontend (Dashboard Web)
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da aplicacao (API REST)
app.use(routes);

// Rota de status em JSON
app.get('/status', (req, res) => {
  return res.json({
    projeto: 'API REST de Gerenciamento de Veículos',
    instituicao: 'FAETERJ',
    autor: 'Iury Lopes',
    status: 'online'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
