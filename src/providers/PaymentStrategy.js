/**
 * Interface Base para Estratégias de Pagamento.
 */
export class PaymentStrategy {
  /**
   * Método obrigatório para processar um pagamento.
   * @param {number} amount - Valor total da transação.
   * @param {string} orderId - ID de referência do pedido.
   * @param {Object} credentials - Chaves de API do restaurante (Tenant).
   */
  async process(amount, orderId, credentials) {
    throw new Error(
      `Erro Crítico: O método process() não foi implementado na estratégia para o pedido ${orderId}.`
    );
  }
}