export function SkeletonItemSummary() {
  return (
    <div className="skeleton-item-summary skeleton-shimmer">
      <div className="skeleton-image"></div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-description"></div>
        <div className="skeleton-row">
          <div className="skeleton-badge"></div>
          <div className="skeleton-badge"></div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonOfferCard() {
  return (
    <div className="skeleton-offer-card skeleton-shimmer">
      <div className="skeleton-header">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-profile">
          <div className="skeleton-line skeleton-name"></div>
          <div className="skeleton-line skeleton-score"></div>
        </div>
      </div>
      <div className="skeleton-body">
        <div className="skeleton-line skeleton-msg-1"></div>
        <div className="skeleton-line skeleton-msg-2"></div>
        <div className="skeleton-meta">
          <div className="skeleton-line skeleton-date"></div>
          <div className="skeleton-line skeleton-price"></div>
        </div>
      </div>
      <div className="skeleton-footer">
        <div className="skeleton-badge"></div>
      </div>
    </div>
  );
}
