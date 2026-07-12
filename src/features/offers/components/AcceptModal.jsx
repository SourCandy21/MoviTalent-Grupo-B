import { useEffect } from 'react';

export default function AcceptModal({ isOpen, offer, loading, onClose, onConfirm }) {
  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus management: Trap focus on open and restore on close
  useEffect(() => {
    if (isOpen) {
      const activeEl = document.activeElement;
      // Focus on the cancel button initially to prevent accidental confirmations
      const cancelBtn = document.getElementById('modal-cancel-btn');
      cancelBtn?.focus();
      
      return () => {
        if (activeEl && typeof activeEl.focus === 'function') {
          activeEl.focus();
        }
      };
    }
  }, [isOpen]);

  if (!isOpen || !offer) return null;

  const formattedDate = (() => {
    if (!offer.scheduledTime) return '';
    try {
      const d = new Date(offer.scheduledTime);
      return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'long',
        timeStyle: 'short'
      }).format(d);
    } catch {
      return offer.scheduledTime;
    }
  })();

  return (
    <div 
      className="modal-backdrop" 
      onClick={loading ? undefined : onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="modal-dialog-box" 
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id="modal-title">Confirmar Aceite de Proposta</h2>
        </header>

        <div className="modal-body">
          <p className="modal-intro">
            Você está prestes a aceitar a proposta de <strong>{offer.buyerName}</strong> para este item.
          </p>

          <div className="modal-offer-summary">
            <div className="summary-row">
              <span className="summary-label">Coletor:</span>
              <span className="summary-value">{offer.buyerName} (★ {offer.buyerScore})</span>
            </div>
            
            <div className="summary-row">
              <span className="summary-label">Valor Ofertado:</span>
              <span className="summary-value price-value">
                {offer.price === 0 ? 'Retirada gratuita' : `R$ ${offer.price.toFixed(2)}`}
              </span>
            </div>

            <div className="summary-row">
              <span className="summary-label">Data e Hora de Coleta:</span>
              <span className="summary-value">{formattedDate}</span>
            </div>

            {offer.message && (
              <div className="summary-row message-row">
                <span className="summary-label">Mensagem:</span>
                <p className="summary-msg">"{offer.message}"</p>
              </div>
            )}
          </div>

          <div className="modal-warning-alert">
            <span className="alert-icon">⚠️</span>
            <p className="alert-text">
              <strong>Importante:</strong> Ao confirmar o aceite desta proposta, todos os outros lances pendentes para este item serão cancelados e rejeitados automaticamente.
            </p>
          </div>
        </div>

        <footer className="modal-footer">
          <button
            type="button"
            id="modal-cancel-btn"
            onClick={onClose}
            className="btn-modal btn-modal-cancel"
            disabled={loading}
          >
            Cancelar
          </button>
          
          <button
            type="button"
            id="modal-confirm-btn"
            onClick={onConfirm}
            className="btn-modal btn-modal-confirm"
            disabled={loading}
          >
            {loading ? 'Confirmando...' : 'Confirmar e Reservar'}
          </button>
        </footer>
      </div>
    </div>
  );
}
