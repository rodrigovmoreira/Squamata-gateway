// [SQUAMATA GATEWAY] - src/providers/PixStrategy.js
import { PaymentStrategy } from './PaymentStrategy.js';

export class PixStrategy extends PaymentStrategy {
  async process(amount, orderId, credentials) {
    try {
      console.log(`\x1b[33m%s\x1b[0m`, `⚡ Gerando PIX de R$ ${amount} para o pedido ${orderId}`);
      
      // LÊ A CONFIGURAÇÃO QUE VEM DO PAINEL DO LOJISTA
      if (credentials && credentials.pixProvider === 'manual') {
        return {
          success: true,
          transactionId: `PIX-MANUAL-${Math.random().toString(36).toUpperCase().substring(2, 10)}`,
          gateway: 'pix', 
          status: 'pending',
          qrCode: "00020126360014BR.GOV.BCB.PIX0114+5511999999999520400005303986540549.905802BR5916Calango Delivery6009Sao Paulo62070503***63041A2B", // Mock QR Code completo
          copyPaste: "00020126360014BR.GOV.BCB.PIX0114+5511999999999520400005303986540549.905802BR5916Calango Delivery6009Sao Paulo62070503***63041A2B" // Mock Linha
        };
      }

      // Se for PagBank ou outro, entrará a lógica da API real aqui no futuro
      return {
        success: true,
        transactionId: `PIX-${Math.random().toString(36).toUpperCase().substring(2, 10)}`,
        gateway: 'pix', 
        status: 'pending',
        qrCode: "00020126360014BR.GOV.BCB.PIX...", 
        copyPaste: "00020126360014BR.GOV.BCB.PIX..." 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}