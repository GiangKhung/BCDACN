import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SavedProperties.css';

function SavedProperties() {
  const navigate = useNavigate();
  const [savedProperties, setSavedProperties] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedProperties();
    
    // Lắng nghe sự kiện storage để cập nhật khi có thay đổi
    const handleStorageChange = () => {
      fetchSavedProperties();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Danh sách nhà môi giới
  const agents = [
    {
      name: 'Phạm Công Tín',
      avatar: '/images/agents/pham-cong-tin.jpg',
      phone: '0966663009',
      address: 'Lý Nam Đế, Lâm Viên, Đà Lạt, Lâm Đồng'
    },
    {
      name: 'Trương Hoàng Giang',
      avatar: '/images/agents/truong-hoang-giang.jpg',
      phone: '0962182286',
      address: 'Nguyễn Từ Lực, Lâm Viên, Đà Lạt, Lâm Đồng'
    },
    {
      name: 'Lương Quốc Anh',
      avatar: '/images/agents/luong-quoc-anh.jpg',
      phone: '0916997297',
      address: 'Phan Chu Trinh, Lâm Viên, Đà Lạt, Lâm Đồng'
    },
    {
      name: 'Lý Văn Thịnh',
      avatar: '/images/agents/ly-van-thinh.jpg',
      phone: '0908765432',
      address: 'Thái Phiên, Lâm Viên, Đà Lạt, Lâm Đồng'
    },
    {
      name: 'Trần Vĩ Nhân',
      avatar: '/images/agents/tran-vi-nhan.jpg',
      phone: '0912345678',
      address: 'Hoàng Văn Thụ, Quận 1, Hồ Chí Minh'
    },
    {
      name: 'Trần Ngọc Mơ',
      avatar: '/images/agents/tran-ngoc-mo.jpg',
      phone: '0987654321',
      address: 'Nguyễn Huệ, Quận 1, Hồ Chí Minh'
    }
  ];

  const fetchSavedProperties = () => {
    try {
      // Lấy dữ liệu từ localStorage
      const saved = JSON.parse(localStorage.getItem('savedProperties') || '[]');
      
      // Thêm savedDate nếu chưa có
      const propertiesWithDate = saved.map((prop, index) => {
        // Chọn agent ngẫu nhiên hoặc theo index
        const agent = agents[index % agents.length];
        
        return {
          ...prop,
          savedDate: prop.savedDate || new Date().toISOString(),
          // Đảm bảo có images array
          images: prop.gallery || [prop.image],
          // Sử dụng agent info từ danh sách
          agent: prop.agent || {
            name: agent.name,
            status: 'Đăng hôm nay',
            phone: agent.phone,
            avatar: agent.avatar
          }
        };
      });
      
      setSavedProperties(propertiesWithDate);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching saved properties:', error);
      setLoading(false);
    }
  };

  const handleRemoveSaved = (propertyId) => {
    // Xóa khỏi state
    const updated = savedProperties.filter(p => (p._id || p.id) !== propertyId);
    setSavedProperties(updated);
    
    // Xóa khỏi localStorage
    localStorage.setItem('savedProperties', JSON.stringify(updated));
    
    // Trigger event để cập nhật Header
    window.dispatchEvent(new Event('savedPropertiesChanged'));
  };

  const handleContactAgent = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const sortedProperties = [...savedProperties].sort((a, b) => {
    switch(sortBy) {
      case 'newest':
        return new Date(b.savedDate) - new Date(a.savedDate);
      case 'oldest':
        return new Date(a.savedDate) - new Date(b.savedDate);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
      case 'price-low':
        return parseFloat(a.price) - parseFloat(b.price);
      default:
        return 0;
    }
  });

  if (loading) {
    return <div className="saved-loading">Đang tải...</div>;
  }

  return (
    <div className="saved-properties-page">
      <div className="saved-container">
        {/* Header */}
        <div className="saved-header">
          <div className="saved-header-left">
            <h1>Tin đăng đã lưu</h1>
            <p className="saved-count">Tổng số {savedProperties.length} tin đăng</p>
          </div>
          
          <div className="saved-header-right">
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Lưu mới nhất</option>
              <option value="oldest">Lưu cũ nhất</option>
              <option value="price-high">Giá cao nhất</option>
              <option value="price-low">Giá thấp nhất</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="saved-content">
          {/* Properties List */}
          <div className="saved-properties-list">
            {savedProperties.length === 0 ? (
              <div className="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="empty-icon">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <h3>Chưa có tin đăng nào được lưu</h3>
                <p>Hãy lưu các tin đăng yêu thích để xem lại sau</p>
                <button 
                  className="browse-btn"
                  onClick={() => navigate('/for-sale')}
                >
                  Khám phá tin đăng
                </button>
              </div>
            ) : (
              sortedProperties.map(property => (
                <PropertyCard 
                  key={property._id || property.id}
                  property={property}
                  onRemove={handleRemoveSaved}
                  onContact={handleContactAgent}
                  onViewDetail={() => navigate(`/property/${property._id || property.id}`)}
                />
              ))
            )}
          </div>

          {/* Sidebar */}
          <aside className="saved-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">Hỗ trợ tiện ích</h3>
              <ul className="support-list">
                <li>Tư vấn phong thủy</li>
                <li>Dự tính chi phí làm nhà</li>
                <li>Tính lãi suất</li>
                <li>Quy trình xây nhà</li>
                <li>Xem tuổi làm nhà</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ property, onRemove, onContact, onViewDetail }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    if (price === 0 || property.priceText) {
      return property.priceText || 'Giá thỏa thuận';
    }
    
    if (property.pricePerMonth) {
      const million = price / 1000000;
      return `${million.toFixed(0)} triệu/tháng`;
    }
    
    const billion = price / 1000000000;
    if (billion >= 1) {
      return `${billion.toFixed(1)} tỷ`;
    }
    const million = price / 1000000;
    return `${million.toFixed(0)} triệu`;
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="saved-property-card">
      {/* Images Gallery */}
      <div className="property-images" onClick={onViewDetail}>
        {property.badge && (
          <div className="property-badge">{property.badge}</div>
        )}
        
        <button 
          className="remove-saved-btn"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(property._id || property.id);
          }}
          title="Bỏ lưu"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>

        <div className="main-image">
          <img src={property.images[currentImageIndex]} alt={property.title} />
          
          {property.images.length > 1 && (
            <>
              <button className="image-nav prev" onClick={prevImage}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              <button className="image-nav next" onClick={nextImage}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </>
          )}
        </div>

        <div className="image-thumbnails">
          {property.images.slice(0, 4).map((img, index) => (
            <div 
              key={index}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImageIndex(index);
              }}
            >
              <img src={img} alt={`Thumbnail ${index + 1}`} />
              {index === 3 && property.images.length > 4 && (
                <div className="more-images">+{property.images.length - 4}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Property Info */}
      <div className="property-info">
        <h3 className="property-title" onClick={onViewDetail}>
          {property.title}
        </h3>

        <div className="property-price-area">
          <span className="price">{formatPrice(property.price)}</span>
          <span className="area">{property.area} m²</span>
          {property.pricePerSqm && <span className="price-per-m2">{property.pricePerSqm} tr/m²</span>}
        </div>

        <div className="property-features">
          {property.bedrooms > 0 && (
            <span className="feature">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V7H1v10h22v-6c0-2.21-1.79-4-4-4z"/>
              </svg>
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="feature">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 3c1.11 0 2 .89 2 2 0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2zm13 15c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v1z"/>
              </svg>
              {property.bathrooms}
            </span>
          )}
          <span className="location">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {property.location}
          </span>
        </div>

        <p className="property-description">{property.description}</p>

        {/* Agent Info */}
        <div className="agent-info">
          <div className="agent-left">
            <img src={property.agent.avatar} alt={property.agent.name} className="agent-avatar" />
            <div className="agent-details">
              <div className="agent-name">{property.agent.name}</div>
              <div className="agent-status">{property.agent.status}</div>
            </div>
          </div>
          
          <button 
            className="contact-btn"
            onClick={() => onContact(property.agent.phone)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            {property.agent.phone} • Hiện số
          </button>
        </div>
      </div>
    </div>
  );
}

export default SavedProperties;
