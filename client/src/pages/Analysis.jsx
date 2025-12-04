import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Analysis.css'

function Analysis() {
  const navigate = useNavigate()
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
  const topArticles = analyses.slice(0, 5)

  return (
    <div className="analysis-page">
      <div className="analysis-container">
        {/* Main Content Area */}
        <div className="analysis-main-content">
          {/* Featured Article */}
          {!loading && featuredAnalysis && (
            <article className="featured-article" onClick={() => navigate(`/analysis/${featuredAnalysis.id}`)}>
              <h1 className="featured-title">{featuredAnalysis.title}</h1>
              
              <div className="featured-author">
                <img src={featuredAnalysis.authorAvatar || '/images/default-avatar.jpg'} alt={featuredAnalysis.author} className="author-avatar" />
                <div className="author-info">
                  <span className="author-label">Được đăng bởi <strong>{featuredAnalysis.author}</strong></span>
                  <span className="article-meta-info">
                    Cập nhật lần cuối vào {featuredAnalysis.date} • Đọc trong khoảng {featuredAnalysis.readTime || '7'} phút
                  </span>
                </div>
              </div>

              <div className="featured-summary">
                {featuredAnalysis.excerpt}
              </div>

              <div className="featured-image-container">
                <img src={featuredAnalysis.image} alt={featuredAnalysis.title} className="featured-image" />
                {featuredAnalysis.imageCaption && (
                  <p className="image-caption">{featuredAnalysis.imageCaption}</p>
                )}
              </div>

              <div className="featured-content-preview">
                {featuredAnalysis.contentPreview}
              </div>
            </article>
          )}

          {/* Related Articles List */}
          <div className="related-articles-section">
            <h2 className="section-title">Bài viết liên quan</h2>
            <div className="articles-list">
              {filteredAnalyses.slice(1, 6).map(analysis => (
                <ArticleListItem key={analysis.id} analysis={analysis} />
              ))}
            </div>
          </div>

          {/* Categories Section */}
          <div className="categories-section">
            <h2 className="section-title">Khám phá thêm</h2>
            <div className="category-tags">
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  className={`category-tag ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* More Articles */}
          <div className="more-articles-section">
            <div className="articles-grid">
              {filteredAnalyses.slice(6).map(analysis => (
                <AnalysisCard key={analysis.id} analysis={analysis} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="analysis-sidebar">
          {/* Most Viewed */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Bài viết được xem nhiều nhất</h3>
            <div className="top-articles">
              {topArticles.map((article, index) => (
                <div 
                  key={article.id}
                  className="top-article-item"
                  onClick={() => navigate(`/analysis/${article.id}`)}
                >
                  <span className="article-number">{index + 1}</span>
                  <div className="article-info">
                    <h4>{article.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Filter */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Khám phá thêm</h3>
            <div className="sidebar-categories">
              <button 
                className={`sidebar-category ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                Tất cả
              </button>
              {categories.map(cat => (
                <button 
                  key={cat.id}
                  className={`sidebar-category ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="sidebar-section newsletter-box">
            <h3 className="sidebar-title">Nhận tin tức mới nhất</h3>
            <p>Đăng ký để nhận phân tích và báo cáo thị trường BDS</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Email của bạn" />
              <button type="submit">Đăng ký</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  )
}

function ArticleListItem({ analysis }) {
  const navigate = useNavigate()
  
  return (
    <div className="article-list-item" onClick={() => navigate(`/analysis/${analysis.id}`)}>
      <div className="article-list-image">
        <img src={analysis.image} alt={analysis.title} />
      </div>
      <div className="article-list-content">
        <div className="article-list-meta">
          <span className="article-date">{analysis.date}</span>
          <span className="article-category">{analysis.categoryName}</span>
        </div>
        <h3 className="article-list-title">{analysis.title}</h3>
        <p className="article-list-excerpt">{analysis.excerpt}</p>
      </div>
    </div>
  )
}

function AnalysisCard({ analysis }) {
  const navigate = useNavigate()
  
  return (
    <div className="analysis-card" onClick={() => navigate(`/analysis/${analysis.id}`)}>
      <div className="analysis-card-image">
        <img src={analysis.image} alt={analysis.title} />
        {analysis.hasVideo && (
          <div className="video-badge">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        )}
      </div>
      <div className="analysis-card-content">
        <div className="analysis-card-meta">
          <span className="analysis-date">{analysis.date}</span>
          <span className="analysis-category">{analysis.categoryName}</span>
        </div>
        <h3 className="analysis-card-title">{analysis.title}</h3>
        <p className="analysis-card-excerpt">{analysis.excerpt}</p>
      </div>
    </div>
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
    author: 'Nguyễn Nam',
    authorAvatar: '/images/authors/nguyen-nam.jpg',
    readTime: '7',
    imageCaption: 'Ông Nguyễn Văn Định, Chủ tịch Hội Môi giới Bất động sản Việt Nam',
    contentPreview: 'Việt Nam đang hưởng lợi rõ rệt từ làn sóng dịch chuyển sản xuất khỏi Trung Quốc. Quyết định đầu tư FDI vốn có tính dài hạn, ít bị chi phối bởi biến động thuế quan ngắn hạn...',
    hasVideo: false
  },
  {
    id: 2,
    title: 'Căn Hộ Chung Cư Tiếp Tục Dẫn Đắt Nguồn Cung Và Thanh Khoản',
    excerpt: 'Phân tích xu hướng thị trường căn hộ chung cư quý 4/2025 với những con số tăng trưởng ấn tượng về nguồn cung và thanh khoản.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    date: '22/10/2025 14:00',
    category: 'market-report',
    categoryName: 'Báo cáo thị trường',
    author: 'Trần Minh',
    authorAvatar: '/images/authors/tran-minh.jpg',
    readTime: '5',
    hasVideo: false
  },
  {
    id: 3,
    title: 'Thị Trường Bất Động Sản Năm Đang Đối Mặt Với Những Vấn Đề Bất Ổn Nào?',
    excerpt: 'Đánh giá tổng quan về thị trường BDS và những thách thức cần vượt qua trong bối cảnh kinh tế hiện nay.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    date: '20/10/2025 08:28',
    category: 'expert-view',
    categoryName: 'Góc nhìn chuyên gia',
    author: 'Lê Hương',
    authorAvatar: '/images/authors/le-huong.jpg',
    readTime: '8',
    hasVideo: false
  },
  {
    id: 4,
    title: 'Giá Chung Cư Hà Nội Tăng Cao, Tỉ Lệ Hấp Thu Vẫn Tích Cực',
    excerpt: 'Phân tích chi tiết về thị trường chung cư Hà Nội quý 3/2025 cho thấy giá tăng nhưng tỷ lệ hấp thụ vẫn duy trì ở mức cao.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    date: '16/10/2025 07:53',
    category: 'price-chart',
    categoryName: 'Biểu đồ giá',
    author: 'Phạm Anh',
    authorAvatar: '/images/authors/pham-anh.jpg',
    readTime: '6',
    hasVideo: false
  },
  {
    id: 5,
    title: 'Giá Bán Chung Cư Hà Nội Sẽ Diễn Biến Ra Sao Thời Gian Tới?',
    excerpt: 'Cập nhật biểu đồ giá các phân khúc BDS tại Hà Nội và dự báo xu hướng trong thời gian tới.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    date: '15/10/2025 10:00',
    category: 'price-chart',
    categoryName: 'Biểu đồ giá',
    author: 'Hoàng Lan',
    authorAvatar: '/images/authors/hoang-lan.jpg',
    readTime: '5',
    hasVideo: false
  },
  {
    id: 6,
    title: 'Giá Chung Cư Hà Nội Tăng Cao, Tỉ Lệ Hấp Thụ Vẫn Tích Cực',
    excerpt: 'Đánh giá chi tiết về thị trường chung cư Hà Nội với mức giá tăng cao nhưng vẫn được thị trường đón nhận tích cực.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    date: '14/10/2025 15:30',
    category: 'market-report',
    categoryName: 'Báo cáo thị trường',
    author: 'Vũ Hải',
    authorAvatar: '/images/authors/vu-hai.jpg',
    readTime: '7',
    hasVideo: false
  },
  {
    id: 7,
    title: 'Cần Hỏi Chung Cư Tiếp Tục Dẫn Đắt Nguồn Cung Và Thanh Khoản',
    excerpt: 'Báo cáo tổng quan về thị trường căn hộ chung cư quý 3/2025 với nguồn cung dồi dào và thanh khoản cao.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    date: '13/10/2025 09:00',
    category: 'market-report',
    categoryName: 'Báo cáo thị trường',
    author: 'Đỗ Linh',
    authorAvatar: '/images/authors/do-linh.jpg',
    readTime: '6',
    hasVideo: false
  },
  {
    id: 8,
    title: 'Thị Trường Bất Động Sản Việt Nam: Những Giai Phạp Phải Triển Bền Vững',
    excerpt: 'Đánh giá tiềm năng và đưa ra các giải pháp phát triển bền vững cho thị trường BDS Việt Nam.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
    date: '12/10/2025 14:20',
    category: 'expert-view',
    categoryName: 'Góc nhìn chuyên gia',
    author: 'Bùi Thành',
    authorAvatar: '/images/authors/bui-thanh.jpg',
    readTime: '9',
    hasVideo: false
  },
  {
    id: 9,
    title: 'Thị Trường Bất Động Sản Công Nghiệp Tiếp Tục Tăng Trưởng',
    excerpt: 'Khảo sát và phân tích về sự tăng trưởng mạnh mẽ của thị trường BDS công nghiệp trong năm 2025.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    date: '11/10/2025 16:45',
    category: 'expert-view',
    categoryName: 'Góc nhìn chuyên gia',
    author: 'Ngô Tùng',
    authorAvatar: '/images/authors/ngo-tung.jpg',
    readTime: '8',
    hasVideo: false
  },
  {
    id: 10,
    title: 'Xu Hướng Giá Nhà Đất Ngoại Thành Hà Nội 2025',
    excerpt: 'Phân tích xu hướng giá và cơ hội đầu tư tại các khu vực ngoại thành Hà Nội trong năm 2025.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
    date: '10/10/2025 11:30',
    category: 'price-chart',
    categoryName: 'Biểu đồ giá',
    author: 'Mai Phương',
    authorAvatar: '/images/authors/mai-phuong.jpg',
    readTime: '6',
    hasVideo: false
  }
]

export default Analysis
