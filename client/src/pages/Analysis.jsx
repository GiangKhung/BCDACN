import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Analysis.css'

function Analysis() {
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchAnalyses()
  }, [])

  const fetchAnalyses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/analysis')
      setAnalyses(response.data)
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error)
      setAnalyses(mockAnalyses)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { 
      id: 'price-chart', 
      name: 'Biểu đồ giá',
      icon: '💰',
      description: 'Phân tích xu hướng giá'
    },
    { 
      id: 'video', 
      name: 'Video đánh giá',
      icon: '🎬',
      description: 'Video review dự án'
    },
    { 
      id: 'market-report', 
      name: 'Báo cáo thị trường',
      icon: '📊',
      description: 'Báo cáo chuyên sâu'
    },
    { 
      id: 'expert-view', 
      name: 'Góc nhìn chuyên gia',
      icon: '📈',
      description: 'Ý kiến chuyên gia'
    }
  ]

  const filteredAnalyses = selectedCategory === 'all' 
    ? analyses 
    : analyses.filter(item => item.category === selectedCategory)

  const featuredAnalysis = analyses[0]
  const sideAnalyses = analyses.slice(1, 4)

  return (
    <div className="analysis-page">
      <div className="container">
        {/* Header */}
        <div className="analysis-header">
          <h1>Phân tích đánh giá</h1>
          <p className="analysis-subtitle">
            Thông tin đa dạng và chuyên sâu với những phân tích, đánh giá về thị trường BDS dựa trên dữ liệu lớn, 
            khảo sát thực tế và chia sẻ kiến thức của các chuyên gia.
          </p>
        </div>

        {/* Featured & Side Analyses */}
        {!loading && featuredAnalysis && (
          <div className="analysis-featured-section">
            <Link to={`/analysis/${featuredAnalysis.id}`} className="featured-analysis">
              <div className="featured-analysis-image">
                <img src={featuredAnalysis.image} alt={featuredAnalysis.title} />
                <div className="featured-overlay"></div>
                <div className="featured-content">
                  <div className="featured-meta">
                    <span className="featured-date">{featuredAnalysis.date}</span>
                    <span className="featured-badge">Góc nhìn chuyên gia</span>
                  </div>
                  <h2>{featuredAnalysis.title}</h2>
                  <p className="featured-excerpt">{featuredAnalysis.excerpt}</p>
                </div>
              </div>
            </Link>

            <div className="side-analyses">
              {sideAnalyses.map(analysis => (
                <Link key={analysis.id} to={`/analysis/${analysis.id}`} className="side-analysis">
                  <div className="side-analysis-meta">
                    <span className="analysis-date">{analysis.date}</span>
                    <span className="analysis-category">{analysis.categoryName}</span>
                  </div>
                  <h3>{analysis.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories Section */}
        <div className="categories-section">
          <h2>Chuyên mục</h2>
          <div className="categories-grid">
            {categories.map(cat => (
              <Link 
                key={cat.id} 
                to={`/analysis/category/${cat.id}`}
                className="category-card"
              >
                <div className="category-icon">{cat.icon}</div>
                <h3>{cat.name}</h3>
                <p>{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Analyses List */}
        <div className="analyses-section">
          <div className="analyses-header">
            <h2>Phân tích mới nhất</h2>
            <div className="category-tabs">
              <button 
                className={`tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                Tất cả
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  className={`tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Đang tải phân tích...</p>
            </div>
          ) : (
            <>
              <div className="analyses-grid">
                {filteredAnalyses.slice(4).map(analysis => (
                  <AnalysisCard key={analysis.id} analysis={analysis} />
                ))}
              </div>

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
      </div>
    </div>
  )
}

function AnalysisCard({ analysis }) {
  return (
    <Link to={`/analysis/${analysis.id}`} className="analysis-card">
      <div className="analysis-image">
        <img src={analysis.image} alt={analysis.title} />
        {analysis.hasVideo && (
          <div className="video-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        )}
      </div>
      <div className="analysis-content">
        <div className="analysis-meta">
          <span className="analysis-date">{analysis.date}</span>
          <span className="analysis-category">{analysis.categoryName}</span>
        </div>
        <h3>{analysis.title}</h3>
        <p className="analysis-excerpt">{analysis.excerpt}</p>
      </div>
    </Link>
  )
}

// Mock data
const mockAnalyses = [
  {
    id: 1,
    title: 'Thị Trường Bất Động Sản Công Nghiệp Tiếp Tục Tăng Trưởng',
    excerpt: 'Bất chấp các biến động của thị trường, liên tiếp trong nhiều năm nay, bất động sản công nghiệp vẫn là ngôi sao sáng của thị trường bất động sản với những con số tăng trưởng tích cực cả về giá thuê và tỷ lệ lấp đầy.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    date: '06/11/2025 23:30',
    category: 'expert-view',
    categoryName: 'Góc nhìn chuyên gia',
    hasVideo: false
  },
  {
    id: 2,
    title: 'Căn Hộ Chung Cư Tiếp Tục Dẫn Đắt Nguồn Cung Và Thanh Khoản',
    excerpt: 'Phân tích xu hướng thị trường căn hộ chung cư quý 4/2025.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    date: '22/10/2025 14:00',
    category: 'market-report',
    categoryName: 'Góc nhìn chuyên gia'
  },
  {
    id: 3,
    title: 'Thị Trường Bất Động Sản Năm Đang Đối Mặt Với Những Vấn Đề Bất Ổn Nào?',
    excerpt: 'Đánh giá tổng quan về thị trường BDS và những thách thức.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    date: '20/10/2025 08:28',
    category: 'market-report',
    categoryName: 'Góc nhìn chuyên gia'
  },
  {
    id: 4,
    title: 'Giá Chung Cư Hà Nội Tăng Cao, Tỉ Lệ Hấp Thu Vẫn Tích Cực',
    excerpt: 'Phân tích chi tiết về thị trường chung cư Hà Nội quý 3/2025.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    date: '16/10/2025 07:53',
    category: 'price-chart',
    categoryName: 'Góc nhìn chuyên gia'
  },
  {
    id: 5,
    title: 'Biểu Đồ Giá Bất Động Sản TP.HCM Quý 4/2025',
    excerpt: 'Cập nhật biểu đồ giá các phân khúc BDS tại TP.HCM.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    date: '15/10/2025 10:00',
    category: 'price-chart',
    categoryName: 'Biểu đồ giá',
    hasVideo: false
  },
  {
    id: 6,
    title: 'Review Dự Án Vinhomes Ocean Park 3 - The Crown',
    excerpt: 'Đánh giá chi tiết về dự án Vinhomes Ocean Park 3.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    date: '14/10/2025 15:30',
    category: 'video',
    categoryName: 'Video đánh giá',
    hasVideo: true
  },
  {
    id: 7,
    title: 'Báo Cáo Thị Trường BDS Quý 3/2025 - Xu Hướng Và Dự Báo',
    excerpt: 'Báo cáo tổng quan về thị trường BDS quý 3/2025.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    date: '13/10/2025 09:00',
    category: 'market-report',
    categoryName: 'Báo cáo thị trường'
  },
  {
    id: 8,
    title: 'Phân Tích Tiềm Năng Đầu Tư BDS Khu Đông TP.HCM',
    excerpt: 'Đánh giá tiềm năng và cơ hội đầu tư tại khu Đông.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
    date: '12/10/2025 14:20',
    category: 'expert-view',
    categoryName: 'Góc nhìn chuyên gia'
  },
  {
    id: 9,
    title: 'Video: Khảo Sát Thực Tế Dự Án Masteri Centre Point',
    excerpt: 'Khảo sát tiến độ và chất lượng dự án Masteri Centre Point.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    date: '11/10/2025 16:45',
    category: 'video',
    categoryName: 'Video đánh giá',
    hasVideo: true
  },
  {
    id: 10,
    title: 'Xu Hướng Giá Nhà Đất Ngoại Thành Hà Nội 2025',
    excerpt: 'Phân tích xu hướng giá và cơ hội đầu tư ngoại thành.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
    date: '10/10/2025 11:30',
    category: 'price-chart',
    categoryName: 'Biểu đồ giá'
  }
]

export default Analysis
