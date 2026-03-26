import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  tenantId: { type: String, required: true, index: true }, 
  orderId: { type: String, required: true, index: true },
  gateway: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'failed', 'refunded'], 
    default: 'pending' 
  },
  transactionId: { type: String, unique: true, sparse: true },
  rawResponse: { type: Object }, // JSON bruto do banco para auditoria
  webhookHistory: [Object],      // Histórico de mudanças de status
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Transaction', TransactionSchema);