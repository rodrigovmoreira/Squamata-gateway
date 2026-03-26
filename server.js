
import app from './src/app.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Define a porta do servidor
const PORT = process.env.PORT || 3010;

// Inicializa o banco de dados antes de subir o servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\x1b[36m%s\x1b[0m`, `🐊 Calango Gateway [ON]`);
    console.log(`🚀 Porta: ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
  });
});