export default function OfferDetails({ offer, item, currentUser, onAccept, onReject, isActionLoading, onBackToList }) {
  if (!offer) {
    return (
      <div className="placeholder-box">
        <span className="placeholder-icon">🔍</span>
        <h3>Nenhuma proposta selecionada</h3>
        <p className="details-instruction">
          Selecione uma proposta para visualizar os dados do coletor, a mensagem enviada e o horário sugerido para a coleta.
        </p>
      </div>
    );
  }

  const initials = (() => {
    if (!offer.buyerName) return '?';
    const parts = offer.buyerName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  })();

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

  const decision = (() => {
    if (!item || !currentUser) {
      return { disabled: true, reason: '' };
    }

    // 1. Validação de Autoria
    const isOwner = item.ownerId === currentUser.id;
    if (!isOwner) {
      return {
        disabled: true,
        reason: 'Apenas o proprietário deste anúncio pode tomar decisões sobre as propostas.'
      };
    }

    // 2. Bloqueios de Estado do Item ou Proposta
    if (item.status === 'COLLECTED') {
      return {
        disabled: true,
        reason: 'O item já foi coletado e a negociação está encerrada.'
      };
    }

    if (item.status === 'RESERVED') {
      if (offer.status === 'ACCEPTED') {
        return {
          disabled: true,
          reason: 'Esta proposta já foi aceita por você.'
        };
      }
      return {
        disabled: true,
        reason: 'O item já está reservado para outra proposta.'
      };
    }

    if (offer.status === 'REJECTED') {
      return {
        disabled: true,
        reason: 'Esta proposta foi recusada.'
      };
    }

    return { disabled: false, reason: '' };
  })();

  return (
    <div className="offer-details-panel">
      <button 
        type="button" 
        onClick={onBackToList} 
        className="btn-back-to-list"
      >
        ← Voltar para propostas
      </button>

      <div className="details-header">
        <h3>Detalhes da Proposta</h3>
      </div>

      {/* Perfil do Interessado */}
      <div className="details-profile-card">
        {offer.buyerAvatar ? (
          <img 
            src={offer.buyerAvatar} 
            alt={`Foto de ${offer.buyerName}`} 
            className="details-avatar-img"
          />
        ) : (
          <div className="details-avatar-fallback">
            {initials}
          </div>
        )}
        <div className="details-profile-info">
          <h4>{offer.buyerName}</h4>
          <span className="details-score">★ Reputação: {offer.buyerScore}/100</span>
        </div>
      </div>

      {/* Dados do Lance */}
      <div className="details-meta-list">
        <div className="details-meta-item">
          <span className="meta-label">Valor Ofertado</span>
          <span className="meta-value price-highlight">
            {offer.price === 0 ? 'Retirada gratuita' : `R$ ${offer.price.toFixed(2)}`}
          </span>
        </div>
        
        <div className="details-meta-item">
          <span className="meta-label">Horário Sugerido</span>
          <span className="meta-value">{formattedDate}</span>
        </div>
      </div>

      {/* Mensagem */}
      <div className="details-message-block">
        <span className="meta-label">Mensagem do Coletor</span>
        <p className="details-msg-text">"{offer.message}"</p>
      </div>

      {/* Mensagem explicativa de bloqueio se houver */}
      {decision.reason && (
        <div className="details-warning-banner">
          <span className="warning-icon">ℹ️</span>
          <p className="warning-text">{decision.reason}</p>
        </div>
      )}

      {/* Botões de Ação */}
      <div className="details-action-buttons">
        <button
          type="button"
          onClick={() => onReject(offer)}
          className="btn-action btn-reject"
          disabled={decision.disabled || isActionLoading}
        >
          {isActionLoading ? 'Processando...' : 'Recusar Proposta'}
        </button>

        <button
          type="button"
          onClick={() => onAccept(offer)}
          className="btn-action btn-accept"
          disabled={decision.disabled || isActionLoading}
        >
          {isActionLoading ? 'Processando...' : 'Aceitar Proposta'}
        </button>
      </div>
    </div>
  );
}
