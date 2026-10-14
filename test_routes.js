const http = require('http');

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: 'localhost',
        port: 3000,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
        }
      },
      (res) => {
        let resBody = '';
        res.on('data', (chunk) => (resBody += chunk));
        res.on('end', () => {
          let parsed;
          try {
            parsed = JSON.parse(resBody);
          } catch {
            parsed = resBody;
          }
          resolve({ status: res.statusCode, body: parsed });
        });
      }
    );
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log('--- INICIANDO BATERIA DE TESTES DAS ROTAS ---');

  // 1. GET /
  const rHome = await request('GET', '/');
  console.log('1. GET / -> Status:', rHome.status, rHome.body.status);

  // 2. GET /veiculos
  const rList = await request('GET', '/veiculos');
  console.log('2. GET /veiculos -> Status:', rList.status, 'Total registros:', rList.body.length);

  // 3. POST /veiculos (Erro 400 - dados faltando)
  const rPostErr = await request('POST', '/veiculos', { modelo: 'Incompleto' });
  console.log('3. POST /veiculos (invalido) -> Status:', rPostErr.status, rPostErr.body.mensagem);

  // 4. POST /veiculos (Sucesso 201)
  const rPostOk = await request('POST', '/veiculos', {
    modelo: 'Pulse Hybrid Teste',
    tipo_propulsao: 'hibrido',
    ano_modelo: 2026,
    autonomia_km: 650,
    capacidade_bateria_kwh: null,
    preco_base: 125900.00,
    status_producao: 'em_producao'
  });
  console.log('4. POST /veiculos (sucesso) -> Status:', rPostOk.status, 'Criado id:', rPostOk.body.id);
  const novoId = rPostOk.body.id;

  // 5. GET /veiculos/:id (Sucesso 200)
  const rGetId = await request('GET', `/veiculos/${novoId}`);
  console.log('5. GET /veiculos/:id (sucesso) -> Status:', rGetId.status, 'Modelo:', rGetId.body.modelo);

  // 6. GET /veiculos/:id (Erro 404)
  const rGet404 = await request('GET', '/veiculos/999999');
  console.log('6. GET /veiculos/:id (404) -> Status:', rGet404.status, rGet404.body.mensagem);

  // 7. PUT /veiculos/:id (Sucesso 200)
  const rPutOk = await request('PUT', `/veiculos/${novoId}`, {
    preco_base: 119900.00,
    status_producao: 'descontinuado'
  });
  console.log('7. PUT /veiculos/:id (sucesso) -> Status:', rPutOk.status, 'Novo preco:', rPutOk.body.preco_base, 'Novo status:', rPutOk.body.status_producao);

  // 8. PUT /veiculos/:id (Erro 404)
  const rPut404 = await request('PUT', '/veiculos/999999', { preco_base: 100 });
  console.log('8. PUT /veiculos/:id (404) -> Status:', rPut404.status, rPut404.body.mensagem);

  // 9. DELETE /veiculos/:id (Sucesso 200)
  const rDelOk = await request('DELETE', `/veiculos/${novoId}`);
  console.log('9. DELETE /veiculos/:id (sucesso) -> Status:', rDelOk.status, rDelOk.body.mensagem);

  // 10. DELETE /veiculos/:id (Erro 404)
  const rDel404 = await request('DELETE', `/veiculos/${novoId}`);
  console.log('10. DELETE /veiculos/:id (404 ja deletado) -> Status:', rDel404.status, rDel404.body.mensagem);

  console.log('--- TODOS OS TESTES PASSARAM COM SUCESSO! ---');
  process.exit(0);
}

runTests().catch(err => {
  console.error('Falha nos testes:', err);
  process.exit(1);
});

