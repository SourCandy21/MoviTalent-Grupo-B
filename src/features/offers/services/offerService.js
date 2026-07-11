// Simulação de banco de dados em memória para demonstração/prototipagem
let itemsMock = [
  {
    id: 'item-1',
    title: 'Geladeira Duplex Frost Free',
    description: 'Geladeira funcionando perfeitamente. Estou doando pois comprei uma nova. Retirar no local.',
    type: 'USER',
    status: 'NEGOTIATING',
    imageUrl: 'https://images.unsplash.com/photo-1571887455891-298090533924?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 0,
    ownerId: 'user-current'
  },
  {
    id: 'item-2',
    title: 'Sofá 3 Lugares Reclinável',
    description: 'Sofá cinza, reclinável e retrátil, com marcas de uso comuns mas muito confortável.',
    type: 'USER',
    status: 'RESERVED',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 150.00,
    ownerId: 'user-current'
  },
  {
    id: 'item-3',
    title: 'Bicicleta Aro 29',
    description: 'Bicicleta sem marcha, ideal para locomoção diária curta. Ótimo estado.',
    type: 'USER',
    status: 'AVAILABLE',
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 0,
    ownerId: 'user-current'
  },
  {
    id: 'item-4',
    title: 'Microondas Electrolux 20L',
    description: 'Painel com pequeno defeito nas teclas de atalho rápido. Aquece normalmente.',
    type: 'USER',
    status: 'AVAILABLE',
    imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 50.00,
    ownerId: 'user-current'
  }
];

let offersMock = [
  // Ofertas para a Geladeira (item-1) - Estado: NEGOTIATING
  {
    id: 'offer-1',
    itemId: 'item-1',
    buyerId: 'user-buyer-1',
    buyerName: 'Carlos Silva',
    buyerScore: 92,
    buyerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    price: 0.00,
    message: 'Olá! Tenho muito interesse na geladeira. Posso ir buscar com uma carretinha no sábado à tarde. Obrigado!',
    scheduledTime: '2026-07-11T14:30:00.000Z',
    status: 'PENDING'
  },
  {
    id: 'offer-2',
    itemId: 'item-1',
    buyerId: 'user-buyer-2',
    buyerName: 'Juliana Mendes',
    buyerScore: 78,
    buyerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    price: 0.00,
    message: 'Consigo passar para retirar hoje mesmo após as 18:30. Moro no bairro vizinho.',
    scheduledTime: '2026-07-10T19:00:00.000Z',
    status: 'PENDING'
  },
  {
    id: 'offer-3',
    itemId: 'item-1',
    buyerId: 'user-buyer-3',
    buyerName: 'Roberto Junior',
    buyerScore: 85,
    buyerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    price: 0.00,
    message: 'Caso ainda esteja disponível, tenho carro grande e posso buscar na sexta pela manhã.',
    scheduledTime: '2026-07-10T10:00:00.000Z',
    status: 'PENDING'
  },
  // Ofertas para o Sofá (item-2) - Estado: RESERVED (offer-4 já foi aceita)
  {
    id: 'offer-4',
    itemId: 'item-2',
    buyerId: 'user-buyer-4',
    buyerName: 'Fernanda Lima',
    buyerScore: 97,
    buyerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    price: 150.00,
    message: 'Adorei o sofá, encaixa perfeito na minha sala. Aceito o valor cheio e retiro no domingo de manhã.',
    scheduledTime: '2026-07-12T09:00:00.000Z',
    status: 'ACCEPTED'
  },
  {
    id: 'offer-5',
    itemId: 'item-2',
    buyerId: 'user-buyer-5',
    buyerName: 'Marcos Souza',
    buyerScore: 65,
    buyerAvatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=80',
    price: 130.00,
    message: 'Faz por 130 reais à vista? Posso buscar amanhã no horário do almoço.',
    scheduledTime: '2026-07-11T12:00:00.000Z',
    status: 'REJECTED'
  }
];

let collectionsMock = [
  {
    id: 'col-1',
    itemId: 'item-2',
    offerId: 'offer-4',
    scheduledTime: '2026-07-12T09:00:00.000Z',
    status: 'SCHEDULED',
    confirmedByAnnouncer: false,
    confirmedByCollector: false
  }
];

// Funções do serviço (simulando chamadas de rede com delay)
export const offerService = {
  // Retorna os itens cadastrados pelo doador
  getMyItems: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...itemsMock]);
      }, 500);
    });
  },

  // Retorna um item pelo ID
  getItemById: (itemId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const item = itemsMock.find(i => i.id === itemId);
        if (itemId === 'item-4') {
          reject(new Error('Falha ao conectar com o servidor da API.'));
          return;
        }
        if (item) {
          resolve({ ...item });
        } else {
          reject(new Error('Item não encontrado.'));
        }
      }, 500);
    });
  },

  // Retorna ofertas para um item (GET /api/items/:id/offers)
  getOffersByItem: (itemId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (itemId === 'item-4') {
          reject(new Error('Erro na comunicação com a API.'));
          return;
        }
        const filtered = offersMock.filter(o => o.itemId === itemId);
        resolve(filtered.map(o => ({ ...o })));
      }, 700);
    });
  },

  // Aceita uma proposta (PATCH /api/offers/:id com status ACCEPTED)
  acceptOffer: (offerId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const offerIndex = offersMock.findIndex(o => o.id === offerId);
        if (offerIndex === -1) {
          reject(new Error('Proposta não encontrada.'));
          return;
        }

        const offer = offersMock[offerIndex];
        const itemIndex = itemsMock.findIndex(i => i.id === offer.itemId);
        if (itemIndex === -1) {
          reject(new Error('Item associado não encontrado.'));
          return;
        }

        if (itemsMock[itemIndex].status === 'RESERVED') {
          reject(new Error('Este item já está reservado com outra proposta.'));
          return;
        }

        offersMock = offersMock.map(o => {
          if (o.itemId === offer.itemId && o.id !== offerId && o.status === 'PENDING') {
            return { ...o, status: 'REJECTED' };
          }
          return o;
        });

        const newCollection = {
          id: `col-${Math.random().toString(36).substr(2, 9)}`,
          itemId: offer.itemId,
          offerId: offer.id,
          scheduledTime: offer.scheduledTime,
          status: 'SCHEDULED',
          confirmedByAnnouncer: false,
          confirmedByCollector: false
        };
        collectionsMock.push(newCollection);

        // Associa o ID da coleta no card de oferta aceito e no item reservado
        const acceptedOfferIndex = offersMock.findIndex(o => o.id === offerId);
        if (acceptedOfferIndex !== -1) {
          offersMock[acceptedOfferIndex].status = 'ACCEPTED';
          offersMock[acceptedOfferIndex].collectionId = newCollection.id;
        }
        itemsMock[itemIndex].status = 'RESERVED';
        itemsMock[itemIndex].collectionId = newCollection.id;

        resolve({
          message: 'Proposta aceita com sucesso. Coleta agendada.',
          offer: offersMock[acceptedOfferIndex],
          item: itemsMock[itemIndex],
          collection: newCollection
        });
      }, 800);
    });
  },

  // Recusa uma proposta (PATCH /api/offers/:id com status REJECTED)
  rejectOffer: (offerId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const offerIndex = offersMock.findIndex(o => o.id === offerId);
        if (offerIndex === -1) {
          reject(new Error('Proposta não encontrada.'));
          return;
        }

        offersMock[offerIndex].status = 'REJECTED';

        resolve({
          message: 'Proposta recusada com sucesso.',
          offer: offersMock[offerIndex]
        });
      }, 500);
    });
  },

  // Consulta agendamento de coleta associado a um item ou proposta
  getCollectionByItem: (itemId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const col = collectionsMock.find(c => c.itemId === itemId);
        resolve(col ? { ...col } : null);
      }, 400);
    });
  },

  // Consulta agendamento de coleta por ID
  getCollectionById: (collectionId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const col = collectionsMock.find(c => c.id === collectionId);
        if (col) {
          resolve({ ...col });
        } else {
          reject(new Error('Agendamento de coleta não encontrado.'));
        }
      }, 400);
    });
  },

  // Simula confirmação mútua de coleta (PATCH /api/collections/:id/confirm)
  confirmCollection: (collectionId, userType) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const colIndex = collectionsMock.findIndex(c => c.id === collectionId);
        if (colIndex === -1) {
          reject(new Error('Agendamento de coleta não encontrado.'));
          return;
        }

        const col = collectionsMock[colIndex];
        if (userType === 'announcer') {
          collectionsMock[colIndex].confirmedByAnnouncer = true;
        } else if (userType === 'collector') {
          collectionsMock[colIndex].confirmedByCollector = true;
        }

        if (collectionsMock[colIndex].confirmedByAnnouncer && collectionsMock[colIndex].confirmedByCollector) {
          collectionsMock[colIndex].status = 'COLLECTED';
          
          const itemIndex = itemsMock.findIndex(i => i.id === col.itemId);
          if (itemIndex !== -1) {
            itemsMock[itemIndex].status = 'COLLECTED';
          }
        }

        resolve({
          message: 'Coleta atualizada com sucesso.',
          collection: collectionsMock[colIndex]
        });
      }, 600);
    });
  },

  // Retorna o usuário atualmente logado (simulado, preparando para JWT)
  getCurrentUser: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: 'user-current', name: 'Doador Exemplo' });
      }, 100);
    });
  }
};
