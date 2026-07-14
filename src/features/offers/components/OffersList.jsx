import { useState, useMemo } from 'react';
import OfferCard from './OfferCard';

export default function OffersList({ offers, selectedOffer, onSelectOffer }) {
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, PENDING, ACCEPTED, REJECTED
  const [sortBy, setSortBy] = useState('SCORE_DESC'); // SCORE_DESC, PRICE_DESC, PRICE_ASC, TIME_ASC

  // Lógica de Filtragem e Ordenação
  const processedOffers = useMemo(() => {
    let result = [...offers];

    // 1. Filtragem por Status
    if (statusFilter !== 'ALL') {
      result = result.filter(o => o.status === statusFilter);
    }

    // 2. Ordenação
    result.sort((a, b) => {
      if (sortBy === 'PRICE_DESC') {
        return b.price - a.price;
      }
      if (sortBy === 'PRICE_ASC') {
        return a.price - b.price;
      }
      if (sortBy === 'TIME_ASC') {
        return new Date(a.scheduledTime) - new Date(b.scheduledTime);
      }
      if (sortBy === 'SCORE_DESC') {
        return b.buyerScore - a.buyerScore;
      }
      return 0;
    });

    return result;
  }, [offers, statusFilter, sortBy]);

  return (
    <div className="offers-list-container">
      {/* Controles de Ordenação e Filtros */}
      <div className="list-controls">
        <div className="sort-control">
          <label htmlFor="sort-select">Ordenar por:</label>
          <select 
            id="sort-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="form-select-sm"
          >
            <option value="SCORE_DESC">Score do Coletor</option>
            <option value="PRICE_DESC">Melhor Valor</option>
            <option value="PRICE_ASC">Menor Valor</option>
            <option value="TIME_ASC">Horário mais próximo</option>
          </select>
        </div>

        <div className="filter-control">
          <button 
            type="button" 
            className={`filter-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
            onClick={() => setStatusFilter('ALL')}
          >
            Todos
          </button>
          <button 
            type="button" 
            className={`filter-btn ${statusFilter === 'PENDING' ? 'active' : ''}`}
            onClick={() => setStatusFilter('PENDING')}
          >
            Pendentes
          </button>
          <button 
            type="button" 
            className={`filter-btn ${statusFilter === 'ACCEPTED' ? 'active' : ''}`}
            onClick={() => setStatusFilter('ACCEPTED')}
          >
            Aceitos
          </button>
          <button 
            type="button" 
            className={`filter-btn ${statusFilter === 'REJECTED' ? 'active' : ''}`}
            onClick={() => setStatusFilter('REJECTED')}
          >
            Recusados
          </button>
        </div>
      </div>

      {/* Listagem */}
      {processedOffers.length === 0 ? (
        <div className="placeholder-box empty-offers-box">
          <span className="placeholder-icon">📭</span>
          <h3>Nenhuma proposta encontrada</h3>
          <p>Selecione outro filtro ou aguarde até que novos interessados enviem propostas para este item.</p>
        </div>
      ) : (
        <div className="offers-cards-list">
          {processedOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              isSelected={selectedOffer?.id === offer.id}
              onSelect={onSelectOffer}
            />
          ))}
        </div>
      )}
    </div>
  );
}
