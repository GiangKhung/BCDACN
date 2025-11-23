import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import './Projects.css'

function Projects() {
  const [searchParams] = useSearchParams()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  
  const [filters, setFilters] = useState({
    region: 'all',
    projectType: 'all',
    priceRange: 'all',
    status: 'all'
  })
  
  const [sortBy, setSortBy] = useState('newest')

  // Lấy query từ URL khi component mount
  useEffect(() => {
    const searchFromUrl = searchParams.get('search')
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl)
    }
  }, [searchParams])

  useEffect(() => {
    fetchProjects()
  }, [searchQuery])

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects')
      console.log('Projects data:', response.data)
      setProjects(response.data)
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error)
      // Dữ liệu mẫu nếu API chưa có
      setProjects(mockProjects)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    console.log('Tìm kiếm:', searchQuery, filters)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="projects-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600" 
          alt="Featured Project" 
          className="hero-image"
        />
        <div className="hero-content">
          <span className="hero-badge">Đã bàn giao</span>
          <h1 className="hero-title">The Diamond Residence</h1>
          <p className="hero-location">25 Lê Văn Lương, phường Nhân Chính, Thanh Xuân, Hà Nội</p>
          <div className="hero-indicator">3 / 7</div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
        <div className="container">
          <div className="filter-bar-projects">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm dự án..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select 
              className="filter-select-projects"
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
            >
              <option value="all">Khu vực: Toàn quốc</option>
              <option value="hanoi">Hà Nội</option>
              <option value="hcm">Hồ Chí Minh</option>
              <option value="danang">Đà Nẵng</option>
              <option value="other">Tỉnh thành khác</option>
            </select>

            <select 
              className="filter-select-projects"
              value={filters.projectType}
              onChange={(e) => handleFilterChange('projectType', e.target.value)}
            >
              <option value="all">Loại hình: Tất cả</option>
              <option value="apartment">Căn hộ chung cư</option>
              <option value="villa">Biệt thự</option>
              <option value="townhouse">Nhà phố</option>
              <option value="land">Đất nền</option>
            </select>

            <select 
              className="filter-select-projects"
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="all">Khoảng giá: Tất cả</option>
              <option value="under-1">Dưới 1 tỷ</option>
              <option value="1-2">1 - 2 tỷ</option>
              <option value="2-3">2 - 3 tỷ</option>
              <option value="3-5">3 - 5 tỷ</option>
              <option value="over-5">Trên 5 tỷ</option>
            </select>

            <select 
              className="filter-select-projects"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">Trạng thái: Tất cả</option>
              <option value="selling">Đang mở bán</option>
              <option value="coming">Sắp mở bán</option>
              <option value="delivered">Đã bàn giao</option>
            </select>

            <button className="btn-reset-filter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <div className="container">
          <div className="content-header">
            <div className="breadcrumb">
              <Link to="/">Dự án</Link> / <span>Dự án BDS Toàn Quốc</span>
            </div>
            <h1>Dự án toàn quốc</h1>
            <p className="results-count">Hiện đang có {projects.length.toLocaleString()} dự án</p>
          </div>

          <div className="content-layout-projects">
            {/* Main Projects List */}
            <main className="projects-main">
              <div className="sort-bar">
                <select 
                  className="sort-select" 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Mới nhất</option>
                  <option value="popular">Phổ biến</option>
                  <option value="price-asc">Giá thấp đến cao</option>
                  <option value="price-desc">Giá cao đến thấp</option>
                </select>
              </div>

              {loading ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Đang tải dữ liệu...</p>
                </div>
              ) : (
                <div className="projects-grid">
                  {projects.map((project, index) => (
                    <ProjectCard key={project._id || project.id || index} project={project} />
                  ))}
                </div>
              )}

              {!loading && projects.length > 0 && (
                <div className="pagination">
                  <button className="page-btn" disabled>‹ Trước</button>
                  <button className="page-btn active">1</button>
                  <button className="page-btn">2</button>
                  <button className="page-btn">3</button>
                  <span className="page-dots">...</span>
                  <button className="page-btn">10</button>
                  <button className="page-btn">Sau ›</button>
                </div>
              )}
            </main>

            {/* Sidebar */}
            <aside className="projects-sidebar">
              <div className="sidebar-widget">
                <h3>Đánh giá dự án</h3>
                <Link to="/reviews" className="widget-link">
                  Xem tất cả →
                </Link>
                <div className="review-list">
                  <div className="review-item">
                    <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400" alt="Review" />
                    <div className="review-content">
                      <h4>Thăm Lại Dự Án Legacy Prime Trước Khi Bàn Giao</h4>
                      <span className="review-time">2 năm trước</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project._id || project.id}`} className="project-card">
      <div className="project-image-wrapper">
        {project.status && (
          <span className={`project-status-badge ${project.status}`}>
            {project.status === 'delivered' || project.status === 'completed' ? 'Đã bàn giao' : 
             project.status === 'selling' ? 'Đang mở bán' : 'Sắp mở bán'}
          </span>
        )}
        <img 
          src={project.mainImage || project.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'} 
          alt={project.name}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'
          }}
        />
        {project.images && (
          <span className="images-count">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
            </svg>
            {Array.isArray(project.images) ? project.images.length : project.images}
          </span>
        )}
      </div>
      <div className="project-info">
        <h3>{project.name}</h3>
        <p className="project-location">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          {project.location}
        </p>
        <p className="project-description">{project.description}</p>
        {project.developer && (
          <p className="project-developer">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
            </svg>
            {project.developer}
          </p>
        )}
      </div>
    </Link>
  )
}

// Mock data
const mockProjects = [
  {
    id: 1,
    name: 'Maison Du Parc',
    location: 'Đường số 23, Phường Cổ Nhuế 1, Quận Bắc Từ Liêm, Hà Nội',
    description: 'Maison Du Parc là dự án khu đô thị cao cấp tại quận Bắc Từ Liêm, Hà Nội. Dự án phát triển sản phẩm...',
    developer: 'Công ty CP xuất nhập khẩu tổng hợp Hà Nội - Geleximco',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    images: 94,
    status: 'delivered',
    priceRange: '2-3'
  },
  {
    id: 2,
    name: 'Vinhomes Ocean Park',
    location: 'Đa Tốn, Gia Lâm, Hà Nội',
    description: 'Vinhomes Ocean Park là đại đô thị đẳng cấp với hệ thống tiện ích 5 sao, công viên biển nhân tạo lớn nhất Đông Nam Á.',
    developer: 'Tập đoàn Vingroup',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    images: 120,
    status: 'selling',
    priceRange: '1-2'
  },
  {
    id: 3,
    name: 'The Diamond Residence',
    location: '25 Lê Văn Lương, Thanh Xuân, Hà Nội',
    description: 'Dự án chung cư cao cấp tại trung tâm Thanh Xuân với thiết kế hiện đại, tiện ích đầy đủ.',
    developer: 'Diamond Group',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
    images: 85,
    status: 'delivered',
    priceRange: '3-5'
  },
  {
    id: 4,
    name: 'Masteri Thảo Điền',
    location: 'Xa Lộ Hà Nội, Quận 2, Hồ Chí Minh',
    description: 'Khu căn hộ cao cấp tại trung tâm Quận 2 với view sông Sài Gòn tuyệt đẹp.',
    developer: 'Masterise Homes',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    images: 150,
    status: 'selling',
    priceRange: '3-5'
  },
  {
    id: 5,
    name: 'Ecopark Grand The Island',
    location: 'Văn Giang, Hưng Yên',
    description: 'Khu biệt thự đảo cao cấp với không gian xanh mát, tiện ích resort 5 sao.',
    developer: 'Vinaconex',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    images: 200,
    status: 'selling',
    priceRange: 'over-5'
  },
  {
    id: 6,
    name: 'Sunshine City Sài Gòn',
    location: 'Quận 7, Hồ Chí Minh',
    description: 'Khu đô thị thông minh với hệ thống tiện ích hiện đại, kết nối giao thông thuận lợi.',
    developer: 'Sunshine Group',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    images: 110,
    status: 'coming',
    priceRange: '2-3'
  }
]

export default Projects
