export default function OfferCard({ offer, isSelected, onSelect }) {
  if (!offer) return null;

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
        dateStyle: 'short',
        timeStyle: 'short'
      }).format(d);
    } catch {
      return offer.scheduledTime;
    }
  })();

  const statusLabelMap = {
    PENDING: 'Pendente',
    ACCEPTED: 'Aceita',
    REJECTED: 'Recusada'
  };

  const statusClassMap = {
    PENDING: 'status-pending',
    ACCEPTED: 'status-accepted',
    REJECTED: 'status-rejected'
  };

  return (
    <div 
      className={`offer-card ${isSelected ? 'active-card' : ''}`}
      onClick={() => onSelect(offer)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(offer);
        }
      }}
      aria-pressed={isSelected}
    >
      <div className="offer-card-top">
        {offer.buyerAvatar ? (
          <img 
            src={offer.buyerAvatar} 
            alt={`Avatar de ${offer.buyerName}`} 
            className="buyer-avatar-img"
          />
        ) : (
          <div className="buyer-avatar-fallback">
            {initials}
          </div>
        )}
        
        <div className="buyer-profile-info">
          <span className="buyer-profile-name">{offer.buyerName}</span>
          <span className="buyer-profile-score">★ {offer.buyerScore}</span>
        </div>
      </div>

      <div className="offer-card-body">
        <p className="offer-card-msg">"{offer.message}"</p>
        
        <div className="offer-card-metadata">
          <span className="offer-card-date">Agendamento: {formattedDate}</span>
          <span className="offer-card-price">
            {offer.price === 0 ? 'Grátis' : `R$ ${offer.price.toFixed(2)}`}
          </span>
        </div>
      </div>

      <div className="offer-card-footer">
        <span className={`offer-status-badge ${statusClassMap[offer.status]}`}>
          {statusLabelMap[offer.status]}
        </span>
      </div>
    </div>
  );
}
