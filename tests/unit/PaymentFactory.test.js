import { PaymentFactory } from '../../src/services/PaymentFactory.js';
import { PixStrategy } from '../../src/providers/PixStrategy.js';
import { StripeStrategy } from '../../src/providers/StripeStrategy.js';
import { PagBankStrategy } from '../../src/providers/PagBankStrategy.js';

describe('PaymentFactory', () => {
  
  test('Deve retornar uma instância de PixStrategy quando o método for "pix"', () => {
    const strategy = PaymentFactory.create('pix');
    expect(strategy).toBeInstanceOf(PixStrategy);
  });

  test('Deve retornar uma instância de StripeStrategy quando o método for "stripe"', () => {
    const strategy = PaymentFactory.create('stripe');
    expect(strategy).toBeInstanceOf(StripeStrategy);
  });

  test('Deve retornar uma instância de PagBankStrategy quando o método for "pagbank"', () => {
    const strategy = PaymentFactory.create('pagbank');
    expect(strategy).toBeInstanceOf(PagBankStrategy);
  });

  test('Deve retornar PagBankStrategy como padrão quando o método for "card"', () => {
    const strategy = PaymentFactory.create('card');
    expect(strategy).toBeInstanceOf(PagBankStrategy);
  });

  test('Deve lançar um erro para métodos de pagamento não suportados', () => {
    expect(() => {
      PaymentFactory.create('metodo_inexistente');
    }).toThrow('O método de pagamento "metodo_inexistente" não é suportado pelo Calango-food.');
  });

  test('Deve ser case-insensitive (aceitar "STRIPE" ou "stripe")', () => {
    const strategy = PaymentFactory.create('STRIPE');
    expect(strategy).toBeInstanceOf(StripeStrategy);
  });
});