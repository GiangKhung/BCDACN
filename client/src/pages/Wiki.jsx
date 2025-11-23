import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Wiki.css'

function Wiki() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/wiki')
      setArticles(response.data)
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error)
      setArticles(mockArticles)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { 
      id: 'buy', 
      name: 'Mua BDS',
      icon: '🔍',
      description: 'Hướng dẫn mua nhà đất'
    },
    { 
      id: 'sell', 
      name: 'Bán BDS',
      icon: '🏠',
      description: 'Kinh nghiệm bán BDS'
    },
    { 
      id: 'rent', 
      name: 'Thuê BDS',
      icon: '🏢',
      description: 'Thông tin cho thuê'
    },
    { 
      id: 'finance', 
      name: 'Tài chính BDS',
      icon: '💰',
      description: 'Vay vốn, đầu tư'
    },
    { 
      id: 'legal', 
      name: 'Quy hoạch - Pháp lý',
      icon: '⚖️',
      description: 'Thủ tục pháp lý'
    },
    { 
      id: 'interior', 
      name: 'Nội - Ngoại thất',
      icon: '🛋️',
      description: 'Thiết kế trang trí'
    },
    { 
      id: 'fengshui', 
      name: 'Phong thủy',
      icon: '☯️',
      description: 'Phong thủy nhà ở'
    }
  ]

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(item => item.category === selectedCategory)

  const featuredArticle = articles[0]
  const sideArticles = articles.slice(1, 4)

  return (
    <div className="wiki-page">
      <div className="container">
        {/* Header */}
        <div className="wiki-header">
          <h1>Wiki BDS</h1>
          <p className="wiki-subtitle">
            Wiki bất động sản là cẩm nang đáp ứng tất cả nhu cầu của người tìm kiếm thông tin bất động sản bao gồm 
            các chỉ dẫn mua-bán, đầu tư, thuê và cho thuê, các thông tin về tài chính, pháp lý, quy hoạch v.v...
          </p>
        </div>

        {/* Featured & Side Articles */}
        {!loading && featuredArticle && (
          <div className="wiki-featured-section">
            <Link to={`/wiki/${featuredArticle.id}`} className="featured-article">
              <div className="featured-article-image">
                <img src={featuredArticle.image} alt={featuredArticle.title} />
                <div className="featured-overlay"></div>
                <div className="featured-content">
                  <div className="featured-meta">
                    <span className="featured-date">{featuredArticle.date}</span>
                    <span className="featured-badge">Mua BDS</span>
                  </div>
                  <h2>{featuredArticle.title}</h2>
                </div>
              </div>
            </Link>

            <div className="side-articles">
              {sideArticles.map(article => (
                <Link key={article.id} to={`/wiki/${article.id}`} className="side-article">
                  <div className="side-article-meta">
                    <span className="article-date">{article.date}</span>
                    <span className="article-category">{article.categoryName}</span>
                  </div>
                  <h3>{article.title}</h3>
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
                to={`/wiki/category/${cat.id}`}
                className="category-card"
              >
                <div className="category-icon">{cat.icon}</div>
                <h3>{cat.name}</h3>
                <p>{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="articles-section">
          <div className="articles-header">
            <h2>Bài viết mới nhất</h2>
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
              <p>Đang tải bài viết...</p>
            </div>
          ) : (
            <>
              <div className="articles-grid">
                {filteredArticles.slice(4).map(article => (
                  <ArticleCard key={article.id} article={article} />
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

function ArticleCard({ article }) {
  return (
    <Link to={`/wiki/${article.id}`} className="article-card">
      <div className="article-image">
        <img src={article.image} alt={article.title} />
      </div>
      <div className="article-content">
        <div className="article-meta">
          <span className="article-date">{article.date}</span>
          <span className="article-category">{article.categoryName}</span>
        </div>
        <h3>{article.title}</h3>
        <p className="article-excerpt">{article.excerpt}</p>
      </div>
    </Link>
  )
}

// Mock data
const mockArticles = [
  {
    id: 1,
    title: 'Kinh Nghiệm Mua Nhà Đất - Chi Tiết Từng Bước Cho Người Mua Lần Đầu',
    excerpt: 'Hướng dẫn chi tiết từng bước để mua nhà đất an toàn, tránh rủi ro cho người mua lần đầu.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    date: '03/06/2024 15:01',
    category: 'buy',
    categoryName: 'Mua BDS'
  },
  {
    id: 2,
    title: 'Sổ Đỏ Hộ Gia Đình Là Gì? Thủ Tục Tách Sổ Đỏ Hộ Gia Đình',
    excerpt: 'Tìm hiểu về sổ đỏ hộ gia đình và các thủ tục cần thiết để tách sổ đỏ.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    date: '17/11/2025 10:47',
    category: 'legal',
    categoryName: 'Quy hoạch pháp lý'
  },
  {
    id: 3,
    title: 'Hành Trình Chạm Tới "Trái Tim" Của Mọi Công Trình',
    excerpt: 'Khám phá quy trình thiết kế và thi công nội thất chuyên nghiệp.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    date: '14/11/2025 17:00',
    category: 'interior',
    categoryName: 'Nội - Ngoại thất'
  },
  {
    id: 4,
    title: 'Hướng Dẫn Chi Tiết Thủ Tục Đổi Sổ Đỏ Cũ Sang Sổ Mới 2025',
    excerpt: 'Quy trình và hồ sơ cần thiết để đổi sổ đỏ cũ sang sổ mới theo quy định 2025.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800',
    date: '14/11/2025 14:52',
    category: 'legal',
    categoryName: 'Quy hoạch pháp lý'
  },
  {
    id: 5,
    title: 'Lãi Suất Vay Mua Nhà Tháng 11/2025 - Ngân Hàng Nào Ưu Đãi Nhất?',
    excerpt: 'So sánh lãi suất vay mua nhà của các ngân hàng lớn trong tháng 11/2025.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
    date: '13/11/2025 09:30',
    category: 'finance',
    categoryName: 'Tài chính BDS'
  },
  {
    id: 6,
    title: 'Phong Thủy Nhà Ở: Chọn Hướng Nhà Theo Tuổi Gia Chủ',
    excerpt: 'Cách chọn hướng nhà phù hợp với tuổi gia chủ theo phong thủy.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
    date: '12/11/2025 16:20',
    category: 'fengshui',
    categoryName: 'Phong thủy'
  },
  {
    id: 7,
    title: 'Kinh Nghiệm Cho Thuê Nhà Hiệu Quả, Tránh Rủi Ro',
    excerpt: 'Những lưu ý quan trọng khi cho thuê nhà để đảm bảo quyền lợi.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    date: '11/11/2025 14:15',
    category: 'rent',
    categoryName: 'Thuê BDS'
  },
  {
    id: 8,
    title: 'Cách Định Giá Nhà Đất Chính Xác Trước Khi Bán',
    excerpt: 'Phương pháp định giá bất động sản chính xác để bán được giá tốt.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    date: '10/11/2025 11:45',
    category: 'sell',
    categoryName: 'Bán BDS'
  },
  {
    id: 9,
    title: 'Thiết Kế Nội Thất Phòng Khách Hiện Đại 2025',
    excerpt: 'Xu hướng thiết kế nội thất phòng khách hiện đại, sang trọng.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    date: '09/11/2025 10:30',
    category: 'interior',
    categoryName: 'Nội - Ngoại thất'
  },
  {
    id: 10,
    title: 'Hợp Đồng Mua Bán Nhà Đất: Những Điều Cần Lưu Ý',
    excerpt: 'Các điều khoản quan trọng trong hợp đồng mua bán bất động sản.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
    date: '08/11/2025 15:00',
    category: 'legal',
    categoryName: 'Quy hoạch pháp lý'
  }
]

export default Wiki
