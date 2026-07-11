export default function ErrorView({ message, onRetry }) {
  return (
    <div className="error-state-panel">
      <div className="error-state-box">
        <span className="error-state-icon">⚠️</span>
        <h3>Erro ao Carregar</h3>
        <p className="error-state-msg">{message}</p>
        <button 
          type="button" 
          onClick={onRetry} 
          className="btn-retry"
        >
          🔄 Tentar Novamente
        </button>
      </div>
    </div>
  );
}
