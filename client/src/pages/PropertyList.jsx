import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PropertyCard from '../components/PropertyCard'
import MapView from '../components/MapView'
import './PropertyList.css'

function PropertyList() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showMap, setShowMap] = useState(false)
  const [filters, setFilters] = useState({
    verified: false,
    propertyType: '',
    priceRange: '',
    area: '',
    bedrooms: '',
    bathrooms: ''
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
    fetchProperties()
  }, [filters, sortBy, searchQuery])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      
      // Xây dựng query params
      const params = new URLSearchParams()
      
      if (searchQuery) params.append('search', searchQuery)
      if (filters.verified) params.append('verified', 'true')
      if (sortBy && sortBy !== 'default') params.append('sortBy', sortBy)
      
      // Xử lý khoảng giá
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-')
        if (min && min !== '0') params.append('minPrice', Number(min) * 1000000)
        if (max && max !== '+') params.append('maxPrice', Number(max) * 1000000)
      }
      
      // Xử lý diện tích
      if (filters.area) {
        const [min, max] = filters.area.split('-')
        if (min) params.append('minArea', min)
        if (max && max !== '+') params.append('maxArea', max)
      }
      
      // Xử lý phòng ngủ và phòng tắm
      if (filters.bedrooms) params.append('bedrooms', filters.bedrooms)
      if (filters.bathrooms) params.append('bathrooms', filters.bathrooms)

      const response = await axios.get(`http://localhost:5000/api/properties?${params.toString()}`)
      setProperties(response.data)
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchProperties()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const resetFilters = () => {
    setSearchQuery('')
    setFilters({
      verified: false,
      propertyType: '',
      priceRange: '',
      area: '',
      bedrooms: '',
      bathrooms: ''
    })
    setSortBy('newest')
  }

  const priceRanges = [
    { label: 'Thỏa thuận', value: '0' },
    { label: 'Dưới 500 triệu', value: '0-500' },
    { label: '500 - 800 triệu', value: '500-800' },
    { label: '800 triệu - 1 tỷ', value: '800-1000' },
    { label: '1 - 2 tỷ', value: '1000-2000' },
    { label: '2 - 3 tỷ', value: '2000-3000' },
    { label: '3 - 5 tỷ', value: '3000-5000' },
    { label: '5 - 7 tỷ', value: '5000-7000' },
    { label: '7 - 10 tỷ', value: '7000-10000' },
    { label: '10 - 20 tỷ', value: '10000-20000' },
    { label: '20 - 30 tỷ', value: '20000-30000' },
    { label: '30 - 40 tỷ', value: '30000-40000' },
    { label: '40 - 60 tỷ', value: '40000-60000' },
    { label: 'Trên 60 tỷ', value: '60000+' }
  ]

  const areaRanges = [
    { label: 'Dưới 30 m²', value: '0-30' },
    { label: '30 - 50 m²', value: '30-50' },
    { label: '50 - 80 m²', value: '50-80' },
    { label: '80 - 100 m²', value: '80-100' },
    { label: '100 - 150 m²', value: '100-150' },
    { label: '150 - 200 m²', value: '150-200' },
    { label: '200 - 250 m²', value: '200-250' },
    { label: '250 - 300 m²', value: '250-300' },
    { label: '300 - 500 m²', value: '300-500' },
    { label: 'Trên 500 m²', value: '500+' }
  ]

  return (
    <div className="property-list-page">
      <div className="search-section">
        <div className="container">
          <div className="search-bar">
            <div className="search-input-wrapper">
              <svg className="search-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
              <input
                type="text"
                placeholder="Nhà riêng, Thủ Đức dưới 8 tỷ"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <button className="btn-search" onClick={handleSearch}>Tìm kiếm</button>
            <button className="btn-map" onClick={() => setShowMap(true)}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
              </svg>
              Xem bản đồ
            </button>
          </div>

          <div className="filter-bar">
            <button className="filter-btn" onClick={resetFilters}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
              </svg>
              Xóa bộ lọc
            </button>
            <label className="filter-toggle">
              <input 
                type="checkbox" 
                checked={filters.verified} 
                onChange={(e) => handleFilterChange('verified', e.target.checked)} 
              />
              <span>Tin xác thực</span>
            </label>
            <select 
              className="filter-select" 
              value={filters.priceRange} 
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="">Khoảng giá</option>
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            <select 
              className="filter-select" 
              value={filters.area} 
              onChange={(e) => handleFilterChange('area', e.target.value)}
            >
              <option value="">Diện tích</option>
              {areaRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
            <select 
              className="filter-select" 
              value={filters.bedrooms} 
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
            >
              <option value="">Số phòng ngủ</option>
              <option value="1">1+ phòng ngủ</option>
              <option value="2">2+ phòng ngủ</option>
              <option value="3">3+ phòng ngủ</option>
              <option value="4">4+ phòng ngủ</option>
              <option value="5">5+ phòng ngủ</option>
            </select>
            <select 
              className="filter-select" 
              value={filters.bathrooms} 
              onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
            >
              <option value="">Số phòng tắm</option>
              <option value="1">1+ phòng tắm</option>
              <option value="2">2+ phòng tắm</option>
              <option value="3">3+ phòng tắm</option>
              <option value="4">4+ phòng tắm</option>
            </select>
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="container">
          <div className="content-layout">
            <aside className="sidebar">
              <div className="sidebar-section">
                <h3>Lọc theo khoảng giá</h3>
                <div className="filter-list">
                  {priceRanges.map(range => (
                    <label key={range.value} className="filter-item">
                      <input 
                        type="radio" 
                        name="price" 
                        value={range.value}
                        checked={filters.priceRange === range.value}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="sidebar-section">
                <h3>Lọc theo diện tích</h3>
                <div className="filter-list">
                  {areaRanges.map(range => (
                    <label key={range.value} className="filter-item">
                      <input 
                        type="radio" 
                        name="area" 
                        value={range.value}
                        checked={filters.area === range.value}
                        onChange={(e) => handleFilterChange('area', e.target.value)}
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="sidebar-section">
                <h3>Số phòng ngủ</h3>
                <div className="filter-list">
                  <label className="filter-item">
                    <input 
                      type="radio" 
                      name="bedrooms" 
                      value=""
                      checked={filters.bedrooms === ''}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                    />
                    <span>Tất cả</span>
                  </label>
                  {[1, 2, 3, 4, 5].map(num => (
                    <label key={num} className="filter-item">
                      <input 
                        type="radio" 
                        name="bedrooms" 
                        value={num.toString()}
                        checked={filters.bedrooms === num.toString()}
                        onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      />
                      <span>{num}+ phòng ngủ</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="sidebar-section">
                <h3>Số phòng tắm</h3>
                <div className="filter-list">
                  <label className="filter-item">
                    <input 
                      type="radio" 
                      name="bathrooms" 
                      value=""
                      checked={filters.bathrooms === ''}
                      onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                    />
                    <span>Tất cả</span>
                  </label>
                  {[1, 2, 3, 4].map(num => (
                    <label key={num} className="filter-item">
                      <input 
                        type="radio" 
                        name="bathrooms" 
                        value={num.toString()}
                        checked={filters.bathrooms === num.toString()}
                        onChange={(e) => handleFilterChange('bathrooms', e.target.value)}
                      />
                      <span>{num}+ phòng tắm</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            <main className="main-content">
              <div className="results-header">
                <div className="breadcrumb">
                  <a href="/">Bán</a> / <span>Tất cả BDS trên toàn quốc</span>
                </div>
                <h1>Mua bán nhà đất trên toàn quốc</h1>
                <p className="results-count">Hiện có {properties.length} bất động sản.</p>
                
                <div className="results-actions">
                  <label className="email-alert">
                    <input type="checkbox" />
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span>Nhận email tin mới</span>
                  </label>
                  <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="default">Mặc định</option>
                    <option value="newest">Mới nhất</option>
                    <option value="price-asc">Giá thấp đến cao</option>
                    <option value="price-desc">Giá cao đến thấp</option>
                    <option value="area-asc">Diện tích nhỏ đến lớn</option>
                    <option value="area-desc">Diện tích lớn đến nhỏ</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="loading">Đang tải...</div>
              ) : properties.length === 0 ? (
                <div className="no-results">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '64px', height: '64px', opacity: 0.3}}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <h3>Không tìm thấy bất động sản phù hợp</h3>
                  <p>Vui lòng thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
                  <button className="btn-search" onClick={resetFilters}>Xóa bộ lọc</button>
                </div>
              ) : (
                <div className="properties-list">
                  {properties.map(property => (
                    <PropertyCard key={property._id || property.id} property={property} />
                  ))}
                </div>
              )}

              <div className="pagination">
                <button className="page-btn" disabled>‹ Trước</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span className="page-dots">...</span>
                <button className="page-btn">10</button>
                <button className="page-btn">Sau ›</button>
              </div>
            </main>
          </div>
        </div>
      </div>

      {showMap && (
        <MapView
          properties={properties}
          onClose={() => setShowMap(false)}
          onPropertyClick={(property) => {
            navigate(`/property/${property._id || property.id}`)
          }}
        />
      )}
    </div>
  )
}

export default PropertyList
