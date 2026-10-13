# API REST de Gerenciamento de Veículos

Projeto prático individual para a disciplina de **Programação Cliente/Servidor** da **FAETERJ**.  
**Professor:** Henrique Barbosa  
**Aluno:** Iury Lopes  

---

## 📌 1. Objetivo do Projeto

Desenvolver um backend que exponha uma API REST para o gerenciamento de veículos de uma montadora, contemplando as quatro operações básicas de persistência (**CRUD**) com os métodos HTTP **GET**, **POST**, **PUT** e **DELETE**, utilizando o banco de dados relacional **PostgreSQL** hospedado na nuvem (**Neon**).

---

## 🚀 2. Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework para servidor HTTP e roteamento
- **Knex.js**: Query builder para construção segura de consultas SQL
- **pg**: Driver do PostgreSQL para Node.js
- **dotenv**: Gerenciamento de variáveis de ambiente
- **cors**: Habilitação de Cross-Origin Resource Sharing
- **nodemon**: Reinicialização automática em ambiente de desenvolvimento

---

## 📂 3. Estrutura do Projeto

```text
api-veiculos-faeterj/
├── src/
│   ├── controllers/
│   │   └── veiculoController.js   # Regras de negócio, validações e respostas HTTP
│   ├── database/
│   │   └── db.js                  # Inicialização da conexão com Knex
│   └── routes.js                  # Declaração das rotas do recurso /veiculos
├── .env.example                   # Exemplo de configuração de variáveis
├── .gitignore                     # Ignora .env e node_modules
├── knexfile.js                    # Configuração de conexão do Knex com SSL
├── package.json                   # Dependências e scripts
├── server.js                      # Inicialização do servidor Express
└── README.md                      # Documentação completa
```

---

## ⚙️ 4. Como Configurar e Rodar o Projeto

### Pré-requisitos
- Node.js instalado (v18 ou superior)
- Git instalado

### Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/uriLopes/api-veiculos-faeterj.git
   cd api-veiculos-faeterj
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Configurar as Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto (baseando-se no `.env.example`):
   ```env
   DATABASE_URL='postgresql://neondb_owner:tEgdK7s0NzmC@ep-small-scene-a5vgf7jk-pooler.us-east-2.aws.neon.tech/banco?sslmode=require&channel_binding=require'
   PORT=3000
   ```

4. **Executar o Servidor:**
   - Em modo de desenvolvimento (com nodemon):
     ```bash
     npm run dev
     ```
   - Em modo de produção:
     ```bash
     npm start
     ```

   O servidor iniciará em `http://localhost:3000`.

---

## 📑 5. Especificação das Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| **GET** | `/veiculos` | Lista todos os veículos cadastrados |
| **GET** | `/veiculos/:id` | Retorna um veículo específico pelo ID |
| **POST** | `/veiculos` | Cadastra um novo veículo |
| **PUT** | `/veiculos/:id` | Atualiza os dados de um veículo existente |
| **DELETE** | `/veiculos/:id` | Remove um veículo pelo ID |

### Campos da Entidade Veículo

- `id`: Inteiro sequencial (Primary Key gerada automaticamente)
- `modelo`: String até 100 caracteres (**obrigatório**)
- `tipo_propulsao`: Enum (`'eletrico'` ou `'hibrido'`) (**obrigatório**)
- `ano_modelo`: Inteiro pequeno / ano (**obrigatório**)
- `autonomia_km`: Inteiro (opcional)
- `capacidade_bateria_kwh`: Decimal com 2 casas (opcional)
- `preco_base`: Decimal com 2 casas (**obrigatório**)
- `status_producao`: Enum (`'em_producao'` ou `'descontinuado'`) (padrão: `'em_producao'`)

---

## 🧪 6. Documentação de Testes (Cenários de Sucesso e Erro)

### 6.1 `GET /veiculos` (Listar todos)
- **Sucesso (Status 200 OK):**
  - **Resposta:**
    ```json
    [
      {
        "id": 1,
        "modelo": "Pulse Hybrid",
        "tipo_propulsao": "hibrido",
        "ano_modelo": 2026,
        "autonomia_km": 600,
        "capacidade_bateria_kwh": null,
        "preco_base": "125000.00",
        "status_producao": "em_producao"
      }
    ]
    ```

---

### 6.2 `GET /veiculos/:id` (Buscar por ID)
- **Cenário de Sucesso (Status 200 OK):**
  - Requisição: `GET /veiculos/1`
  - **Resposta:**
    ```json
    {
      "id": 1,
      "modelo": "Pulse Hybrid",
      "tipo_propulsao": "hibrido",
      "ano_modelo": 2026,
      "autonomia_km": 600,
      "capacidade_bateria_kwh": null,
      "preco_base": "125000.00",
      "status_producao": "em_producao"
    }
    ```
- **Cenário de Erro (Status 404 Not Found):**
  - Requisição: `GET /veiculos/9999`
  - **Resposta:**
    ```json
    {
      "mensagem": "Veículo não encontrado."
    }
    ```

---

### 6.3 `POST /veiculos` (Cadastrar veículo)
- **Cenário de Sucesso (Status 201 Created):**
  - **Corpo da Requisição (JSON):**
    ```json
    {
      "modelo": "Peugeot e-2008",
      "tipo_propulsao": "eletrico",
      "ano_modelo": 2026,
      "autonomia_km": 406,
      "capacidade_bateria_kwh": 54.00,
      "preco_base": 199990.00,
      "status_producao": "em_producao"
    }
    ```
  - **Resposta:**
    ```json
    {
      "id": 2,
      "modelo": "Peugeot e-2008",
      "tipo_propulsao": "eletrico",
      "ano_modelo": 2026,
      "autonomia_km": 406,
      "capacidade_bateria_kwh": "54.00",
      "preco_base": "199990.00",
      "status_producao": "em_producao"
    }
    ```
- **Cenário de Erro 1 (Status 400 Bad Request - Campo obrigatório ausente):**
  - **Corpo:** `{ "modelo": "Carro Incompleto" }`
  - **Resposta:**
    ```json
    {
      "mensagem": "Os campos modelo, tipo_propulsao, ano_modelo e preco_base são obrigatórios."
    }
    ```
- **Cenário de Erro 2 (Status 400 Bad Request - Enum inválido):**
  - **Corpo:** `{ "modelo": "Teste", "tipo_propulsao": "gasolina", "ano_modelo": 2025, "preco_base": 80000 }`
  - **Resposta:**
    ```json
    {
      "mensagem": "tipo_propulsao inválido. Valores aceitos: eletrico, hibrido"
    }
    ```

---

### 6.4 `PUT /veiculos/:id` (Atualizar veículo)
- **Cenário de Sucesso (Status 200 OK):**
  - Requisição: `PUT /veiculos/2`
  - **Corpo:**
    ```json
    {
      "preco_base": 189990.00,
      "status_producao": "descontinuado"
    }
    ```
  - **Resposta:**
    ```json
    {
      "id": 2,
      "modelo": "Peugeot e-2008",
      "tipo_propulsao": "eletrico",
      "ano_modelo": 2026,
      "autonomia_km": 406,
      "capacidade_bateria_kwh": "54.00",
      "preco_base": "189990.00",
      "status_producao": "descontinuado"
    }
    ```
- **Cenário de Erro (Status 404 Not Found):**
  - Requisição: `PUT /veiculos/9999`
  - **Resposta:**
    ```json
    {
      "mensagem": "Veículo não encontrado."
    }
    ```

---

### 6.5 `DELETE /veiculos/:id` (Remover veículo)
- **Cenário de Sucesso (Status 200 OK):**
  - Requisição: `DELETE /veiculos/2`
  - **Resposta:**
    ```json
    {
      "mensagem": "Veículo removido com sucesso."
    }
    ```
- **Cenário de Erro (Status 404 Not Found):**
  - Requisição: `DELETE /veiculos/9999`
  - **Resposta:**
    ```json
    {
      "mensagem": "Veículo não encontrado."
    }
    ```

---

## 🔒 7. Segurança e Boas Práticas

- As credenciais de acesso ao banco estão protegidas por variáveis de ambiente via `.env`, mantidas fora do controle de versão pelo `.gitignore`.
- Todas as operações com banco de dados utilizam o Query Builder **Knex.js**, prevenindo vulnerabilidades de **SQL Injection**.
- Códigos de status HTTP semânticos (200, 201, 400, 404, 500) implementados em todas as rotas.
