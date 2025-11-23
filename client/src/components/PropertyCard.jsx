import { Link } from 'react-router-dom'
import './PropertyCard.css'

function PropertyCard({ property, layout = 'horizontal' }) {
  const formatPrice = (price) => {
    if (price === 0 || property.priceText) {
      return property.priceText || 'Giá thỏa thuận'
    }
    
    if (property.pricePerMonth) {
      const million = price / 1000000
      return `${million.toFixed(0)} triệu/tháng`
    }
    
    const billion = price / 1000000000
    if (billion >= 1) {
      return `${billion.toFixed(1)} tỷ`
    }
    const million = price / 1000000
    return `${million.toFixed(0)} triệu`
  }

  if (layout === 'grid') {
    return (
      <Link to={`/property/${property._id || property.id}`} className="property-card-grid">
        <div className="property-image-container">
          <img src={property.image} alt={property.title} />
          {property.images && (
            <span className="images-badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              {property.images}
            </span>
          )}
          {property.verified && (
            <span className="verified-badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
              </svg>
              XÁC THỰC
            </span>
          )}
        </div>
        <div className="property-content">
          <h3 className="property-title">{property.title}</h3>
          <div className="property-price-info">
            <span className="price-value">{formatPrice(property.price)}</span>
            <span className="area-value">{property.area} m²</span>
          </div>
          <p className="property-location">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {property.location}
          </p>
          <div className="property-card-footer">
            <span className="post-date">Đăng hôm nay</span>
            <button className="btn-favorite" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
        </div>
      </Link>
    )
  }

  // Horizontal layout (default)
  return (
    <Link to={`/property/${property._id || property.id}`} className="property-card">
      <div className="property-image-wrapper">
        {property.vip && (
          <span className="vip-badge">{property.vip}</span>
        )}
        <img src={property.image} alt={property.title} />
        <div className="image-badges">
          {property.hasVideo && (
            <span className="badge video-badge">▶ Video</span>
          )}
          {property.images && (
            <span className="badge">📷 {property.images}</span>
          )}
        </div>
      </div>
      <div className="property-info">
        <div>
          <h3>{property.title}</h3>
          <div className="property-details">
            <span className="price">{formatPrice(property.price)}</span>
            <span className="area">{property.area} m²</span>
            {property.pricePerSqm && (
              <span className="price-per-sqm">{property.pricePerSqm} tr/m²</span>
            )}
            {property.bedrooms > 0 && (
              <span className="rooms">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V7H1v10h22v-6c0-2.21-1.79-4-4-4z"/>
                </svg>
                {property.bedrooms}
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="rooms">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 3c1.11 0 2 .89 2 2 0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2zm13 15c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1z"/>
                </svg>
                {property.bathrooms}
              </span>
            )}
          </div>
          <p className="location">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {property.location}
          </p>
          <p className="description">{property.description}</p>
        </div>
        <div className="property-footer">
          {property.agent && (
            <div className="agent-info">
              <div className="agent-avatar">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="agent-details">
                <span className="agent-name">{property.agent.name}</span>
                <span className="agent-status">{property.agent.status}</span>
              </div>
            </div>
          )}
          {!property.agent && (
            <span className="post-time">Đăng hôm nay</span>
          )}
          <div className="card-actions">
            <button className="btn-contact">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              0901 348 *** - Hiện số
            </button>
            <button className="favorite-btn" onClick={(e) => e.preventDefault()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PropertyCard
