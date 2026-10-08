# 🗺️ Roadmap de Integração: Appmax ➔ Gateway ➔ Calango Food

## Fase 1: Configuração do Ambiente Appmax (Sem código)
Antes de programar, precisamos das chaves para o nosso Gateway conseguir "conversar" com a Appmax.

[x]. Criar Conta: Cadastre-se na plataforma da Appmax (gratuita).

[]. Obter Chaves Sandbox: No painel da Appmax, localize as credenciais de API para o ambiente de testes (Sandbox). Guarde a API Key e o Token.

[]. Configurar URL de Webhook na Appmax: Você precisará dizer à Appmax para onde enviar os avisos de pagamento aprovado. Essa URL será a rota do seu Squamata-gateway (ex: [https://gateway.calangoapp.com/v1/payments/webhook/appmax](https://gateway.calangoapp.com/v1/payments/webhook/appmax)).   
MD

## Fase 2: Desenvolvimento no Squamata-Gateway (A Ponte)
Aqui vamos ensinar o Gateway a falar a língua da Appmax e a traduzir as respostas para o Calango Food.

Criar a Estratégia da Appmax: Na pasta src/providers/ do Squamata-gateway, crie o arquivo AppmaxStrategy.js. Ele deve herdar a classe PaymentStrategy e implementar a função process(amount, orderId, credentials). Esta função fará a requisição HTTP (usando Axios) para a API da Appmax solicitando a cobrança.   
MD
+ 1

Atualizar a Fábrica: No arquivo PaymentFactory.js, adicione a lógica para que, se o método escolhido for 'appmax', ele instancie a nova AppmaxStrategy.   
MD

Traduzir o Webhook (WebhookAdapter): No arquivo WebhookAdapter.js, crie a regra de tradução. Quando a Appmax avisar que o pedido foi pago, o Adapter deve ler o JSON bagunçado deles e transformá-lo no formato "Calango Standard", retornando um objeto limpo com success, transactionId, gateway e status: 'paid'.   
MD
+ 1

Repassar para o Food: O PaymentController.js pegará esse status limpo e fará um POST para o webhook do Calango Food, avisando que o pedido X foi aprovado.   
MD
+ 1

## Fase 3: Desenvolvimento no Calango Food (A Aprovação)
O Gateway já sabe cobrar e traduzir, agora o Calango Food precisa "escutar" e agir.

Religar o Webhook: No arquivo index.js, remova o comentário da linha app.post('/api/webhooks/payments', webhookController.handlePayment);.   
JS

Atualizar o Status do Pedido: No webhookController.js (que precisará ser criado ou ajustado), crie a lógica para receber o POST do Gateway. Se o status recebido for paid, busque o pedido pelo ID (Order.findById) e atualize o status financeiro dele.   
JS

Mudar para a Cozinha: Assim que o pagamento for confirmado, o status logístico do pedido deve ser alterado (ex: o OrderController.js já prevê transições como de paid para preparing).   
JS

Disparar Notificações: Chame o NotificationService.notifyNewOrderPaid(order) para que o sistema de WhatsApp avise o restaurante ("Novo pedido pago!") e o cliente ("Seu pedido está na cozinha!").   
JS

## Fase 4: Testes de Ponta a Ponta (Sandbox)
Com tudo conectado, faremos a simulação de uma compra real sem gastar dinheiro.

Pedido Inicial: Acesse o frontend público do Calango Food, adicione um produto ao carrinho e finalize a compra escolhendo Pix ou Cartão (via Appmax).

Verificar Retorno: Confirme se a tela exibe o QR Code/Copia e Cola falso gerado pelo ambiente Sandbox da Appmax.

Simular Pagamento: Vá no painel da Appmax (ou use uma ferramenta deles de simulação) e marque aquela transação como "Paga".

A Magia Acontecendo: Observe os terminais (logs). O Gateway deve receber o Webhook da Appmax, traduzir e enviar para o Calango Food. O Calango Food deve atualizar o status no MongoDB para pago e, em seguida, disparar as mensagens no WhatsApp do cliente e do lojista.   
JS
+ 1