import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import './AgentDetail.css'

function AgentDetail() {
  const { id } = useParams()
  const [agent, setAgent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('about')
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetchAgentDetail()
    fetchAgentProperties()
  }, [id])

  const fetchAgentDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/agents/${id}`)
      setAgent(response.data)
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error)
      // Mock data nếu API chưa có
      const agentData = mockAgents[id] || mockAgents[1]
      setAgent(agentData)
    } finally {
      setLoading(false)
    }
  }

  const fetchAgentProperties = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/properties?agentId=${id}`)
      setProperties(response.data)
    } catch (error) {
      console.error('Lỗi khi tải tin đăng:', error)
      // Mock properties for demo
      setProperties(mockProperties.filter(p => p.agentId === parseInt(id)))
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải thông tin...</p>
      </div>
    )
  }

  if (!agent) {
    return (
      <div className="error-container">
        <h2>Không tìm thấy thông tin</h2>
        <Link to="/directory" className="back-btn">Quay lại danh bạ</Link>
      </div>
    )
  }

  return (
    <div className="agent-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/directory">Danh bạ môi giới</Link>
          <span>/</span>
          <span>{agent.name}</span>
        </div>

        {/* Header Section */}
        <div className="agent-header">
          <div className="agent-header-content">
            <div className={agent.type === 'individual' ? 'agent-avatar' : 'agent-logo'}>
              <img 
                src={agent.type === 'individual' ? (agent.avatar || '/images/agents/default-avatar.jpg') : (agent.logo || '/images/agents/default-logo.png')} 
                alt={agent.name} 
              />
            </div>
            <div className="agent-header-info">
              <h1>{agent.name}</h1>
              {agent.verified && (
                <span className="verified-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                  </svg>
                  Đã xác thực
                </span>
              )}
              <p className="agent-address">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {agent.address}
              </p>
              <div className="agent-stats">
                <div className="stat-item">
                  <span className="stat-value">{agent.propertiesCount || 0}</span>
                  <span className="stat-label">Tin đăng</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{agent.yearsExperience || 0}</span>
                  <span className="stat-label">Năm kinh nghiệm</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{agent.rating || 4.5}</span>
                  <span className="stat-label">Đánh giá</span>
                </div>
              </div>
            </div>
          </div>
          <div className="agent-header-actions">
            <button className="btn-contact">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              {agent.phone}
            </button>
            <button className="btn-email">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              Gửi Email
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="agent-tabs">
          <button 
            className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
          >
            Giới thiệu
          </button>
          <button 
            className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            Tin đăng ({properties.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'areas' ? 'active' : ''}`}
            onClick={() => setActiveTab('areas')}
          >
            Khu vực hoạt động
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Đánh giá
          </button>
        </div>

        {/* Content */}
        <div className="agent-content">
          {activeTab === 'about' && (
            <div className="about-section">
              <div className="about-main">
                <div className="info-card">
                  <h2>Giới thiệu</h2>
                  <div className="description">
                    {agent.description || 'Chưa có thông tin giới thiệu'}
                  </div>
                </div>

                <div className="info-card">
                  <h2>Dịch vụ</h2>
                  <div className="services-grid">
                    {agent.services?.map((service, index) => (
                      <div key={index} className="service-item">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        {service}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="info-card">
                  <h2>Chuyên môn</h2>
                  <div className="specialties">
                    {agent.specialties?.map((specialty, index) => (
                      <span key={index} className="specialty-tag">{specialty}</span>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="about-sidebar">
                <div className="contact-card">
                  <h3>Thông tin liên hệ</h3>
                  <div className="contact-info">
                    <div className="contact-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                      </svg>
                      <div>
                        <span className="label">Điện thoại</span>
                        <span className="value">{agent.phone}</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <div>
                        <span className="label">Email</span>
                        <span className="value">{agent.email}</span>
                      </div>
                    </div>
                    <div className="contact-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <div>
                        <span className="label">Địa chỉ</span>
                        <span className="value">{agent.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {agent.website && (
                  <div className="website-card">
                    <a href={agent.website} target="_blank" rel="noopener noreferrer" className="btn-website">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                      Truy cập website
                    </a>
                  </div>
                )}
              </aside>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="properties-section">
              {properties.length > 0 ? (
                <div className="properties-grid">
                  {properties.map(property => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="no-data">
                  <p>Chưa có tin đăng nào</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'areas' && (
            <div className="areas-section">
              <h2>Khu vực hoạt động</h2>
              <div className="areas-list">
                {agent.areas?.map((area, index) => (
                  <div key={index} className="area-item">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    {area}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-section">
              <h2>Đánh giá từ khách hàng</h2>
              <div className="reviews-summary">
                <div className="rating-overview">
                  <div className="rating-score">{agent.rating || 4.5}</div>
                  <div className="rating-stars">
                    {'★'.repeat(Math.floor(agent.rating || 4.5))}
                    {'☆'.repeat(5 - Math.floor(agent.rating || 4.5))}
                  </div>
                  <div className="rating-count">({agent.reviewsCount || 0} đánh giá)</div>
                </div>
              </div>
              <div className="reviews-list">
                <p className="no-data">Chưa có đánh giá nào</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function PropertyCard({ property }) {
  return (
    <Link to={`/property/${property._id}`} className="property-card-small">
      <img src={property.image} alt={property.title} />
      <div className="property-info-small">
        <h4>{property.title}</h4>
        <p className="price">{property.priceText}</p>
        <p className="location">{property.location}</p>
      </div>
    </Link>
  )
}

// Mock properties data
const mockProperties = [
  {
    _id: '1',
    agentId: 1,
    title: 'Căn hộ cao cấp 3PN view sông Sài Gòn',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    priceText: '5.2 tỷ',
    location: 'Quận 2, Hồ Chí Minh'
  },
  {
    _id: '2',
    agentId: 1,
    title: 'Biệt thự đơn lập Thảo Điền 300m²',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    priceText: '28 tỷ',
    location: 'Quận 2, Hồ Chí Minh'
  },
  {
    _id: '3',
    agentId: 1,
    title: 'Nhà phố thương mại mặt tiền đường lớn',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    priceText: '12.5 tỷ',
    location: 'Tân Bình, Hồ Chí Minh'
  },
  {
    _id: '4',
    agentId: 2,
    title: 'Căn hộ 2PN Vinhomes Central Park',
    image: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
    priceText: '4.8 tỷ',
    location: 'Quận 7, Hồ Chí Minh'
  },
  {
    _id: '5',
    agentId: 2,
    title: 'Shophouse kinh doanh sầm uất',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    priceText: '15 tỷ',
    location: 'Quận 7, Hồ Chí Minh'
  }
]

// Mock data for all agents (companies and individuals)
const mockAgents = {
  // Companies (1-5)
  1: {
    id: 1,
    type: 'company',
    name: 'Công ty Cổ Phần Đầu Tư Và Phát Triển Bất Động Sản Victory',
    logo: '/images/companies/victory-real.png',
    address: 'Tòa nhà Mekong Tower, số 235-241 Cống Hòa, 13, Tân Bình, Hồ Chí Minh, Việt Nam',
    phone: '0989199898',
    email: 'contact@victory.com.vn',
    website: 'https://victory.com.vn',
    verified: true,
    propertiesCount: 156,
    yearsExperience: 10,
    rating: 4.8,
    reviewsCount: 234,
    description: 'Victory Real Estate là công ty hàng đầu trong lĩnh vực môi giới bất động sản tại TP.HCM với hơn 10 năm kinh nghiệm. Chúng tôi cam kết mang đến dịch vụ chuyên nghiệp, uy tín và hiệu quả cao nhất cho khách hàng.',
    services: [
      'Mua bán nhà đất',
      'Cho thuê bất động sản',
      'Tư vấn đầu tư',
      'Định giá bất động sản',
      'Quản lý tài sản',
      'Hỗ trợ pháp lý'
    ],
    specialties: [
      'Căn hộ cao cấp',
      'Biệt thự',
      'Nhà phố',
      'Đất nền dự án'
    ],
    areas: [
      'Bán nhà mặt phố ở Đà Lạt, Lâm Đồng',
      'Bán nhà mặt phố ở Quận 10, Hồ Chí Minh',
      'Bán nhà mặt phố ở Tân Phú, Hồ Chí Minh',
      'Bán đất ở Đà Lạt, Lâm Đồng',
      'Bán đất ở Phú Nhuận, Hồ Chí Minh'
    ]
  },
  2: {
    id: 2,
    type: 'company',
    name: 'Công ty TNHH Thương Mại Dịch Vụ Bất Động Sản Hoàng Quân',
    logo: '/images/companies/hoang-quan.png',
    address: '123 Nguyễn Văn Linh, Quận 7, Hồ Chí Minh, Việt Nam',
    phone: '0901234567',
    email: 'info@hoangquan.com.vn',
    website: 'https://hoangquan.com.vn',
    verified: true,
    propertiesCount: 89,
    yearsExperience: 8,
    rating: 4.6,
    reviewsCount: 156,
    description: 'Hoàng Quân Real Estate chuyên cung cấp dịch vụ môi giới bất động sản chuyên nghiệp tại khu vực phía Nam. Với đội ngũ tư vấn giàu kinh nghiệm, chúng tôi luôn đồng hành cùng khách hàng trong mọi giao dịch.',
    services: [
      'Mua bán căn hộ',
      'Cho thuê văn phòng',
      'Tư vấn đầu tư',
      'Định giá tài sản',
      'Hỗ trợ vay vốn',
      'Dịch vụ pháp lý'
    ],
    specialties: [
      'Căn hộ chung cư',
      'Văn phòng',
      'Shophouse',
      'Đất nền'
    ],
    areas: [
      'Bán căn hộ ở Quận 7, Hồ Chí Minh',
      'Bán căn hộ ở Bình Thạnh, Hồ Chí Minh',
      'Cho thuê văn phòng ở Quận 1, Hồ Chí Minh',
      'Bán đất ở Nhà Bè, Hồ Chí Minh',
      'Bán shophouse ở Quận 7, Hồ Chí Minh'
    ]
  },
  3: {
    id: 3,
    type: 'company',
    name: 'Công Ty TNHH tư vấn BDS Khang Điền Nam',
    logo: '/images/companies/khang-dien.png',
    address: '456 Võ Văn Kiệt, Quận 1, Hồ Chí Minh, Việt Nam',
    phone: '0912345678',
    email: 'info@khangdien.com.vn',
    website: 'https://www.khangdien.com.vn',
    verified: true,
    propertiesCount: 203,
    yearsExperience: 15,
    rating: 4.9,
    reviewsCount: 312,
    description: 'Phú Long là một trong những công ty bất động sản uy tín hàng đầu Việt Nam với 15 năm kinh nghiệm. Chúng tôi tự hào là đối tác tin cậy của hàng nghìn khách hàng trong và ngoài nước.',
    services: [
      'Phát triển dự án',
      'Mua bán BĐS cao cấp',
      'Cho thuê BĐS thương mại',
      'Tư vấn đầu tư chiến lược',
      'Quản lý vận hành',
      'Dịch vụ pháp lý toàn diện'
    ],
    specialties: [
      'Dự án cao cấp',
      'Biệt thự nghỉ dưỡng',
      'Condotel',
      'Khu đô thị'
    ],
    areas: [
      'Bán biệt thự ở Quận 2, Hồ Chí Minh',
      'Bán căn hộ ở Quận 1, Hồ Chí Minh',
      'Bán đất dự án ở Đồng Nai',
      'Bán condotel ở Vũng Tàu',
      'Bán biệt thự ở Đà Lạt, Lâm Đồng'
    ]
  },
  4: {
    id: 4,
    type: 'company',
    name: 'CÔNG TY CỔ PHẦN PHÚ THANH T&T',
    logo: '/images/companies/phu-thanh.png',
    address: '789 Xa Lộ Hà Nội, Quận 9, Hồ Chí Minh, Việt Nam',
    phone: '0923456789',
    email: 'info@namlong.com.vn',
    website: 'https://phuthanhtt.vn/gioi-thieu/',
    verified: true,
    propertiesCount: 134,
    yearsExperience: 12,
    rating: 4.7,
    reviewsCount: 198,
    description: 'Nam Long Group là nhà phát triển bất động sản chuyên nghiệp với nhiều dự án khu đô thị và nhà ở thành công. Chúng tôi cam kết mang đến không gian sống hiện đại, tiện nghi cho cộng đồng.',
    services: [
      'Phát triển khu đô thị',
      'Mua bán nhà đất',
      'Cho thuê căn hộ',
      'Tư vấn quy hoạch',
      'Quản lý dự án',
      'Hỗ trợ tài chính'
    ],
    specialties: [
      'Khu đô thị sinh thái',
      'Nhà phố liền kề',
      'Căn hộ gia đình',
      'Đất nền phân lô'
    ],
    areas: [
      'Bán nhà phố ở Quận 9, Hồ Chí Minh',
      'Bán đất nền ở Bình Dương',
      'Bán căn hộ ở Thủ Đức, Hồ Chí Minh',
      'Bán đất ở Long An',
      'Bán nhà phố ở Đồng Nai'
    ]
  },
  5: {
    id: 5,
    type: 'company',
    name: 'Công ty TNHH Đầu tư BDS Minh Nhật',
    logo: '/images/companies/minh-thanh.png',
    address: '321 Điện Biên Phủ, Quận 3, Hồ Chí Minh, Việt Nam',
    phone: '0934567890',
    email: 'contact@hungthinhcorp.com.vn',
    website: 'https://nhadatminhnhat.thuonghieuonline.vn',
    verified: true,
    propertiesCount: 278,
    yearsExperience: 18,
    rating: 4.8,
    reviewsCount: 445,
    description: 'Hưng Thịnh Corp là tập đoàn bất động sản hàng đầu với gần 20 năm kinh nghiệm phát triển các dự án lớn trên toàn quốc. Chúng tôi không ngừng sáng tạo để mang đến những sản phẩm chất lượng cao cho khách hàng.',
    services: [
      'Phát triển dự án lớn',
      'Mua bán BĐS cao cấp',
      'Cho thuê BĐS thương mại',
      'Tư vấn đầu tư tổng thể',
      'Quản lý tòa nhà',
      'Dịch vụ pháp lý chuyên sâu'
    ],
    specialties: [
      'Căn hộ cao tầng',
      'Biệt thự biển',
      'Khu phức hợp',
      'Trung tâm thương mại'
    ],
    areas: [
      'Bán căn hộ ở Quận 3, Hồ Chí Minh',
      'Bán biệt thự ở Nha Trang',
      'Bán căn hộ ở Quận 10, Hồ Chí Minh',
      'Bán đất ở Phan Thiết',
      'Bán shophouse ở Bình Dương'
    ]
  },
  
  // Individuals (101-106)
  101: {
    id: 101,
    type: 'individual',
    name: 'Phạm Công Tín',
    avatar: '/images/agents/pham-cong-tin.jpg',
    address: 'Lý Nam Đế, Lâm Viên, Đà Lạt, Lâm Đồng, Việt Nam',
    phone: '0966663009',
    email: 'phamcongtin@gmail.com',
    verified: true,
    propertiesCount: 45,
    yearsExperience: 7,
    rating: 4.7,
    reviewsCount: 89,
    description: 'Chuyên viên tư vấn bất động sản tại Đà Lạt với hơn 7 năm kinh nghiệm. Tôi cam kết mang đến dịch vụ tư vấn chuyên nghiệp, tận tâm và hiệu quả cao nhất cho khách hàng. Với kiến thức sâu rộng về thị trường BĐS Đà Lạt, tôi luôn sẵn sàng hỗ trợ quý khách tìm được bất động sản phù hợp nhất.',
    services: [
      'Tư vấn mua bán nhà đất',
      'Định giá bất động sản',
      'Hỗ trợ thủ tục pháp lý',
      'Tư vấn đầu tư',
      'Môi giới cho thuê',
      'Khảo sát thực địa'
    ],
    specialties: [
      'Nhà mặt phố',
      'Đất nền',
      'Biệt thự',
      'Nhà liền kề'
    ],
    areas: [
      'Bán nhà mặt phố ở Đà Lạt, Lâm Đồng',
      'Bán đất ở Đà Lạt, Lâm Đồng',
      'Bán nhà biệt thự, liền kề ở Đà Lạt, Lâm Đồng',
      'Cho thuê nhà mặt phố ở Đà Lạt, Lâm Đồng',
      'Bán đất nền dự án ở Đà Lạt, Lâm Đồng'
    ]
  },
  102: {
    id: 102,
    type: 'individual',
    name: 'Trương Hoàng Giang',
    avatar: '/images/agents/truong-hoang-giang.jpg',
    address: 'Nguyễn Từ Lực, Lâm Viên, Đà Lạt, Lâm Đồng, Việt Nam',
    phone: '0962182286',
    email: 'truonghoanggiang@gmail.com',
    verified: true,
    propertiesCount: 38,
    yearsExperience: 6,
    rating: 4.6,
    reviewsCount: 72,
    description: 'Môi giới bất động sản chuyên nghiệp tại Đà Lạt. Với kinh nghiệm 6 năm trong nghề, tôi tự hào đã giúp hàng trăm khách hàng tìm được ngôi nhà mơ ước. Tôi luôn đặt lợi ích của khách hàng lên hàng đầu và cam kết mang đến dịch vụ tốt nhất.',
    services: [
      'Mua bán nhà đất',
      'Cho thuê bất động sản',
      'Tư vấn đầu tư',
      'Định giá tài sản',
      'Hỗ trợ pháp lý',
      'Tư vấn phong thủy'
    ],
    specialties: [
      'Nhà mặt phố',
      'Biệt thự',
      'Nhà liền kề',
      'Căn hộ'
    ],
    areas: [
      'Bán nhà mặt phố ở Đà Lạt, Lâm Đồng',
      'Bán nhà biệt thự, liền kề ở Đà Lạt, Lâm Đồng',
      'Cho thuê nhà mặt phố ở Đà Lạt, Lâm Đồng',
      'Bán căn hộ chung cư ở Đà Lạt, Lâm Đồng',
      'Cho thuê căn hộ ở Đà Lạt, Lâm Đồng'
    ]
  },
  103: {
    id: 103,
    type: 'individual',
    name: 'Lương Quốc Anh',
    avatar: '/images/agents/luong-quoc-anh.jpg',
    address: 'Phan Chu Trinh, Lâm Viên, Đà Lạt, Lâm Đồng, Việt Nam',
    phone: '0916997297',
    email: 'luongquocanh@gmail.com',
    verified: true,
    propertiesCount: 52,
    yearsExperience: 8,
    rating: 4.8,
    reviewsCount: 105,
    description: 'Chuyên gia tư vấn bất động sản với 8 năm kinh nghiệm tại thị trường Đà Lạt. Tôi chuyên về các loại hình bất động sản cao cấp và có mạng lưới khách hàng rộng khắp. Phương châm làm việc của tôi là "Uy tín - Chất lượng - Hiệu quả".',
    services: [
      'Mua bán BĐS cao cấp',
      'Tư vấn đầu tư chiến lược',
      'Định giá chuyên nghiệp',
      'Hỗ trợ pháp lý toàn diện',
      'Quản lý tài sản',
      'Tư vấn quy hoạch'
    ],
    specialties: [
      'Nhà mặt phố',
      'Biệt thự cao cấp',
      'Nhà liền kề',
      'Đất nền dự án'
    ],
    areas: [
      'Bán nhà mặt phố ở Đà Lạt, Lâm Đồng',
      'Bán nhà biệt thự, liền kề ở Đà Lạt, Lâm Đồng',
      'Bán đất nền dự án ở Đà Lạt, Lâm Đồng',
      'Bán biệt thự nghỉ dưỡng ở Đà Lạt, Lâm Đồng'
    ]
  },
  104: {
    id: 104,
    type: 'individual',
    name: 'Lý Văn Thịnh',
    avatar: '/images/agents/ly-van-thinh.jpg',
    address: 'Thái Phiên, Lâm Viên, Đà Lạt, Lâm Đồng, Việt Nam',
    phone: '0908765432',
    email: 'lyvanthinh@gmail.com',
    verified: true,
    propertiesCount: 41,
    yearsExperience: 5,
    rating: 4.5,
    reviewsCount: 68,
    description: 'Môi giới bất động sản trẻ, năng động với 5 năm kinh nghiệm. Tôi chuyên về căn hộ chung cư và nhà mặt phố tại Đà Lạt. Với sự nhiệt tình và tận tâm, tôi luôn sẵn sàng tư vấn và hỗ trợ khách hàng 24/7.',
    services: [
      'Mua bán căn hộ',
      'Cho thuê căn hộ',
      'Tư vấn đầu tư',
      'Hỗ trợ vay vốn',
      'Định giá BĐS',
      'Hỗ trợ pháp lý'
    ],
    specialties: [
      'Căn hộ chung cư',
      'Nhà mặt phố',
      'Shophouse',
      'Officetel'
    ],
    areas: [
      'Bán nhà mặt phố ở Đà Lạt, Lâm Đồng',
      'Bán căn hộ chung cư ở Đà Lạt, Lâm Đồng',
      'Cho thuê căn hộ chung cư ở Đà Lạt, Lâm Đồng',
      'Bán shophouse ở Đà Lạt, Lâm Đồng'
    ]
  },
  105: {
    id: 105,
    type: 'individual',
    name: 'Trần Vĩ Nhân',
    avatar: '/images/agents/tran-vi-nhan.jpg',
    address: 'Hoàng Văn Thụ, Quận 1, Hồ Chí Minh, Việt Nam',
    phone: '0912345678',
    email: 'tranvinhan@gmail.com',
    verified: true,
    propertiesCount: 67,
    yearsExperience: 9,
    rating: 4.9,
    reviewsCount: 142,
    description: 'Chuyên gia bất động sản cao cấp tại trung tâm TP.HCM với gần 10 năm kinh nghiệm. Tôi chuyên về các dự án cao cấp, văn phòng hạng A và căn hộ penthouse. Với mạng lưới khách hàng VIP, tôi cam kết mang đến những cơ hội đầu tư tốt nhất.',
    services: [
      'Mua bán BĐS cao cấp',
      'Cho thuê văn phòng hạng A',
      'Tư vấn đầu tư VIP',
      'Quản lý tài sản',
      'Định giá chuyên sâu',
      'Dịch vụ pháp lý cao cấp'
    ],
    specialties: [
      'Căn hộ cao cấp',
      'Penthouse',
      'Văn phòng hạng A',
      'Shophouse'
    ],
    areas: [
      'Bán căn hộ chung cư ở Quận 1, Hồ Chí Minh',
      'Bán nhà riêng ở Quận 1, Hồ Chí Minh',
      'Cho thuê văn phòng ở Quận 1, Hồ Chí Minh',
      'Bán penthouse ở Quận 1, Hồ Chí Minh',
      'Bán shophouse ở Quận 1, Hồ Chí Minh'
    ]
  },
  106: {
    id: 106,
    type: 'individual',
    name: 'Trần Ngọc Mơ',
    avatar: '/images/agents/tran-ngoc-mo.jpg',
    address: 'Nguyễn Huệ, Quận 1, Hồ Chí Minh, Việt Nam',
    phone: '0987654321',
    email: 'tranngocmo@gmail.com',
    verified: true,
    propertiesCount: 55,
    yearsExperience: 7,
    rating: 4.7,
    reviewsCount: 98,
    description: 'Chuyên viên tư vấn bất động sản nữ với 7 năm kinh nghiệm tại TP.HCM. Tôi chuyên về căn hộ chung cư và shophouse tại các quận trung tâm. Với sự tỉ mỉ và chu đáo, tôi luôn đặt mình vào vị trí của khách hàng để tư vấn những lựa chọn tốt nhất.',
    services: [
      'Mua bán căn hộ',
      'Cho thuê căn hộ',
      'Tư vấn đầu tư',
      'Định giá BĐS',
      'Hỗ trợ pháp lý',
      'Tư vấn nội thất'
    ],
    specialties: [
      'Căn hộ chung cư',
      'Shophouse',
      'Nhà phố',
      'Studio'
    ],
    areas: [
      'Bán căn hộ chung cư ở Quận 1, Hồ Chí Minh',
      'Cho thuê căn hộ chung cư ở Quận 1, Hồ Chí Minh',
      'Bán shophouse ở Quận 1, Hồ Chí Minh',
      'Bán căn hộ ở Quận 3, Hồ Chí Minh',
      'Cho thuê studio ở Quận 1, Hồ Chí Minh'
    ]
  }
}

export default AgentDetail
