import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Directory.css'

function Directory() {
  const [companies, setCompanies] = useState([])
  const [individuals, setIndividuals] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({
    serviceType: '',
    propertyType: '',
    city: '',
    district: '',
    project: ''
  })
  const [activeTab, setActiveTab] = useState('company')
  const [allCompanies, setAllCompanies] = useState([])
  const [allIndividuals, setAllIndividuals] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [searchQuery, filters, allCompanies, allIndividuals])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/directory')
      setAllCompanies(response.data.companies || mockCompanies)
      setAllIndividuals(response.data.individuals || mockIndividuals)
      setCompanies(response.data.companies || mockCompanies)
      setIndividuals(response.data.individuals || mockIndividuals)
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error)
      setAllCompanies(mockCompanies)
      setAllIndividuals(mockIndividuals)
      setCompanies(mockCompanies)
      setIndividuals(mockIndividuals)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filteredCompanies = [...allCompanies]
    let filteredIndividuals = [...allIndividuals]

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filteredCompanies = filteredCompanies.filter(company =>
        company.name?.toLowerCase().includes(query) ||
        company.address?.toLowerCase().includes(query) ||
        company.areas?.some(area => area.toLowerCase().includes(query))
      )
      filteredIndividuals = filteredIndividuals.filter(individual =>
        individual.name?.toLowerCase().includes(query) ||
        individual.address?.toLowerCase().includes(query) ||
        individual.areas?.some(area => area.toLowerCase().includes(query))
      )
    }

    // Lọc theo loại giao dịch
    if (filters.serviceType) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.serviceType === filters.serviceType || company.serviceType === 'both'
      )
      filteredIndividuals = filteredIndividuals.filter(individual =>
        individual.serviceType === filters.serviceType || individual.serviceType === 'both'
      )
    }

    // Lọc theo loại nhà đất
    if (filters.propertyType) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.propertyTypes?.includes(filters.propertyType)
      )
      filteredIndividuals = filteredIndividuals.filter(individual =>
        individual.propertyTypes?.includes(filters.propertyType)
      )
    }

    // Lọc theo thành phố
    if (filters.city) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.city === filters.city ||
        company.address?.toLowerCase().includes(filters.city)
      )
      filteredIndividuals = filteredIndividuals.filter(individual =>
        individual.city === filters.city ||
        individual.address?.toLowerCase().includes(filters.city)
      )
    }

    // Lọc theo quận/huyện
    if (filters.district) {
      filteredCompanies = filteredCompanies.filter(company =>
        company.district === filters.district ||
        company.address?.toLowerCase().includes(filters.district.toLowerCase())
      )
      filteredIndividuals = filteredIndividuals.filter(individual =>
        individual.district === filters.district ||
        individual.address?.toLowerCase().includes(filters.district.toLowerCase())
      )
    }

    setCompanies(filteredCompanies)
    setIndividuals(filteredIndividuals)
  }

  const handleSearch = () => {
    applyFilters()
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const resetFilters = () => {
    setSearchQuery('')
    setFilters({
      serviceType: '',
      propertyType: '',
      city: '',
      district: '',
      project: ''
    })
    setCompanies(allCompanies)
    setIndividuals(allIndividuals)
  }

  const categories = {
    sale: [
      { label: 'Bán đất nền dự án (2161)', value: 2161 },
      { label: 'Bán nhà riêng (1573)', value: 1573 },
      { label: 'Bán trang trại, khu nghỉ dưỡng (88)', value: 88 },
      { label: 'Bán kho, nhà xưởng (76)', value: 76 },
      { label: 'Bán loại bất động sản khác (105)', value: 105 },
      { label: 'Bán nhà mặt phố (1346)', value: 1346 },
      { label: 'Bán đất (1940)', value: 1940 },
      { label: 'Bán căn hộ chung cư (2908)', value: 2908 },
      { label: 'Bán nhà biệt thự, liền kề (1101)', value: 1101 },
      { label: 'Bán condotel (10)', value: 10 },
      { label: 'Bán shophouse, nhà phố thương mại (57)', value: 57 }
    ],
    rent: [
      { label: 'Cho thuê căn hộ chung cư (528)', value: 528 },
      { label: 'Cho thuê văn phòng (190)', value: 190 },
      { label: 'Cho thuê nhà mặt phố (217)', value: 217 },
      { label: 'Cho thuê nhà riêng (218)', value: 218 },
      { label: 'Cho thuê kho, nhà xưởng, đất (63)', value: 63 },
      { label: 'Cho thuê, sang nhượng cửa hàng, ki ốt (33)', value: 33 },
      { label: 'Cho thuê loại bất động sản khác (23)', value: 23 },
      { label: 'Cho thuê nhà trọ, phòng trọ (47)', value: 47 },
      { label: 'Cho thuê shophouse, nhà phố (15)', value: 15 }
    ]
  }

  return (
    <div className="directory-page">
      <div className="container">
        {/* Header */}
        <div className="directory-header">
          <h1 className="directory-title">TÌM KIẾM MÔI GIỚI</h1>
        </div>

        {/* Search & Filters */}
        <div className="search-filter-section">
          <div className="search-bar-directory">
            <input
              type="text"
              placeholder="Nhập từ khóa tìm kiếm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="btn-search-directory" onClick={handleSearch}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          </div>

          <div className="filters-row">
            <select 
              className="filter-select-directory"
              value={filters.serviceType}
              onChange={(e) => handleFilterChange('serviceType', e.target.value)}
            >
              <option value="">Loại giao dịch</option>
              <option value="sale">Bán</option>
              <option value="rent">Cho thuê</option>
              <option value="both">Cả hai</option>
            </select>

            <select 
              className="filter-select-directory"
              value={filters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            >
              <option value="">Loại nhà đất</option>
              <option value="apartment">Căn hộ chung cư</option>
              <option value="house">Nhà riêng</option>
              <option value="land">Đất nền</option>
              <option value="villa">Biệt thự</option>
            </select>

            <select 
              className="filter-select-directory"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
            >
              <option value="">Tỉnh/Thành phố</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">Hồ Chí Minh</option>
              <option value="danang">Đà Nẵng</option>
            </select>

            <select 
              className="filter-select-directory"
              value={filters.district}
              onChange={(e) => handleFilterChange('district', e.target.value)}
            >
              <option value="">Quận/Huyện</option>
            </select>

            <select 
              className="filter-select-directory"
              value={filters.project}
              onChange={(e) => handleFilterChange('project', e.target.value)}
            >
              <option value="">Dự án</option>
            </select>

            <button className="btn-search-red" onClick={handleSearch}>
              Tìm kiếm
            </button>
            <button className="btn-reset-filter" onClick={resetFilters} title="Xóa bộ lọc">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="directory-content">
          {/* Main Content */}
          <div className="directory-main">
            <div className="directory-tabs">
              <button 
                className={`tab-button ${activeTab === 'company' ? 'active' : ''}`}
                onClick={() => setActiveTab('company')}
              >
                Công ty môi giới
              </button>
              <button 
                className={`tab-button ${activeTab === 'individual' ? 'active' : ''}`}
                onClick={() => setActiveTab('individual')}
              >
                Cá nhân môi giới
              </button>
            </div>

            <h2 className="section-title">
              Danh bạ nhà môi giới
              {!loading && (
                <span className="results-count">
                  ({activeTab === 'company' ? companies.length : individuals.length} kết quả)
                </span>
              )}
            </h2>

            {loading ? (
              <div className="loading">
                <div className="spinner"></div>
                <p>Đang tải dữ liệu...</p>
              </div>
            ) : (
              <>
                {activeTab === 'company' ? (
                  companies.length > 0 ? (
                    <div className="companies-list">
                      {companies.map(company => (
                        <CompanyCard key={company.id} company={company} />
                      ))}
                    </div>
                  ) : (
                    <div className="no-results">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      <h3>Không tìm thấy công ty môi giới phù hợp</h3>
                      <p>Vui lòng thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
                      <button className="btn-reset" onClick={resetFilters}>Xóa bộ lọc</button>
                    </div>
                  )
                ) : (
                  individuals.length > 0 ? (
                    <div className="individuals-list">
                      {individuals.map(individual => (
                        <IndividualCard key={individual.id} individual={individual} />
                      ))}
                    </div>
                  ) : (
                    <div className="no-results">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      <h3>Không tìm thấy cá nhân môi giới phù hợp</h3>
                      <p>Vui lòng thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
                      <button className="btn-reset" onClick={resetFilters}>Xóa bộ lọc</button>
                    </div>
                  )
                )}

                {/* Pagination */}
                <div className="pagination">
                  <button className="page-btn" disabled>‹ Trước</button>
                  <button className="page-btn active">1</button>
                  <button className="page-btn">2</button>
                  <button className="page-btn">3</button>
                  <span className="page-dots">...</span>
                  <button className="page-btn">10</button>
                  <button className="page-btn">Sau ›</button>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="directory-sidebar">
            {/* Email Subscription */}
            <div className="sidebar-widget email-widget">
              <div className="widget-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <h3>Nhận bản tin từ Batdongsan.com.vn</h3>
              <div className="email-form">
                <input type="email" placeholder="Nhập email" />
                <button className="btn-subscribe">Đăng ký</button>
              </div>
            </div>

            {/* Categories */}
            <div className="sidebar-widget">
              <h3>THEO LOẠI BDS</h3>
              
              <div className="category-section">
                <h4>Nhà đất bán (6083)</h4>
                <ul className="category-list">
                  {categories.sale.map((cat, index) => (
                    <li key={index}>
                      <Link to={`/directory/category/${cat.value}`}>
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="category-section">
                <h4>Nhà đất cho thuê (1032)</h4>
                <ul className="category-list">
                  {categories.rent.map((cat, index) => (
                    <li key={index}>
                      <Link to={`/directory/category/${cat.value}`}>
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function CompanyCard({ company }) {
  return (
    <div className="company-card">
      <Link to={`/agent/${company.id}`} className="company-logo">
        <img src={company.logo} alt={company.name} />
      </Link>
      <div className="company-info">
        <Link to={`/agent/${company.id}`} className="company-name-link">
          <h3>{company.name}</h3>
        </Link>
        <div className="company-details">
          <div className="detail-item">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>{company.address}</span>
          </div>
          {company.phone && (
            <div className="detail-item">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              <span>{company.phone}</span>
            </div>
          )}
        </div>
        <button className="btn-send-email">Gửi Email</button>
      </div>
      <div className="company-services">
        <h4>KHU VỰC CÔNG TY MÔI GIỚI</h4>
        <ul className="services-list">
          {company.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function IndividualCard({ individual }) {
  return (
    <div className="individual-card">
      <Link to={`/agent/${individual.id}`} className="individual-avatar">
        <img src={individual.avatar} alt={individual.name} />
      </Link>
      <div className="individual-info">
        <Link to={`/agent/${individual.id}`} className="individual-name-link">
          <h3>{individual.name}</h3>
        </Link>
        <div className="individual-details">
          <div className="detail-item">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>{individual.address}</span>
          </div>
          <div className="detail-item">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
            <span>{individual.phone}</span>
          </div>
        </div>
        <button className="btn-send-email">Gửi Email</button>
      </div>
      <div className="individual-services">
        <h4>KHU VỰC CÁ NHÂN MÔI GIỚI</h4>
        <ul className="services-list">
          {individual.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Mock data
const mockCompanies = [
  {
    id: 1,
    name: 'Công ty Cổ Phần Đầu Tư Và Phát Triển Bất Động Sản Victory',
    logo: '/images/companies/victory-real.png', // Thay bằng logo của bạn
    address: 'Tòa nhà Mekong Tower, số 235-241 Cộng Hòa, 13, Tân Bình, Hồ Chí Minh, Việt Nam',
    phone: '0989199898',
    services: [
      'Bán nhà mặt phố ở Đà Lạt, Lâm Đồng',
      'Bán nhà mặt phố ở Quận 10, Hồ Chí Minh',
      'Bán nhà mặt phố ở Tân Phú, Hồ Chí Minh',
      'Bán đất ở Đà Lạt, Lâm Đồng',
      'Bán đất ở Phú Nhuận, Hồ Chí Minh'
    ]
  },
  {
    id: 2,
    name: 'Công ty Cổ phần Đầu tư Địa ốc Hoàng Quân',
    logo: '/images/companies/hoang-quan.png', // Thay bằng logo của bạn
    address: '123 Nguyễn Văn Linh, Quận 7, Hồ Chí Minh, Việt Nam',
    phone: '0908123456',
    services: [
      'Bán căn hộ chung cư ở Quận 7, Hồ Chí Minh',
      'Bán biệt thự ở Quận 7, Hồ Chí Minh',
      'Bán đất nền dự án ở Bình Chánh',
      'Cho thuê căn hộ chung cư ở Quận 7'
    
    ]
  },
  {
    id: 3,
    name: 'Công Ty TNHH tư vấn BDS Khang Điền Nam',
    logo: '/images/companies/khang-dien.png', // Thay bằng logo của bạn
    address: '56 đường Số 12, KDC Cityland, 10, Gò Vấp, Hồ Chí Minh, Việt Nam',
    phone: '0901777703',
    services: [
      'Bán nhà riêng ở Quận 1, Hồ Chí Minh',
      'Bán nhà riêng ở Quận 2, Hồ Chí Minh',
      'Bán nhà riêng ở Quận 3, Hồ Chí Minh',
      'Bán nhà riêng ở Quận 4, Hồ Chí Minh',
      'Bán nhà riêng ở Quận 5, Hồ Chí Minh'
    ]
  },
  {
    id: 4,
    name: 'CÔNG TY CỔ PHẦN PHÚ THANH T&T',
    logo: '/images/companies/phu-thanh.png', // Thay bằng logo của bạn
    address: 'Lô biệt thự 28 số 35, Lê Văn Thiêm, Thanh Xuân, Hà Nội, Việt Nam',
    phone: '0989423259',
    services: [
      'Bán căn hộ chung cư ở Đống Đa, Hà Nội',
      'Bán căn hộ chung cư ở Thanh Xuân, Hà Nội',
      'Bán căn hộ chung cư ở Cầu Giấy, Hà Nội',
      'Bán căn hộ chung cư ở Nam Từ Liêm, Hà Nội',
      'Bán căn hộ chung cư ở Hà Đông, Hà Nội'
    ]
  },
  {
    id: 5,
    name: 'Công ty TNHH Đầu tư BDS Minh Nhật',
    logo: '/images/companies/minh-thanh.png', // Thay bằng logo của bạn
    address: '456 Lê Văn Việt, Quận 9, Hồ Chí Minh, Việt Nam',
    phone: '0912345678',
    services: [
      'Bán nhà phố thương mại ở Quận 9',
      'Bán đất nền dự án ở Thủ Đức',
      'Bán căn hộ chung cư ở Quận 9',
      'Cho thuê shophouse ở Quận 9'
    ]
  }
]

// Mock data for individuals
const mockIndividuals = [
  {
    id: 101,
    name: 'Phạm Công Tín',
    avatar: '/images/agents/pham-cong-tin.jpg', // Thay bằng ảnh của bạn
    address: 'Lý Nam Đế, Lâm Viên, Đà Lạt, Lâm Đồng, Việt Nam',
    phone: '0966663009',
    services: [
      'Bán nhà mặt phố ở Đà Lạt, Lâm Đồng',
      'Bán đất ở Đà Lạt, Lâm Đồng',
      'Bán nhà biệt thự, liền kề ở Đà Lạt, Lâm Đồng'
    ]
  },
  {
    id: 102,
    name: 'Trương Hoàng Giang',
    avatar: '/images/agents/truong-hoang-giang.jpg', // Thay bằng ảnh của bạn
    address: 'Nguyễn Từ Lực, Lâm Viên, Đà Lạt, Lâm Đồng, Việt Nam',
    phone: '0962182286',
    services: [
      'Bán nhà mặt phố ở Đà Lạt, Lâm Đồng',
      'Bán nhà biệt thự, liền kề ở Đà Lạt, Lâm Đồng',
      'Cho thuê nhà mặt phố ở Đà Lạt, Lâm Đồng'
    ]
  },
  {
    id: 103,
    name: 'Lương Quốc Anh',
    avatar: '/images/agents/luong-quoc-anh.jpg', // Thay bằng ảnh của bạn
    address: 'Phan Chu Trinh, Lâm Viên, Đà Lạt, Lâm Đồng, Việt Nam',
    phone: '0916997297',
    services: [
      'Bán nhà mặt phố ở Đà Lạt, Lâm Đồng',
      'Bán nhà biệt thự, liền kề ở Đà Lạt, Lâm Đồng'
    ]
  },
  {
    id: 104,
    name: 'Lý Văn Thịnh',
    avatar: '/images/agents/ly-van-thinh.jpg', // Thay bằng ảnh của bạn
    address: 'Thái Phiên, Lâm Viên, Đà Lạt, Lâm Đồng, Việt Nam',
    phone: '0908765432',
    services: [
      'Bán nhà mặt phố ở Đà Lạt, Lâm Đồng',
      'Bán căn hộ chung cư ở Đà Lạt, Lâm Đồng',
      'Cho thuê căn hộ chung cư ở Đà Lạt, Lâm Đồng'
    ]
  },
  {
    id: 105,
    name: 'Trần Vĩ Nhân',
    avatar: '/images/agents/tran-vi-nhan.jpg', // Thay bằng ảnh của bạn
    address: 'Hoàng Văn Thụ, Quận 1, Hồ Chí Minh, Việt Nam',
    phone: '0912345678',
    services: [
      'Bán căn hộ chung cư ở Quận 1, Hồ Chí Minh',
      'Bán nhà riêng ở Quận 1, Hồ Chí Minh',
      'Cho thuê văn phòng ở Quận 1, Hồ Chí Minh'
    ]
  },
  {
    id: 106,
    name: 'Trần Ngọc Mơ',
    avatar: '/images/agents/tran-ngoc-mo.jpg', // Thay bằng ảnh của bạn
    address: 'Nguyễn Huệ, Quận 1, Hồ Chí Minh, Việt Nam',
    phone: '0987654321',
    services: [
      'Bán căn hộ chung cư ở Quận 1, Hồ Chí Minh',
      'Cho thuê căn hộ chung cư ở Quận 1, Hồ Chí Minh',
      'Bán shophouse ở Quận 1, Hồ Chí Minh'
    ]
  }
]

export default Directory
