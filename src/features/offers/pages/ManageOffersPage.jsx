import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { offerService } from '../services/offerService';
import ItemSummary from '../components/ItemSummary';
import OffersList from '../components/OffersList';
import OfferDetails from '../components/OfferDetails';
import AcceptModal from '../components/AcceptModal';
import ErrorView from '../components/ErrorView';
import { SkeletonItemSummary, SkeletonOfferCard } from '../components/OfferSkeletons';
import './ManageOffersPage.css';

export default function ManageOffersPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const triggerToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    const timer = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const loadItemData = useCallback(async (resetSelection = false) => {
    try {
      if (resetSelection) {
        setLoading(true);
        setSelectedOffer(null);
      }
      setError('');

      const user = await offerService.getCurrentUser();
      setCurrentUser(user);

      const itemData = await offerService.getItemById(itemId);
      setItem(itemData);

      const offersData = await offerService.getOffersByItem(itemId);
      setOffers(offersData);

      if (!resetSelection) {
        setSelectedOffer(prev => {
          if (!prev) return null;
          const updated = offersData.find(o => o.id === prev.id);
          return updated || null;
        });
      }
    } catch (err) {
      setError(err.message || 'Erro ao carregar dados do item. Por favor, verifique a conexão.');
    } finally {
      if (resetSelection) {
        setLoading(false);
      }
    }
  }, [itemId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadItemData(true);
  }, [loadItemData]);

  const handleAcceptOffer = useCallback(async (offer) => {
    try {
      setActionLoading(true);
      const res = await offerService.acceptOffer(offer.id);
      triggerToast(res.message, 'success');
      await loadItemData(false); // Recarrega os dados sem skeletons
    } catch (err) {
      triggerToast(err.message || 'Erro ao aceitar proposta.', 'error');
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [loadItemData, triggerToast]);

  const handleConfirmAccept = useCallback(async () => {
    if (!selectedOffer) return;
    try {
      await handleAcceptOffer(selectedOffer);
      setIsAcceptModalOpen(false); // Fecha o modal sob sucesso
    } catch {
      // Erro tratado no handleAcceptOffer
    }
  }, [selectedOffer, handleAcceptOffer]);

  const handleRejectOffer = useCallback(async (offer) => {
    try {
      setActionLoading(true);
      const res = await offerService.rejectOffer(offer.id);
      triggerToast(res.message, 'success');
      await loadItemData(false); // Recarrega os dados sem skeletons
    } catch (err) {
      triggerToast(err.message || 'Erro ao recusar proposta.', 'error');
    } finally {
      setActionLoading(false);
    }
  }, [loadItemData, triggerToast]);

  const handleGoToCollection = useCallback((collectionId) => {
    navigate(`/items/${itemId}/collections/${collectionId}`);
  }, [navigate, itemId]);

  if (loading) {
    return (
      <div className="manage-offers-container skeleton-loading-state">
        <header className="page-header">
          <div className="skeleton-line skeleton-page-title skeleton-shimmer"></div>
          <div className="skeleton-line skeleton-page-subtitle skeleton-shimmer"></div>
        </header>

        <SkeletonItemSummary />

        <div className="offers-grid-layout">
          <section className="offers-list-region">
            <div className="offers-list-container">
              <div className="skeleton-line skeleton-list-header skeleton-shimmer" style={{ width: '120px', height: '20px', marginBottom: '16px' }}></div>
              <div className="offers-cards-list">
                <SkeletonOfferCard />
                <SkeletonOfferCard />
                <SkeletonOfferCard />
              </div>
            </div>
          </section>

          <section className="offer-details-region">
            <div className="skeleton-details-placeholder skeleton-shimmer"></div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="manage-offers-container">
        <header className="page-header">
          <h1>Gerenciamento de Ofertas</h1>
        </header>
        <ErrorView message={error} onRetry={() => loadItemData(true)} />
      </div>
    );
  }

  return (
    <div className="manage-offers-container">
      {/* 1. Cabeçalho de controle */}
      <header className="page-header">
        <h1>Gerenciamento de Ofertas</h1>
        <p className="subtitle">
          Gerencie os lances recebidos e agendamentos para o item ID: <code className="item-id-code">{itemId}</code>
        </p>
      </header>

      {/* 2. Região de resumo do item selecionado (topo) */}
      {item && <ItemSummary item={item} offersCount={offers.length} />}

      {/* Grid Principal */}
      <div className={`offers-grid-layout ${selectedOffer ? 'has-selection' : ''}`}>
        {/* 3. Coluna de Propostas */}
        <section className="offers-list-region" aria-label="Coluna de propostas">
          <OffersList 
            offers={offers} 
            selectedOffer={selectedOffer} 
            onSelectOffer={setSelectedOffer} 
          />
        </section>

        {/* 4. Coluna de Detalhes */}
        <section className="offer-details-region" aria-label="Coluna de detalhes">
          <OfferDetails
            offer={selectedOffer}
            item={item}
            currentUser={currentUser}
            onAccept={() => setIsAcceptModalOpen(true)}
            onReject={handleRejectOffer}
            isActionLoading={actionLoading}
            onBackToList={() => setSelectedOffer(null)}
            onGoToCollection={handleGoToCollection}
          />
        </section>
      </div>

      {/* Modal de Confirmação */}
      <AcceptModal
        isOpen={isAcceptModalOpen}
        offer={selectedOffer}
        loading={actionLoading}
        onClose={() => setIsAcceptModalOpen(false)}
        onConfirm={handleConfirmAccept}
      />

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-notification-banner toast-${toast.type}`}>
          <span className="toast-icon">{toast.type === 'success' ? '✅' : '❌'}</span>
          <span className="toast-message">{toast.message}</span>
        </div>
      )}
    </div>
  );
}
