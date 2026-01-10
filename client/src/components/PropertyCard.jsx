import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './PropertyCard.css'

function PropertyCard({ property, layout = 'horizontal' }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [showFullPhone, setShowFullPhone] = useState(false)

  // Kiểm tra xem property có trong danh sách yêu thích không
  useEffect(() => {
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]')
    const isPropertySaved = savedProperties.some(p => p._id === property._id || p.id === property.id)
    setIsFavorite(isPropertySaved)
  }, [property._id, property.id])

  // Xử lý khi nhấn nút yêu thích
  const handleFavoriteClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]')
    const propertyId = property._id || property.id
    
    if (isFavorite) {
      // Xóa khỏi danh sách yêu thích
      const updatedProperties = savedProperties.filter(p => 
        (p._id || p.id) !== propertyId
      )
      localStorage.setItem('savedProperties', JSON.stringify(updatedProperties))
      setIsFavorite(false)
    } else {
      // Thêm vào danh sách yêu thích
      savedProperties.push(property)
      localStorage.setItem('savedProperties', JSON.stringify(savedProperties))
      setIsFavorite(true)
    }
    
    // Trigger event để cập nhật Header
    window.dispatchEvent(new Event('savedPropertiesChanged'))
  }

  // Xử lý hiện số điện thoại
  const handlePhoneClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!showFullPhone) {
      setShowFullPhone(true)
    } else {
      const phone = property.agent?.phone || property.contactPhone || '0989734123'
      window.location.href = `tel:${phone}`
    }
  }

  // Format số điện thoại
  const formatPhoneDisplay = () => {
    const phone = property.agent?.phone || property.contactPhone || '0989734123'
    
    if (showFullPhone) {
      // Hiển thị đầy đủ: 0989 734 123
      return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
    }
    // Ẩn 3 số cuối: 0989 734 ***
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 ***')
  }

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
            <button 
              className={`btn-favorite ${isFavorite ? 'active' : ''}`} 
              onClick={handleFavoriteClick}
            >
              {isFavorite ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </Link>
    )
  }

  // Horizontal layout (default) - Dark theme like batdongsan.com.vn
  const galleryImages = property.gallery || [property.image, property.image]
  
  return (
    <Link to={`/property/${property._id || property.id}`} className="property-card">
      <div className="property-images-section">
        <div className="property-image-wrapper">
          {property.vip && (
            <span className="vip-badge">{property.vip}</span>
          )}
          <img src={property.image} alt={property.title} />
          <div className="image-badges">
            {property.hasVideo && (
              <span className="badge video-badge">▶ Video</span>
            )}
          </div>
        </div>
        <div className="property-gallery">
          <div className="gallery-item">
            <img src={galleryImages[0] || property.image} alt="" />
          </div>
          <div className="gallery-item">
            <img src={galleryImages[1] || property.image} alt="" />
            {property.images && (
              <span className="gallery-count">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                {property.images}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="property-info">
        <h3>{property.title}</h3>
        <div className="property-details">
          <span className="price">{formatPrice(property.price)}</span>
          <span className="sep">·</span>
          <span className="area">{property.area} m²</span>
          {property.pricePerSqm && (
            <>
              <span className="sep">·</span>
              <span className="price-per-sqm">{property.pricePerSqm} tr/m²</span>
            </>
          )}
          {property.bedrooms > 0 && (
            <>
              <span className="sep">·</span>
              <span className="rooms">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V7H1v10h22v-6c0-2.21-1.79-4-4-4z"/>
                </svg>
                {property.bedrooms}
              </span>
            </>
          )}
          {property.bathrooms > 0 && (
            <>
              <span className="sep">·</span>
              <span className="rooms">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 3c1.11 0 2 .89 2 2 0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2zm13 15c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1z"/>
                </svg>
                {property.bathrooms}
              </span>
            </>
          )}
          <span className="sep">·</span>
          <span className="location">
            {property.location}
          </span>
        </div>
        <p className="description">{property.description}</p>
        <div className="property-footer">
          {property.agent && (
            <div className="agent-info">
              <div className="agent-avatar">
                {property.agent.avatar ? (
                  <img src={property.agent.avatar} alt={property.agent.name} />
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                )}
              </div>
              <div className="agent-details">
                <span className="agent-name">{property.agent.name}</span>
                <span className="agent-status">{property.agent.status || 'Đăng hôm nay'}</span>
              </div>
            </div>
          )}
          {!property.agent && (
            <span className="post-time">Đăng hôm nay</span>
          )}
          <div className="card-actions">
            <button className="btn-contact" onClick={handlePhoneClick}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              {formatPhoneDisplay()} {showFullPhone ? '' : '- Hiện số'}
            </button>
            <button 
              className={`favorite-btn ${isFavorite ? 'active' : ''}`} 
              onClick={handleFavoriteClick}
            >
              {isFavorite ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PropertyCard
