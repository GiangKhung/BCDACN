import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './MyProperties.css'

function MyProperties() {
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Kiểm tra đăng nhập
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      alert('Vui lòng đăng nhập để xem tin đăng của bạn!')
      navigate('/login')
      return
    }

    setUser(JSON.parse(userData))
    fetchMyProperties()
  }, [navigate])

  const fetchMyProperties = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/properties')
      const data = await response.json()
      
      // Lọc các tin đăng của user hiện tại (dựa vào email)
      const userData = JSON.parse(localStorage.getItem('user'))
      const myProps = data.filter(prop => 
        prop.agent && prop.agent.email === userData.email
      )
      
      setProperties(myProps)
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa tin đăng này?')) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        alert('Xóa tin đăng thành công!')
        fetchMyProperties()
      } else {
        alert('Có lỗi xảy ra khi xóa tin đăng')
      }
    } catch (error) {
      console.error('Error deleting property:', error)
      alert('Không thể kết nối đến server')
    }
  }

  const formatPrice = (price) => {
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(1)} tỷ`
    } else if (price >= 1000000) {
      return `${(price / 1000000).toFixed(0)} triệu`
    }
    return `${price.toLocaleString()} đ`
  }

  const getPropertyTypeLabel = (type) => {
    const types = {
      apartment: 'Căn hộ',
      house: 'Nhà riêng',
      villa: 'Biệt thự',
      townhouse: 'Nhà phố',
      land: 'Đất nền',
      office: 'Văn phòng',
      shophouse: 'Shophouse',
      other: 'Khác'
    }
    return types[type] || type
  }

  if (loading) {
    return (
      <div className="my-properties-page">
        <div className="container">
          <div className="loading">Đang tải...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-properties-page">
      <div className="container">
        <div className="page-header">
          <div>
            <h1>Tin đăng của tôi</h1>
            <p>Quản lý các tin đăng bất động sản của bạn</p>
          </div>
          <Link to="/post-property" className="btn-post-new">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Đăng tin mới
          </Link>
        </div>

        {properties.length === 0 ? (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <h3>Chưa có tin đăng nào</h3>
            <p>Bắt đầu đăng tin để rao bán hoặc cho thuê bất động sản của bạn</p>
            <Link to="/post-property" className="btn-start">
              Đăng tin ngay
            </Link>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map(property => (
              <div key={property._id} className="property-item">
                <div className="property-image">
                  <img src={property.image} alt={property.title} />
                  <div className="property-badges">
                    {property.verified && (
                      <span className="badge badge-verified">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Đã xác thực
                      </span>
                    )}
                    <span className={`badge badge-status badge-${property.status}`}>
                      {property.status === 'available' && 'Đang hiển thị'}
                      {property.status === 'pending' && 'Chờ duyệt'}
                      {property.status === 'sold' && 'Đã bán'}
                      {property.status === 'rented' && 'Đã cho thuê'}
                    </span>
                  </div>
                </div>

                <div className="property-content">
                  <h3>{property.title}</h3>
                  
                  <div className="property-info">
                    <div className="info-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>{property.location}</span>
                    </div>
                    
                    <div className="info-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                      </svg>
                      <span>{getPropertyTypeLabel(property.propertyType)}</span>
                    </div>
                  </div>

                  <div className="property-details">
                    <span className="detail-item">
                      <strong>{property.area}</strong> m²
                    </span>
                    {property.bedrooms > 0 && (
                      <span className="detail-item">
                        <strong>{property.bedrooms}</strong> PN
                      </span>
                    )}
                    {property.bathrooms > 0 && (
                      <span className="detail-item">
                        <strong>{property.bathrooms}</strong> WC
                      </span>
                    )}
                  </div>

                  <div className="property-price">
                    {formatPrice(property.price)}
                    {property.pricePerMonth && <span className="price-unit">/tháng</span>}
                  </div>

                  <div className="property-stats">
                    <div className="stat-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      <span>{property.views || 0} lượt xem</span>
                    </div>
                    <div className="stat-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>{property.favorites || 0} lượt thích</span>
                    </div>
                  </div>

                  <div className="property-actions">
                    <Link to={`/property/${property._id}`} className="btn-view">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                      </svg>
                      Xem chi tiết
                    </Link>
                    <button className="btn-delete" onClick={() => handleDelete(property._id)}>
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyProperties
