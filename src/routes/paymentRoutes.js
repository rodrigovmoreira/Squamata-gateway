import { Router } from 'express';
import PaymentController from '../controllers/PaymentController.js';

const router = Router();

// Criação de pagamento — parte da API versionada (/api/v1/payments).
router.post('/create', PaymentController.create);

export default router;