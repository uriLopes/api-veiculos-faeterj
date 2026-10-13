require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota raiz de boas-vindas / healthcheck
app.get('/', (req, res) => {
  return res.json({
    projeto: 'API REST de Gerenciamento de Veículos',
    instituicao: 'FAETERJ',
    autor: 'Iury Lopes',
    status: 'online'
  });
});

// Rotas da aplicacao
app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
