import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/paymentRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
// Caminho canônico único: /api/v1/payments. Ver ADR 002 em Calango-docs/docs/ADRs.
app.use('/api/v1/payments', paymentRoutes);

// Webhooks ficam fora do versionamento: a URL é configurada no provedor e
// precisa permanecer estável entre versões da API.
app.use('/api/webhooks/payments', webhookRoutes);

// Health Check para monitorar o status da aplicação
app.get('/api/v1/health', (req, res) => {
  res.json({ 
    status: 'online', 
    uptime: process.uptime(),
    timestamp: new Date().toISOString() 
  });
});

export default app;