import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './NewsDetail.css'

// eslint-disable-next-line no-unused-vars

function NewsDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Tìm bài viết theo id
    const foundArticle = newsData.find(item => item.id === parseInt(id))
    setArticle(foundArticle)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="loading">
            <div className="spinner"></div>
            <p>Đang tải bài viết...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Không tìm thấy bài viết</h2>
            <Link to="/news" className="btn-back">← Quay lại trang tin tức</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="news-detail-page">
      <div className="container">
        <div className="news-detail-layout">
          {/* Main Content */}
          <article className="news-article">
            <h1 className="article-title">{article.title}</h1>
            
            <div className="article-meta">
              <div className="author-info">
                <div className="author-avatar">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <div className="author-details">
                  <span className="author-label">Được đăng bởi <strong>{article.author}</strong></span>
                  <span className="article-date">Cập nhật lần cuối vào {article.date} · Đọc trong khoảng {article.readTime || '5 phút'}</span>
                </div>
              </div>
            </div>

            <div className="article-intro">
              <p>{article.intro}</p>
            </div>

            {article.mainImage && (
              <figure className="article-figure">
                <img src={article.mainImage} alt={article.title} />
                <figcaption>{article.imageCaption}</figcaption>
              </figure>
            )}

            <div className="article-content">
              {article.sections?.map((section, index) => (
                <div key={index} className="content-section">
                  {section.heading && <h2>{section.heading}</h2>}
                  {section.paragraphs?.map((para, pIndex) => (
                    <p key={pIndex}>{para}</p>
                  ))}
                  {section.image && (
                    <figure className="section-figure">
                      <img src={section.image} alt={section.imageCaption || ''} />
                      {section.imageCaption && <figcaption>{section.imageCaption}</figcaption>}
                    </figure>
                  )}
                </div>
              ))}
            </div>

            <div className="article-tags">
              {article.tags?.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="news-sidebar">
            <div className="sidebar-widget">
              <h3>Bài viết được xem nhiều nhất</h3>
              <div className="popular-list">
                {popularArticles.map((item, index) => (
                  <Link key={item.id} to={`/news/${item.id}`} className="popular-item">
                    <span className="popular-rank">{index + 1}</span>
                    <span className="popular-title">{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}


// Dữ liệu bài viết chi tiết
const newsData = [
  {
    id: 4,
    title: 'TTC Land Cho Thuê Thành Công Trọn Khối Văn Phòng Hơn 22.000m2 Tại TTC Plaza Đà Nẵng',
    author: 'Hải Âu',
    date: '24/11/2025 14:00',
    readTime: '5 phút',
    intro: 'Thị trường văn phòng Đà Nẵng phục hồi rõ nét trong quý 3/2025, đặc biệt ở nhóm nhu cầu thuê diện tích lớn. Trong bối cảnh nguồn cung mới hạn chế, thương vụ cho thuê sỉ hơn 22.000 m² tại TTC Plaza Đà Nẵng trở thành một trong những giao dịch nổi bật của thị trường năm nay. Dự án do Công ty Cổ phần Địa ốc Sài Gòn Thương Tín – TTC Land (HOSE: SCR) phát triển.',
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
    imageCaption: 'TTC Plaza Đà Nẵng trở thành điểm sáng của thị trường khi hoàn tất cho thuê sỉ hơn 22.000m2 văn phòng',
    sections: [
      {
        heading: 'Nhu Cầu Thuê Sỉ Phục Hồi, Thị Trường Ghi Nhận Mức Cải Thiện Tích Cực',
        paragraphs: [
          'Theo Cục Thống kê Đà Nẵng, doanh thu dịch vụ bất động sản quý 3/2025 tăng 94,7% so với cùng kỳ – mức tăng mạnh nhất kể từ năm 2019. Phân khúc văn phòng cũng cho thấy sự cải thiện ở cả tỷ lệ lấp đầy và giá thuê. Báo cáo từ Avison Young và CBRE Việt Nam cho biết tỷ lệ lấp đầy văn phòng hạng B và C đạt 80–85%, giá thuê trung bình tăng 2–3% so với quý trước. Trong khi đó, nguồn cung mới ra thị trường không nhiều, chủ yếu đến từ các dự án tái cấu trúc hoặc tổ hợp thương mại lớn.',
          'Sự phục hồi hoạt động của nhóm doanh nghiệp công nghệ, thương mại dịch vụ, logistics và du lịch đã tạo lực kéo cho các dự án văn phòng hạng A và B+ tại khu vực trung tâm cũng như ven sông Hàn. Đáng chú ý, sau hơn hai năm trầm lắng, nhu cầu thuê diện tích lớn bắt đầu quay trở lại, phản ánh giai đoạn phục hồi bền vững hơn của thị trường.',
          'Tỷ lệ lấp đầy trung bình toàn thị trường tăng từ 78% trong quý 2 lên 83% trong quý 3. Diện tích cho thuê mới trong quý đạt gần 9.800 m², cho thấy sức hấp thu cải thiện rõ rệt so với các quý trước đó.'
        ]
      },
      {
        heading: 'TTC Plaza Đà Nẵng – Điểm Sáng Trong Phân Khúc Văn Phòng Hạng A',
        paragraphs: [
          'Trong bối cảnh thị trường văn phòng Đà Nẵng đang trên đà phục hồi, TTC Plaza nổi lên như một điểm sáng với thương vụ cho thuê sỉ hơn 22.000 m² văn phòng – một trong những giao dịch lớn nhất thị trường trong năm 2025.',
          'TTC Plaza Đà Nẵng là tổ hợp thương mại – văn phòng cao cấp tọa lạc tại vị trí đắc địa trên đường Nguyễn Văn Linh, quận Hải Châu. Dự án có tổng diện tích sàn hơn 45.000 m², trong đó khối văn phòng chiếm khoảng 22.000 m² với thiết kế hiện đại, hệ thống quản lý tòa nhà thông minh và tiện ích đa dạng.',
          'Việc cho thuê thành công toàn bộ khối văn phòng không chỉ khẳng định vị thế của TTC Land trong phân khúc bất động sản thương mại mà còn phản ánh niềm tin của các doanh nghiệp vào tiềm năng phát triển của Đà Nẵng.'
        ],
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
        imageCaption: 'Không gian văn phòng hiện đại tại TTC Plaza Đà Nẵng'
      },
      {
        heading: 'Triển Vọng Thị Trường Văn Phòng Đà Nẵng',
        paragraphs: [
          'Các chuyên gia nhận định thị trường văn phòng Đà Nẵng sẽ tiếp tục xu hướng phục hồi trong năm 2026, với động lực chính đến từ sự mở rộng của các doanh nghiệp công nghệ, logistics và dịch vụ tài chính.',
          'Nguồn cung mới dự kiến sẽ hạn chế trong 2 năm tới, tạo điều kiện thuận lợi cho các dự án hiện hữu cải thiện tỷ lệ lấp đầy và điều chỉnh giá thuê. Đặc biệt, các tòa nhà văn phòng hạng A với vị trí trung tâm và tiện ích đầy đủ sẽ tiếp tục được ưa chuộng.',
          'TTC Land cho biết sẽ tiếp tục đầu tư nâng cấp hạ tầng và dịch vụ tại TTC Plaza Đà Nẵng, đồng thời nghiên cứu phát triển thêm các dự án văn phòng tại các thành phố lớn khác.'
        ]
      }
    ],
    tags: ['TTC Land', 'Văn phòng cho thuê', 'Đà Nẵng', 'Bất động sản thương mại', 'TTC Plaza']
  },
  {
    id: 1,
    title: 'Giải Mã "Gen" Tăng Trưởng: Tòa Độ "Vàng" Tiếp Theo Đang Tái Lập Kịch Bản Tăng Giá...',
    author: 'Hải Âu',
    date: '17/11/2025 15:00',
    readTime: '7 phút',
    intro: 'Kỷ lục tăng trưởng +236% của căn hộ The Opera (Thủ Thiêm) chỉ trong 3 năm (từ 26 tỷ lên 87,5 tỷ) không phải là may mắn. Đây là kết quả tất yếu của công thức đã được chứng minh: "Lõi trung tâm + hạ tầng tỷ đô".',
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200',
    imageCaption: 'Khu đô thị Thủ Thiêm - tâm điểm tăng trưởng của thị trường bất động sản TP.HCM',
    sections: [
      {
        heading: 'Công Thức Tăng Trưởng Đã Được Chứng Minh',
        paragraphs: [
          'Thị trường bất động sản cao cấp tại TP.HCM đã chứng kiến nhiều kỷ lục tăng giá ấn tượng trong những năm qua. Điển hình là căn hộ The Opera tại Thủ Thiêm với mức tăng trưởng +236% chỉ trong 3 năm.',
          'Phân tích cho thấy các dự án có mức tăng giá vượt trội đều sở hữu chung một công thức: vị trí lõi trung tâm kết hợp với hạ tầng giao thông đồng bộ và tiện ích đẳng cấp.',
          'Các chuyên gia dự báo xu hướng này sẽ tiếp tục lan tỏa sang các khu vực lân cận có tiềm năng phát triển tương tự.'
        ]
      }
    ],
    tags: ['Thủ Thiêm', 'Căn hộ cao cấp', 'Tăng trưởng', 'TP.HCM']
  },
  {
    id: 2,
    title: 'Khởi Công Dự Án An Khánh Ecomony Tại Tâm Điểm Phía Tây Hà Nội',
    author: 'Bản nội dung',
    date: '17/11/2025 10:32',
    readTime: '4 phút',
    intro: 'Sáng 16/11, tại xã Sơn Đồng, TP. Hà Nội, Công ty Cổ phần Đầu tư Realtimes Holding phối hợp với CTCP Đầu tư Phát triển Đô thị HANDI đã long trọng tổ chức Lễ Khởi công Dự án An Khánh Ecomony.',
    mainImage: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200',
    imageCaption: 'Lễ khởi công dự án An Khánh Ecomony tại Hà Nội',
    sections: [
      {
        heading: 'Dự Án Trọng Điểm Phía Tây Thủ Đô',
        paragraphs: [
          'An Khánh Ecomony là dự án khu đô thị sinh thái quy mô lớn với tổng diện tích hơn 50 hecta, được quy hoạch đồng bộ với đầy đủ tiện ích.',
          'Dự án nằm tại vị trí chiến lược, kết nối thuận tiện với trung tâm Hà Nội qua các tuyến đường huyết mạch như Đại lộ Thăng Long, Quốc lộ 32.',
          'Với tổng vốn đầu tư hơn 5.000 tỷ đồng, dự án dự kiến hoàn thành giai đoạn 1 vào cuối năm 2027.'
        ]
      }
    ],
    tags: ['An Khánh Ecomony', 'Hà Nội', 'Khu đô thị', 'Realtimes Holding']
  },
  {
    id: 3,
    title: 'Chủ Nhà "Quay Xe" Khi Giá Chung Cư Liên Tục Tăng',
    author: 'Tin tức',
    date: '17/11/2025 09:15',
    readTime: '3 phút',
    intro: 'Thị trường bất động sản ghi nhận nhiều trường hợp chủ nhà hủy giao dịch khi giá tăng cao, gây khó khăn cho người mua.',
    mainImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
    imageCaption: 'Giá chung cư tăng mạnh khiến nhiều chủ nhà "quay xe" hủy giao dịch',
    sections: [
      {
        heading: 'Hiện Tượng "Quay Xe" Lan Rộng',
        paragraphs: [
          'Trong bối cảnh giá chung cư tại Hà Nội và TP.HCM liên tục tăng, nhiều chủ nhà đã quyết định hủy các giao dịch đã thỏa thuận trước đó để bán với giá cao hơn.',
          'Theo khảo sát, có đến 15-20% giao dịch bị hủy trong quý 3/2025, tăng gấp đôi so với cùng kỳ năm trước.',
          'Các chuyên gia khuyến cáo người mua nên ký hợp đồng đặt cọc với điều khoản ràng buộc chặt chẽ để bảo vệ quyền lợi.'
        ]
      }
    ],
    tags: ['Chung cư', 'Giá nhà', 'Giao dịch', 'Thị trường']
  }
]

// Bài viết phổ biến
const popularArticles = [
  { id: 6, title: 'Trọn Bộ Lãi Suất Vay Mua Nhà Mới Nhất Tháng 11/2025' },
  { id: 3, title: 'Chủ Nhà "Quay Xe" Khi Giá Chung Cư Liên Tục Tăng' },
  { id: 7, title: 'Giá Nhà Tập Thể Cũ Hà Nội Tăng, Giao Dịch Cầm Chừng' },
  { id: 8, title: 'Nhà Ở Xã Hội Tiếp Tục Tăng Giá Mạnh' },
  { id: 9, title: 'Thị Trường Bất Động Sản 2025: Dịch Chuyển Sang Dòng Tiền Thực Và Phân Hóa Mạnh Về Giá' }
]

export default NewsDetail
