import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './News.css'

function News() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/news')
      setNews(response.data)
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error)
      setNews(mockNews)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'market', name: 'Thị trường' },
    { id: 'policy', name: 'Chính sách' },
    { id: 'finance', name: 'Tài chính' },
    { id: 'project', name: 'Dự án' },
    { id: 'analysis', name: 'Phân tích' }
  ]

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory)

  const featuredNews = news[0]
  const sideNews = news.slice(1, 4)
  const mainNews = news.slice(4)
  const popularNews = news.slice(0, 4)

  return (
    <div className="news-page">
      <div className="container">
        {/* Header */}
        <div className="news-header">
          <h1>Tin tức bất động sản mới nhất</h1>
          <p className="news-subtitle">
            Thông tin mới, đầy đủ, hấp dẫn về thị trường bất động sản Việt Nam thông qua dữ liệu lớn về giá, giao dịch, 
            nguồn cung - cầu và khảo sát thực tế của đội ngũ phóng viên, biên tập của Batdongsan.com.vn.
          </p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Đang tải tin tức...</p>
          </div>
        ) : (
          <div className="news-content">
            {/* Featured & Side News */}
            <div className="news-top-section">
              {/* Featured News */}
              {featuredNews && (
                <Link to={`/news/${featuredNews.id}`} className="featured-news">
                  <div className="featured-image">
                    <img src={featuredNews.image} alt={featuredNews.title} />
                    <div className="featured-overlay"></div>
                    <div className="featured-content">
                      <div className="news-meta">
                        <span className="news-date">{featuredNews.date}</span>
                        <span className="news-badge">TIN TỨC</span>
                      </div>
                      <h2>{featuredNews.title}</h2>
                      <p className="featured-excerpt">{featuredNews.excerpt}</p>
                    </div>
                  </div>
                </Link>
              )}

              {/* Side News */}
              <div className="side-news">
                {sideNews.map(item => (
                  <Link key={item.id} to={`/news/${item.id}`} className="side-news-item">
                    <div className="side-news-meta">
                      <span className="news-date">{item.date}</span>
                      <span className="news-category">{item.categoryName}</span>
                    </div>
                    <h3>{item.title}</h3>
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="news-main-layout">
              {/* News List */}
              <div className="news-list">
                {mainNews.map(item => (
                  <NewsCard key={item.id} news={item} />
                ))}

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
              </div>

              {/* Sidebar */}
              <aside className="news-sidebar">
                <div className="sidebar-widget">
                  <h3>Bài viết được xem nhiều nhất</h3>
                  <div className="popular-news-list">
                    {popularNews.map((item, index) => (
                      <Link key={item.id} to={`/news/${item.id}`} className="popular-news-item">
                        <span className="popular-rank">{index + 1}</span>
                        <h4>{item.title}</h4>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function NewsCard({ news }) {
  return (
    <Link to={`/news/${news.id}`} className="news-card">
      <div className="news-card-image">
        <img src={news.image} alt={news.title} />
        <span className="news-card-badge">TIN TỨC</span>
      </div>
      <div className="news-card-content">
        <div className="news-card-meta">
          <span className="news-date">{news.date}</span>
          <span className="news-category">{news.categoryName}</span>
        </div>
        <h3>{news.title}</h3>
        <p className="news-excerpt">{news.excerpt}</p>
      </div>
    </Link>
  )
}

// Mock data
const mockNews = [
  {
    id: 1,
    title: 'Trọn Bộ Lãi Suất Vay Mua Nhà Mới Nhất Tháng 11/2025',
    excerpt: 'Lãi suất vay mua nhà của các ngân hàng trong tháng 10/2025 không ghi nhận sự biến động ở cả hai khối: khối ngân hàng Big 4 và khối ngân hàng thương mại. Điều này có nghĩa không có sự điều chỉnh về các ưu đãi vay với nhóm khách hàng trên 35 tuổi và nhóm khách dưới 35 tuổi.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    date: '18/11/2025 14:25',
    category: 'finance',
    categoryName: 'Tin tức'
  },
  {
    id: 2,
    title: 'Khu Vực Đông Nam: Mạch Tăng Trưởng Mới Của Bất Động Sản TP.HCM',
    excerpt: 'Khu vực Đông Nam TP.HCM đang trở thành điểm sáng mới của thị trường bất động sản với hàng loạt dự án lớn.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    date: '18/11/2025 14:00',
    category: 'market',
    categoryName: 'Tin tức'
  },
  {
    id: 3,
    title: 'Chuẩn Hóa Nghề Môi Giới Bất Động Sản - VARS Công Bố Dự Án Nghiên Cứu Về Bộ Tiêu Chuẩn Hành Nghề (VREB)',
    excerpt: 'VARS chính thức công bố dự án nghiên cứu về bộ tiêu chuẩn hành nghề môi giới bất động sản.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    date: '18/11/2025 09:20',
    category: 'policy',
    categoryName: 'Tin tức'
  },
  {
    id: 4,
    title: 'The Emerald Garden View - "Thánh Thơi" Có Nhà Nhỏ Chính Sách Thanh Toán Độc Biệt',
    excerpt: 'Dự án The Emerald Garden View ra mắt chính sách thanh toán linh hoạt, hấp dẫn khách hàng.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    date: '18/11/2025 08:40',
    category: 'project',
    categoryName: 'Tin tức'
  },
  {
    id: 5,
    title: 'Giải Mã "Gen" Tăng Trưởng: Tòa Độ "Vàng" Tiếp Theo Đang Tái Lập Kịch Bản Tăng Giá X3 Tại Thủ Thiêm',
    excerpt: 'Kỳ lục tăng trưởng +236% của căn hộ The Opera (Thủ Thiêm) chỉ trong 3 năm (từ 26 tỷ lên 87,5 tỷ) không phải là may mắn. Đây là kết quả tất yếu của công thức đã được chứng minh: "Lõi trung tâm + hạ tầng tỷ đô"...',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    date: '17/11/2025 15:00',
    category: 'analysis',
    categoryName: 'Hài Âu'
  },
  {
    id: 6,
    title: 'Khởi Công Dự Án An Khánh Ecomony Tại Tâm Điểm Phía Tây Hà Nội',
    excerpt: 'Sáng 16/11, tại xã Sơn Đồng, TP. Hà Nội, Công ty Cổ phần Đầu tư Realtimes Holding phối hợp với CTCP Đầu tư Phát triển Đô thị HANDI đã long trọng tổ chức Lễ Khởi công Dự án An Khánh Ecomony.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
    date: '17/11/2025 10:32',
    category: 'project',
    categoryName: 'Bản nội dung'
  },
  {
    id: 7,
    title: 'Chủ Nhà "Quay Xe" Khi Giá Chung Cư Liên Tục Tăng',
    excerpt: 'Thị trường bất động sản ghi nhận nhiều trường hợp chủ nhà hủy giao dịch khi giá tăng cao.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    date: '17/11/2025 09:15',
    category: 'market',
    categoryName: 'Tin tức'
  },
  {
    id: 8,
    title: 'Giá Nhà Tập Thể Cũ Hà Nội Tăng, Giao Dịch Cầm Chừng',
    excerpt: 'Giá nhà tập thể cũ tại Hà Nội tăng nhẹ nhưng giao dịch vẫn trầm lắng.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    date: '16/11/2025 14:20',
    category: 'market',
    categoryName: 'Tin tức'
  },
  {
    id: 9,
    title: 'Nhà Ở Xã Hội Tiếp Tục Tăng Giá Mạnh',
    excerpt: 'Phân khúc nhà ở xã hội ghi nhận mức tăng giá đáng kể trong quý 4/2025.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    date: '16/11/2025 11:30',
    category: 'market',
    categoryName: 'Tin tức'
  },
  {
    id: 10,
    title: 'Thị Trường Bất Động Sản 2025: Dịch Chuyển Sang Dòng Tiền Thực Về Phân Hóa Mạnh Về Giá',
    excerpt: 'Năm 2025 đánh dấu sự chuyển dịch mạnh mẽ của thị trường bất động sản với sự phân hóa rõ rệt.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    date: '15/11/2025 16:45',
    category: 'analysis',
    categoryName: 'Phân tích'
  }
]

export default News
