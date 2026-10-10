const { spawn } = require('child_process');
const path = require('path');

console.log('========================================================');
console.log('  🚀 Iniciando Sistema de Gestión de Contactos...');
console.log('  📦 Servidor: Node.js / Express (http://localhost:5000)');
console.log('  💻 Cliente: React + Tailwind CSS (http://localhost:3000)');
console.log('========================================================\n');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

// Iniciar Backend
const server = spawn(npmCmd, ['start'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true
});

// Iniciar Frontend
const client = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit',
  shell: true
});

function cleanup() {
  console.log('\n🛑 Deteniendo servicios...');
  try {
    server.kill();
    client.kill();
  } catch (e) {}
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
