import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { offerService } from '../services/offerService';
import ItemSummary from '../components/ItemSummary';
import './CollectionDetailsPage.css';

// 1. Componente: CollectionStatusCard
function CollectionStatusCard({ status, confirmedByAnnouncer, confirmedByCollector }) {
  const getStatusLabel = () => {
    if (status === 'COLLECTED') return 'Finalizada';
    if (confirmedByAnnouncer && confirmedByCollector) return 'Finalizada';
    if (confirmedByAnnouncer) return 'Confirmada pelo doador';
    if (confirmedByCollector) return 'Confirmada pelo coletor';
    return 'Agendada';
  };

  const getStatusClass = () => {
    if (status === 'COLLECTED') return 'status-finalized';
    if (confirmedByAnnouncer || confirmedByCollector) return 'status-partial';
    return 'status-scheduled';
  };

  return (
    <div className="collection-card status-card">
      <h3>Status do Agendamento</h3>
      <div className={`status-badge-lg ${getStatusClass()}`}>
        {getStatusLabel()}
      </div>
      
      <div className="progress-steps-list">
        <div className={`step-item completed`}>
          <span className="step-check">✓</span>
          <span className="step-text">Negociação Concluída</span>
        </div>
        
        <div className={`step-item ${status === 'SCHEDULED' || status === 'COLLECTED' ? 'completed' : ''}`}>
          <span className="step-check">✓</span>
          <span className="step-text">Coleta Agendada</span>
        </div>

        <div className={`step-item ${confirmedByAnnouncer ? 'completed' : 'pending'}`}>
          <span className="step-check">{confirmedByAnnouncer ? '✓' : '○'}</span>
          <span className="step-text">Confirmação do Doador</span>
        </div>

        <div className={`step-item ${confirmedByCollector ? 'completed' : 'pending'}`}>
          <span className="step-check">{confirmedByCollector ? '✓' : '○'}</span>
          <span className="step-text">Confirmação do Coletor</span>
        </div>

        <div className={`step-item ${status === 'COLLECTED' ? 'completed' : 'pending'}`}>
          <span className="step-check">{status === 'COLLECTED' ? '✓' : '○'}</span>
          <span className="step-text">Coleta Finalizada</span>
        </div>
      </div>
    </div>
  );
}

// 2. Componente: CollectionParticipantsCard
function CollectionParticipantsCard({ offer, item }) {
  if (!offer || !item) return null;

  return (
    <div className="collection-card participants-card">
      <h3>Participantes & Local</h3>
      
      <div className="participants-grid">
        <div className="participant-block">
          <span className="participant-label">Doador (Você)</span>
          <span className="participant-name">Doador Exemplo</span>
          <span className="participant-role">Anunciante proprietário</span>
        </div>

        <div className="participant-block">
          <span className="participant-label">Coletor</span>
          <span className="participant-name">{offer.buyerName}</span>
          <span className="participant-score">★ Reputação: {offer.buyerScore}/100</span>
        </div>

        <div className="participant-block local-block">
          <span className="participant-label">Local de Retirada</span>
          <span className="participant-value">
            {item.location || 'Local combinado no chat de negociação'}
          </span>
        </div>
      </div>
    </div>
  );
}

// 3. Componente: CollectionActionsCard
function CollectionActionsCard({ 
  confirmedByAnnouncer, 
  confirmedByCollector, 
  status, 
  onConfirmAnnouncer, 
  onConfirmCollector, 
  loading 
}) {
  const isFinalized = status === 'COLLECTED';

  return (
    <div className="collection-card actions-card">
      <h3>Confirmar Entrega Física</h3>
      <p className="actions-instruction">
        Após a entrega física do item ao coletor, confirme a ação abaixo. A entrega mútua finaliza a negociação.
      </p>

      <div className="actions-button-row">
        <button
          type="button"
          onClick={onConfirmAnnouncer}
          className="btn-confirm-handoff announcer-btn"
          disabled={confirmedByAnnouncer || isFinalized || loading}
        >
          {loading ? 'Processando...' : confirmedByAnnouncer ? 'Entrega Confirmada' : 'Confirmar Entrega'}
        </button>

        {/* Simulador de Confirmação do Coletor (Dev/Demonstração) */}
        {!isFinalized && (
          <button
            type="button"
            onClick={onConfirmCollector}
            className="btn-confirm-handoff collector-sim-btn"
            disabled={confirmedByCollector || loading}
          >
            {confirmedByCollector ? 'Coletor Confirmou' : 'Simular Confirmação Coletor'}
          </button>
        )}
      </div>

      {isFinalized && (
        <div className="finalized-alert-banner">
          <span className="alert-icon">🎉</span>
          <p className="alert-text">
            <strong>Coleta concluída com sucesso!</strong> Os pontos de descarte ecológico foram distribuídos aos participantes.
          </p>
        </div>
      )}
    </div>
  );
}

// Componente Principal da Página
export default function CollectionDetailsPage() {
  const { itemId, collectionId } = useParams();
  const navigate = useNavigate();

  const [collection, setCollection] = useState(null);
  const [item, setItem] = useState(null);
  const [offer, setOffer] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const loadCollection = useCallback(async () => {
    try {
      setError('');
      const col = await offerService.getCollectionById(collectionId);
      setCollection(col);

      const itemData = await offerService.getItemById(col.itemId);
      setItem(itemData);

      const offersData = await offerService.getOffersByItem(col.itemId);
      const matchedOffer = offersData.find(o => o.id === col.offerId);
      setOffer(matchedOffer);
    } catch (err) {
      setError(err.message || 'Erro ao carregar dados do agendamento.');
    } finally {
      setLoading(false);
    }
  }, [collectionId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCollection();
  }, [loadCollection]);

  const handleConfirmAnnouncer = async () => {
    try {
      setActionLoading(true);
      const res = await offerService.confirmCollection(collectionId, 'announcer');
      triggerToast(res.message);
      await loadCollection();
    } catch (err) {
      triggerToast(err.message || 'Erro ao confirmar entrega.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmCollector = async () => {
    try {
      setActionLoading(true);
      const res = await offerService.confirmCollection(collectionId, 'collector');
      triggerToast(res.message);
      await loadCollection();
    } catch (err) {
      triggerToast(err.message || 'Erro ao confirmar coleta.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="collection-details-container loading-state">
        <p>Carregando dados da coleta física...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="collection-details-container">
        <div className="placeholder-box" style={{ borderColor: 'var(--color-alert)' }}>
          <span className="placeholder-icon">❌</span>
          <h3>Erro ao Carregar</h3>
          <p>{error}</p>
          <button 
            type="button" 
            onClick={() => navigate(`/items/${itemId}/offers`)} 
            className="btn-back-to-offers"
            style={{ marginTop: '16px' }}
          >
            Voltar para Ofertas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="collection-details-container">
      <header className="collection-header-section">
        <button
          type="button"
          onClick={() => navigate(`/items/${itemId}/offers`)}
          className="btn-back-to-offers"
        >
          ← Voltar para Ofertas
        </button>
        
        <h1>Acompanhamento da Coleta</h1>
        <p className="subtitle">
          Código do Agendamento: <code className="collection-id-code">{collectionId}</code>
        </p>
      </header>

      {/* Resumo do Item */}
      {item && <ItemSummary item={item} offersCount={0} hideStatusPill={false} />}

      <div className="collection-info-grid">
        {/* Painel Esquerdo: Status Card */}
        {collection && (
          <CollectionStatusCard 
            status={collection.status}
            confirmedByAnnouncer={collection.confirmedByAnnouncer}
            confirmedByCollector={collection.confirmedByCollector}
          />
        )}

        {/* Painel Direito: Participantes & Ações */}
        <div className="collection-right-column">
          <CollectionParticipantsCard 
            offer={offer} 
            item={item} 
          />
          
          {collection && (
            <CollectionActionsCard 
              confirmedByAnnouncer={collection.confirmedByAnnouncer}
              confirmedByCollector={collection.confirmedByCollector}
              status={collection.status}
              onConfirmAnnouncer={handleConfirmAnnouncer}
              onConfirmCollector={handleConfirmCollector}
              loading={actionLoading}
            />
          )}
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="toast-notification-banner">
          <span className="toast-icon">✅</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
