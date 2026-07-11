export default function ItemSummary({ item, offersCount }) {
  if (!item) return null;

  const statusLabelMap = {
    AVAILABLE: 'Disponível',
    NEGOTIATING: 'Em Negociação',
    RESERVED: 'Reservado',
    COLLECTED: 'Coletado'
  };

  return (
    <section className="item-detail-panel" aria-label="Resumo do item selecionado">
      {item.imageUrl && (
        <img 
          src={item.imageUrl} 
          alt={`Foto do item: ${item.title}`} 
          className="item-panel-img" 
        />
      )}
      
      <div className="item-panel-info">
        <div className="item-info-top">
          <div className="item-title-area">
            <span className={`badge ${item.status.toLowerCase()}`}>
              {statusLabelMap[item.status]}
            </span>
            <h2>{item.title}</h2>
            <p className="item-description">{item.description}</p>
          </div>
        </div>
        
        <div className="item-info-bottom">
          <span className="item-price">
            {item.price === 0 ? 'Grátis (Doação)' : `Preço Base: R$ ${item.price.toFixed(2)}`}
          </span>
          <span className="proposals-count">
            {offersCount} {offersCount === 1 ? 'proposta recebida' : 'propostas recebidas'}
          </span>
        </div>
      </div>
    </section>
  );
}
