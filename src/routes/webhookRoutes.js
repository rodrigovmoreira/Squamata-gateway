import { Router } from 'express';
import PaymentController from '../controllers/PaymentController.js';

const router = Router();

// Webhooks de provedores (Pix, Stripe, PagBank).
// Fora do versionamento de propósito: a URL é cadastrada no painel de cada
// provedor e não pode mudar quando a API evoluir para v2.
router.post('/:provider', PaymentController.handleWebhook);

export default router;
