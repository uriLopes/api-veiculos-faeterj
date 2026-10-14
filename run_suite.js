const { spawn } = require('child_process');

console.log('Iniciando servidor server.js...');
const server = spawn('node', ['server.js'], { stdio: 'inherit' });

setTimeout(() => {
  const tests = spawn('node', ['test_routes.js'], { stdio: 'inherit' });

  tests.on('exit', (code) => {
    console.log(`Testes finalizados com código ${code}`);
    server.kill();
    process.exit(code);
  });
}, 2000);

