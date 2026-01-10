import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './PropertyDetail.css'

function PropertyDetail() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)
  const [showFullPhone, setShowFullPhone] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [savingProperty, setSavingProperty] = useState(false)

  useEffect(() => {
    fetchProperty()
    checkIfSaved()
  }, [id])

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/properties/${id}`)
      setProperty(response.data)
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkIfSaved = async () => {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const savedProperties = response.data.savedProperties || []
      setIsSaved(savedProperties.some(p => p._id === id || p === id))
    } catch (error) {
      console.error('Lỗi khi kiểm tra tin đã lưu:', error)
    }
  }

  const handleSaveProperty = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Vui lòng đăng nhập để lưu tin')
      window.location.href = '/login'
      return
    }

    setSavingProperty(true)
    try {
      const response = await axios.post(
        `http://localhost:5000/api/properties/${id}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (response.data.success) {
        setIsSaved(!isSaved)
        alert(isSaved ? 'Đã bỏ lưu tin' : 'Đã lưu tin thành công')
      }
    } catch (error) {
      console.error('Lỗi khi lưu tin:', error)
      alert('Không thể lưu tin. Vui lòng thử lại.')
    } finally {
      setSavingProperty(false)
    }
  }

  const handleShowPhone = () => {
    setShowFullPhone(true)
  }

  const handleCallPhone = (phone) => {
    window.location.href = `tel:${phone}`
  }

  const handleZaloChat = (phone) => {
    // Remove all non-digit characters
    const cleanPhone = phone.replace(/\D/g, '')
    window.open(`https://zalo.me/${cleanPhone}`, '_blank')
  }

  const formatPhoneDisplay = (phone) => {
    if (!phone) return '0965 082 ***'
    if (showFullPhone) {
      // Format: 0965 082 123
      return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
    }
    // Hide last 3 digits
    return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 ***')
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải thông tin bất động sản...</p>
      </div>
    )
  }
  
  if (!property) {
    return (
      <div className="error-container">
        <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '64px', height: '64px', opacity: 0.3}}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <h2>Không tìm thấy bất động sản</h2>
        <p>Bất động sản này có thể đã bị xóa hoặc không tồn tại</p>
        <a href="/nha-dat-ban" className="back-btn">Quay lại danh sách</a>
      </div>
    )
  }

  const formatPrice = (price) => {
    if (price === 0 || property.priceText) {
      return property.priceText || 'Giá thỏa thuận'
    }
    
    if (property.pricePerMonth) {
      const million = price / 1000000
      return `${million.toLocaleString('vi-VN')} triệu/tháng`
    }
    
    const billion = price / 1000000000
    if (billion >= 1) {
      return `${billion.toFixed(1)} tỷ`
    }
    const million = price / 1000000
    return `${million.toLocaleString('vi-VN')} triệu`
  }

  return (
    <div className="property-detail">
      <div className="container">
        <div className="breadcrumb">
          <a href="/">Trang chủ</a>
          <span>/</span>
          <a href="/nha-dat-ban">Nhà đất bán</a>
          <span>/</span>
          <span>{property.title}</span>
        </div>

        <div className="detail-layout">
          <div className="detail-main">
            <div className="image-gallery">
              <div className="main-image-container" onClick={() => setShowGallery(true)}>
                <img 
                  src={property.imageList && property.imageList.length > 0 ? property.imageList[0] : property.image} 
                  alt={property.title} 
                  className="main-image" 
                />
                {property.verified && (
                  <div className="verified-badge-large">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                    </svg>
                    TIN XÁC THỰC
                  </div>
                )}
                {property.imageList && property.imageList.length > 1 && (
                  <div className="image-count">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                    </svg>
                    {property.imageList.length} ảnh
                  </div>
                )}
              </div>

              {property.imageList && property.imageList.length > 1 && (
                <div className="thumbnail-grid">
                  {property.imageList.slice(0, 5).map((img, index) => (
                    <div 
                      key={index} 
                      className="thumbnail-item"
                      onClick={() => {
                        setCurrentImageIndex(index)
                        setShowGallery(true)
                      }}
                    >
                      <img src={img} alt={`${property.title} - ${index + 1}`} />
                      {index === 4 && property.imageList.length > 5 && (
                        <div className="more-images">
                          +{property.imageList.length - 5}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Image Gallery Modal */}
            {showGallery && property.imageList && (
              <div className="gallery-modal" onClick={() => setShowGallery(false)}>
                <button className="gallery-close" onClick={() => setShowGallery(false)}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>

                <div className="gallery-content" onClick={(e) => e.stopPropagation()}>
                  <div className="gallery-main">
                    <button 
                      className="gallery-nav gallery-prev"
                      onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : property.imageList.length - 1)}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </button>

                    <img 
                      src={property.imageList[currentImageIndex]} 
                      alt={`${property.title} - ${currentImageIndex + 1}`}
                      className="gallery-image"
                    />

                    <button 
                      className="gallery-nav gallery-next"
                      onClick={() => setCurrentImageIndex(prev => prev < property.imageList.length - 1 ? prev + 1 : 0)}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </button>

                    <div className="gallery-counter">
                      {currentImageIndex + 1} / {property.imageList.length}
                    </div>
                  </div>

                  <div className="gallery-thumbnails">
                    {property.imageList.map((img, index) => (
                      <div 
                        key={index}
                        className={`gallery-thumb ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <img src={img} alt={`Thumbnail ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="detail-info">
              <h1 className="detail-title">{property.title}</h1>
              
              <div className="detail-meta">
                <span className="detail-location">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {property.location}
                </span>
                <div className="detail-stats">
                  {property.views > 0 && (
                    <span className="stat-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      {property.views.toLocaleString('vi-VN')}
                    </span>
                  )}
                  {property.favorites > 0 && (
                    <span className="stat-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      {property.favorites}
                    </span>
                  )}
                  <span className="detail-date">Đăng hôm nay</span>
                </div>
              </div>

              <div className="price-section">
                <div className="main-price">{formatPrice(property.price)}</div>
                {property.pricePerSqm && (
                  <div className="price-per-sqm">{property.pricePerSqm} triệu/m²</div>
                )}
              </div>

              <div className="specs-grid">
                <div className="spec-box">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                  </svg>
                  <div>
                    <div className="spec-label">Diện tích</div>
                    <div className="spec-value">{property.area} m²</div>
                  </div>
                </div>
                
                {property.bedrooms > 0 && (
                  <div className="spec-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V7H1v10h22v-6c0-2.21-1.79-4-4-4z"/>
                    </svg>
                    <div>
                      <div className="spec-label">Phòng ngủ</div>
                      <div className="spec-value">{property.bedrooms} phòng</div>
                    </div>
                  </div>
                )}
                
                {property.bathrooms > 0 && (
                  <div className="spec-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 3c1.11 0 2 .89 2 2 0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2zm13 15c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1z"/>
                    </svg>
                    <div>
                      <div className="spec-label">Phòng tắm</div>
                      <div className="spec-value">{property.bathrooms} phòng</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Thông tin chi tiết */}
              <div className="detail-section">
                <h2>Thông tin chi tiết</h2>
                <div className="detail-grid">
                  <div className="detail-row">
                    <span className="detail-label">Loại hình:</span>
                    <span className="detail-value">
                      {property.propertyType === 'apartment' && 'Căn hộ/Chung cư'}
                      {property.propertyType === 'house' && 'Nhà riêng'}
                      {property.propertyType === 'villa' && 'Biệt thự'}
                      {property.propertyType === 'land' && 'Đất nền'}
                      {property.propertyType === 'townhouse' && 'Nhà phố'}
                      {property.propertyType === 'office' && 'Văn phòng'}
                      {property.propertyType === 'shophouse' && 'Shop house'}
                      {!property.propertyType && 'Chưa xác định'}
                    </span>
                  </div>
                  
                  {property.floors > 0 && (
                    <div className="detail-row">
                      <span className="detail-label">Số tầng:</span>
                      <span className="detail-value">{property.floors} tầng</span>
                    </div>
                  )}
                  
                  {property.width && property.length && (
                    <div className="detail-row">
                      <span className="detail-label">Kích thước:</span>
                      <span className="detail-value">{property.width}m x {property.length}m</span>
                    </div>
                  )}
                  
                  {property.direction && (
                    <div className="detail-row">
                      <span className="detail-label">Hướng nhà:</span>
                      <span className="detail-value">
                        {property.direction === 'east' && 'Đông'}
                        {property.direction === 'west' && 'Tây'}
                        {property.direction === 'south' && 'Nam'}
                        {property.direction === 'north' && 'Bắc'}
                        {property.direction === 'northeast' && 'Đông Bắc'}
                        {property.direction === 'northwest' && 'Tây Bắc'}
                        {property.direction === 'southeast' && 'Đông Nam'}
                        {property.direction === 'southwest' && 'Tây Nam'}
                      </span>
                    </div>
                  )}
                  
                  {property.balconyDirection && (
                    <div className="detail-row">
                      <span className="detail-label">Hướng ban công:</span>
                      <span className="detail-value">
                        {property.balconyDirection === 'east' && 'Đông'}
                        {property.balconyDirection === 'west' && 'Tây'}
                        {property.balconyDirection === 'south' && 'Nam'}
                        {property.balconyDirection === 'north' && 'Bắc'}
                        {property.balconyDirection === 'northeast' && 'Đông Bắc'}
                        {property.balconyDirection === 'northwest' && 'Tây Bắc'}
                        {property.balconyDirection === 'southeast' && 'Đông Nam'}
                        {property.balconyDirection === 'southwest' && 'Tây Nam'}
                      </span>
                    </div>
                  )}
                  
                  {property.legalDocument && (
                    <div className="detail-row">
                      <span className="detail-label">Pháp lý:</span>
                      <span className="detail-value">
                        {property.legalDocument === 'red-book' && 'Sổ đỏ/Sổ hồng'}
                        {property.legalDocument === 'pink-book' && 'Sổ hồng riêng'}
                        {property.legalDocument === 'sale-contract' && 'Hợp đồng mua bán'}
                        {property.legalDocument === 'waiting' && 'Đang chờ sổ'}
                        {property.legalDocument === 'other' && 'Khác'}
                      </span>
                    </div>
                  )}
                  
                  {property.furniture && (
                    <div className="detail-row">
                      <span className="detail-label">Nội thất:</span>
                      <span className="detail-value">
                        {property.furniture === 'full' && 'Đầy đủ'}
                        {property.furniture === 'basic' && 'Cơ bản'}
                        {property.furniture === 'empty' && 'Bàn giao thô'}
                      </span>
                    </div>
                  )}
                  
                  {property.yearBuilt && (
                    <div className="detail-row">
                      <span className="detail-label">Năm xây dựng:</span>
                      <span className="detail-value">{property.yearBuilt}</span>
                    </div>
                  )}
                  
                  {property.roadWidth && (
                    <div className="detail-row">
                      <span className="detail-label">Đường vào:</span>
                      <span className="detail-value">{property.roadWidth}m</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Đặc điểm bất động sản */}
              {property.features && property.features.length > 0 && (
                <div className="features-section">
                  <h2>Đặc điểm bất động sản</h2>
                  <div className="features-list">
                    {property.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tiện ích */}
              {property.amenities && property.amenities.length > 0 && (
                <div className="amenities-section">
                  <h2>Tiện ích</h2>
                  <div className="amenities-grid">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="amenity-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Thông tin dự án */}
              {property.project && property.project.name && (
                <div className="project-section">
                  <h2>Thông tin dự án</h2>
                  <div className="project-info">
                    <div className="project-row">
                      <span className="project-label">Tên dự án:</span>
                      <span className="project-value">{property.project.name}</span>
                    </div>
                    {property.project.developer && (
                      <div className="project-row">
                        <span className="project-label">Chủ đầu tư:</span>
                        <span className="project-value">{property.project.developer}</span>
                      </div>
                    )}
                    {property.project.handoverYear && (
                      <div className="project-row">
                        <span className="project-label">Năm bàn giao:</span>
                        <span className="project-value">{property.project.handoverYear}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Mô tả chi tiết */}
              {property.description && (
                <div className="description-section">
                  <h2>Mô tả chi tiết</h2>
                  <div className="description-content">
                    {property.description.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Địa chỉ chi tiết */}
              {property.address && property.address.fullAddress && (
                <div className="address-section">
                  <h2>Địa chỉ</h2>
                  <div className="address-info">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <div>
                      <p className="address-full">{property.address.fullAddress}</p>
                      {property.address.ward && property.address.district && (
                        <p className="address-detail">
                          {property.address.ward}, {property.address.district}, {property.address.city}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Xem trên bản đồ */}
              {property.coordinates && property.coordinates.lat && property.coordinates.lng && (
                <div className="map-section">
                  <h2>Xem trên bản đồ</h2>
                  <div className="map-info">
                    <div className="map-coordinates">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <div>
                        <p className="coordinates-text">
                          {property.coordinates.lat.toFixed(6)}°N {property.coordinates.lng.toFixed(6)}°E
                        </p>
                        <a 
                          href={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="view-larger-map"
                        >
                          Xem bản đồ lớn hơn
                        </a>
                      </div>
                    </div>
                    <div className="map-container">
                      <iframe
                        title="Property Location"
                        width="100%"
                        height="400"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${property.coordinates.lat},${property.coordinates.lng}&zoom=16`}
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="detail-sidebar">
            <div className="contact-card">
              {property.agent ? (
                <div className="agent-profile">
                  <div className="agent-avatar-circle">
                    <img 
                      src={property.agent.avatar || '/images/agents/default-avatar.jpg'} 
                      alt={property.agent.name}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextElementSibling.style.display = 'flex'
                      }}
                    />
                    <div className="agent-avatar-fallback">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="agent-name-large">{property.agent.name}</h3>
                </div>
              ) : (
                <div className="agent-profile">
                  <div className="agent-avatar-circle">
                    <div className="agent-avatar-fallback" style={{display: 'flex'}}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="agent-name-large">Nguyễn Thành Nam</h3>
                </div>
              )}
              
              <button 
                className="btn-zalo"
                onClick={() => handleZaloChat(property.agent?.phone || property.contactPhone || '0965082123')}
              >
                <img 
                  src="/images/logo/zalo-icon.png" 
                  alt="Zalo" 
                  style={{width: '28px', height: '28px'}}
                />
                Chat qua Zalo
              </button>
              
              <button 
                className="btn-call-teal"
                onClick={() => {
                  if (showFullPhone) {
                    handleCallPhone(property.agent?.phone || property.contactPhone || '0965082123')
                  } else {
                    handleShowPhone()
                  }
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                </svg>
                {formatPhoneDisplay(property.agent?.phone || property.contactPhone || '0965082123')} {showFullPhone ? '' : '- Hiện số'}
              </button>
              
              <button 
                className={`btn-favorite-detail ${isSaved ? 'saved' : ''}`}
                onClick={handleSaveProperty}
                disabled={savingProperty}
              >
                <svg viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {savingProperty ? 'Đang xử lý...' : (isSaved ? 'Đã lưu tin' : 'Lưu tin')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
