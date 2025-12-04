import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import './WikiDetail.css'

function WikiDetail() {
  const { id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundArticle = wikiData.find(item => item.id === parseInt(id))
    setArticle(foundArticle)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="wiki-detail-page">
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
      <div className="wiki-detail-page">
        <div className="container">
          <div className="not-found">
            <h2>Không tìm thấy bài viết</h2>
            <Link to="/wiki" className="btn-back">← Quay lại Wiki BDS</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wiki-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/wiki">Wiki BDS</Link>
          <span>/</span>
          <span>{article.categoryName}</span>
        </div>

        <div className="wiki-detail-layout">
          {/* Main Content */}
          <article className="wiki-article">
            <div className="article-header">
              <span className="category-badge">{article.categoryName}</span>
              <h1>{article.title}</h1>
              <div className="article-meta">
                <span className="meta-item">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  Cập nhật: {article.date}
                </span>
                <span className="meta-item">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  {article.views || '1,234'} lượt xem
                </span>
                <span className="meta-item">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                  {article.readTime || '5 phút'} đọc
                </span>
              </div>
            </div>

            {article.mainImage && (
              <figure className="article-hero">
                <img src={article.mainImage} alt={article.title} />
                {article.imageCaption && <figcaption>{article.imageCaption}</figcaption>}
              </figure>
            )}

            <div className="article-intro">
              <p>{article.intro}</p>
            </div>

            {/* Table of Contents */}
            {article.sections && article.sections.length > 1 && (
              <div className="table-of-contents">
                <h3>Nội dung bài viết</h3>
                <ul>
                  {article.sections.map((section, index) => (
                    <li key={index}>
                      <a href={`#section-${index}`}>{section.heading}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="article-content">
              {article.sections?.map((section, index) => (
                <div key={index} id={`section-${index}`} className="content-section">
                  {section.heading && <h2>{section.heading}</h2>}
                  {section.paragraphs?.map((para, pIndex) => (
                    <p key={pIndex}>{para}</p>
                  ))}
                  {section.list && (
                    <ul className="content-list">
                      {section.list.map((item, lIndex) => (
                        <li key={lIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.image && (
                    <figure className="section-figure">
                      <img src={section.image} alt={section.imageCaption || ''} />
                      {section.imageCaption && <figcaption>{section.imageCaption}</figcaption>}
                    </figure>
                  )}
                  {section.note && (
                    <div className="content-note">
                      <strong>Lưu ý:</strong> {section.note}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="article-tags">
              <span className="tags-label">Tags:</span>
              {article.tags?.map((tag, index) => (
                <Link key={index} to={`/wiki?tag=${tag}`} className="tag">{tag}</Link>
              ))}
            </div>

            {/* Share & Actions */}
            <div className="article-actions">
              <button className="action-btn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>
                Chia sẻ
              </button>
              <button className="action-btn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>
                Lưu bài viết
              </button>
              <button className="action-btn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 16h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 11.9 13 12.5 13 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
                Hỏi đáp
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="wiki-sidebar">
            <div className="sidebar-widget">
              <h3>Bài viết liên quan</h3>
              <div className="related-list">
                {relatedArticles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 5).map(item => (
                  <Link key={item.id} to={`/wiki/${item.id}`} className="related-item">
                    <img src={item.image} alt={item.title} />
                    <div className="related-info">
                      <h4>{item.title}</h4>
                      <span className="related-date">{item.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sidebar-widget">
              <h3>Chuyên mục</h3>
              <div className="category-list">
                {categories.map(cat => (
                  <Link key={cat.id} to={`/wiki?category=${cat.id}`} className="category-item">
                    <span className="cat-icon">{cat.icon}</span>
                    <span className="cat-name">{cat.name}</span>
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


// Categories
const categories = [
  { id: 'buy', name: 'Mua BDS', icon: '🔍' },
  { id: 'sell', name: 'Bán BDS', icon: '🏠' },
  { id: 'rent', name: 'Thuê BDS', icon: '🏢' },
  { id: 'finance', name: 'Tài chính BDS', icon: '💰' },
  { id: 'legal', name: 'Quy hoạch - Pháp lý', icon: '⚖️' },
  { id: 'interior', name: 'Nội - Ngoại thất', icon: '🛋️' },
  { id: 'fengshui', name: 'Phong thủy', icon: '☯️' }
]

// Related articles for sidebar
const relatedArticles = [
  { id: 1, title: 'Kinh Nghiệm Mua Nhà Đất Cho Người Mua Lần Đầu', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400', date: '03/06/2024', category: 'buy' },
  { id: 5, title: 'Lãi Suất Vay Mua Nhà Tháng 11/2025', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400', date: '13/11/2025', category: 'finance' },
  { id: 6, title: 'Phong Thủy Nhà Ở: Chọn Hướng Nhà Theo Tuổi', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400', date: '12/11/2025', category: 'fengshui' },
  { id: 7, title: 'Kinh Nghiệm Cho Thuê Nhà Hiệu Quả', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400', date: '11/11/2025', category: 'rent' },
  { id: 8, title: 'Cách Định Giá Nhà Đất Chính Xác', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400', date: '10/11/2025', category: 'sell' },
  { id: 9, title: 'Thiết Kế Nội Thất Phòng Khách 2025', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', date: '09/11/2025', category: 'interior' },
  { id: 10, title: 'Hợp Đồng Mua Bán Nhà Đất: Điều Cần Lưu Ý', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400', date: '08/11/2025', category: 'legal' }
]

// Wiki Data
const wikiData = [
  {
    id: 5,
    title: 'Lãi Suất Vay Mua Nhà Tháng 11/2025 - Ngân Hàng Nào Ưu Đãi Nhất?',
    category: 'finance',
    categoryName: 'Tài chính BDS',
    date: '13/11/2025 09:30',
    readTime: '6 phút',
    views: '2,456',
    intro: 'So sánh lãi suất vay mua nhà của các ngân hàng lớn trong tháng 11/2025. Lãi suất vay mua nhà của các ngân hàng trong tháng 11/2025 không ghi nhận sự biến động ở cả hai khối: khối ngân hàng Big 4 và khối ngân hàng thương mại.',
    mainImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200',
    imageCaption: 'Lãi suất vay mua nhà tháng 11/2025 của các ngân hàng',
    sections: [
      {
        heading: 'Lãi Suất Vay Mua Nhà Tại Các Ngân Hàng Big 4',
        paragraphs: [
          'Trong tháng 11/2025, lãi suất vay mua nhà tại các ngân hàng Big 4 (Vietcombank, BIDV, VietinBank, Agribank) dao động từ 5,5% - 8,5%/năm tùy theo thời hạn vay và đối tượng khách hàng.',
          'Cụ thể, Vietcombank đang áp dụng lãi suất ưu đãi 5,9%/năm cho 6 tháng đầu, sau đó thả nổi theo lãi suất tiết kiệm 12 tháng + biên độ 3,5%/năm.',
          'BIDV có chương trình ưu đãi lãi suất 6,2%/năm cố định trong 12 tháng đầu cho khách hàng mua nhà ở xã hội và nhà ở thương mại giá dưới 2 tỷ đồng.'
        ],
        list: [
          'Vietcombank: 5,9% - 8,2%/năm',
          'BIDV: 6,2% - 8,5%/năm',
          'VietinBank: 6,0% - 8,3%/năm',
          'Agribank: 5,5% - 8,0%/năm'
        ]
      },
      {
        heading: 'Lãi Suất Tại Các Ngân Hàng Thương Mại Cổ Phần',
        paragraphs: [
          'Các ngân hàng thương mại cổ phần như Techcombank, VPBank, MB Bank đang cạnh tranh mạnh với nhiều gói vay ưu đãi hấp dẫn.',
          'Techcombank nổi bật với gói vay "Mua nhà 0% lãi suất" trong 6 tháng đầu, áp dụng cho khách hàng mua căn hộ tại các dự án liên kết.',
          'VPBank có chương trình giải ngân nhanh trong 24h với lãi suất từ 6,5%/năm cho 12 tháng đầu.'
        ],
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200',
        imageCaption: 'So sánh lãi suất vay mua nhà giữa các ngân hàng'
      },
      {
        heading: 'Điều Kiện Vay Mua Nhà Phổ Biến',
        paragraphs: [
          'Để được vay mua nhà, khách hàng cần đáp ứng các điều kiện cơ bản sau:'
        ],
        list: [
          'Độ tuổi từ 18 - 60 tuổi (nam) hoặc 18 - 55 tuổi (nữ)',
          'Có thu nhập ổn định, chứng minh được khả năng trả nợ',
          'Có tài sản đảm bảo (chính căn nhà mua hoặc tài sản khác)',
          'Không có nợ xấu tại các tổ chức tín dụng',
          'Hồ sơ pháp lý của bất động sản đầy đủ, hợp lệ'
        ],
        note: 'Mức vay tối đa thường là 70-80% giá trị bất động sản, thời hạn vay tối đa 25-30 năm tùy ngân hàng.'
      }
    ],
    tags: ['Lãi suất vay', 'Mua nhà', 'Ngân hàng', 'Tài chính BDS', 'Vay mua nhà 2025']
  },
  {
    id: 6,
    title: 'Phong Thủy Nhà Ở: Chọn Hướng Nhà Theo Tuổi Gia Chủ',
    category: 'fengshui',
    categoryName: 'Phong thủy',
    date: '12/11/2025 16:20',
    readTime: '8 phút',
    views: '3,891',
    intro: 'Cách chọn hướng nhà phù hợp với tuổi gia chủ theo phong thủy. Hướng nhà là yếu tố quan trọng ảnh hưởng đến vận khí, tài lộc và sức khỏe của gia đình.',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200',
    imageCaption: 'Chọn hướng nhà theo phong thủy giúp gia đình hưng thịnh',
    sections: [
      {
        heading: 'Cách Xác Định Mệnh Theo Năm Sinh',
        paragraphs: [
          'Theo phong thủy, mỗi người sinh ra đều thuộc một trong 5 mệnh: Kim, Mộc, Thủy, Hỏa, Thổ. Mệnh được xác định dựa trên năm sinh theo lịch âm.',
          'Người mệnh Kim hợp với hướng Tây, Tây Bắc. Người mệnh Mộc hợp với hướng Đông, Đông Nam. Người mệnh Thủy hợp với hướng Bắc. Người mệnh Hỏa hợp với hướng Nam. Người mệnh Thổ hợp với hướng Đông Bắc, Tây Nam.'
        ]
      },
      {
        heading: 'Hướng Nhà Tốt Theo Từng Mệnh',
        paragraphs: [
          'Dưới đây là bảng tổng hợp hướng nhà tốt theo từng mệnh:'
        ],
        list: [
          'Mệnh Kim: Hướng Tây, Tây Bắc, Đông Bắc, Tây Nam',
          'Mệnh Mộc: Hướng Đông, Đông Nam, Bắc, Nam',
          'Mệnh Thủy: Hướng Bắc, Đông, Đông Nam, Tây',
          'Mệnh Hỏa: Hướng Nam, Đông, Đông Nam, Đông Bắc',
          'Mệnh Thổ: Hướng Đông Bắc, Tây Nam, Tây, Tây Bắc'
        ],
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200',
        imageCaption: 'Bố trí nội thất theo phong thủy'
      },
      {
        heading: 'Những Điều Cần Tránh Khi Chọn Hướng Nhà',
        paragraphs: [
          'Ngoài việc chọn hướng tốt, gia chủ cũng cần tránh những hướng xấu có thể ảnh hưởng đến vận khí gia đình.',
          'Tránh chọn nhà có cửa chính đối diện với ngõ cụt, đường đâm thẳng vào nhà (lộ xung), hoặc đối diện với góc nhọn của công trình khác.',
          'Không nên chọn nhà có hướng cửa chính đối diện với cầu thang máy, thang bộ hoặc nhà vệ sinh công cộng.'
        ],
        note: 'Phong thủy chỉ là một yếu tố tham khảo, quan trọng nhất vẫn là sự hài hòa và thoải mái của gia đình khi sinh sống.'
      }
    ],
    tags: ['Phong thủy', 'Hướng nhà', 'Mệnh', 'Nhà ở', 'Tuổi gia chủ']
  },
  {
    id: 7,
    title: 'Kinh Nghiệm Cho Thuê Nhà Hiệu Quả, Tránh Rủi Ro',
    category: 'rent',
    categoryName: 'Thuê BDS',
    date: '11/11/2025 14:15',
    readTime: '7 phút',
    views: '1,567',
    intro: 'Những lưu ý quan trọng khi cho thuê nhà để đảm bảo quyền lợi và tránh các rủi ro pháp lý, tài chính.',
    mainImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
    imageCaption: 'Cho thuê nhà cần có hợp đồng rõ ràng để bảo vệ quyền lợi',
    sections: [
      {
        heading: 'Chuẩn Bị Trước Khi Cho Thuê',
        paragraphs: [
          'Trước khi cho thuê nhà, chủ nhà cần chuẩn bị đầy đủ giấy tờ pháp lý bao gồm: Sổ đỏ/Sổ hồng, CMND/CCCD, và các giấy tờ liên quan khác.',
          'Kiểm tra và sửa chữa các hạng mục hư hỏng trong nhà, đảm bảo hệ thống điện nước hoạt động tốt.',
          'Chụp ảnh hoặc quay video hiện trạng nhà trước khi cho thuê để làm bằng chứng khi có tranh chấp.'
        ]
      },
      {
        heading: 'Soạn Hợp Đồng Cho Thuê Chặt Chẽ',
        paragraphs: [
          'Hợp đồng cho thuê cần ghi rõ các điều khoản quan trọng:'
        ],
        list: [
          'Thông tin chi tiết của bên cho thuê và bên thuê',
          'Địa chỉ và mô tả chi tiết tài sản cho thuê',
          'Giá thuê, phương thức thanh toán, thời hạn thuê',
          'Tiền đặt cọc và điều kiện hoàn trả',
          'Quy định về sửa chữa, bảo trì',
          'Điều khoản chấm dứt hợp đồng trước hạn',
          'Trách nhiệm của các bên khi vi phạm'
        ],
        note: 'Nên công chứng hợp đồng cho thuê để có giá trị pháp lý cao hơn.'
      },
      {
        heading: 'Kiểm Tra Người Thuê Kỹ Lưỡng',
        paragraphs: [
          'Yêu cầu người thuê cung cấp CMND/CCCD, hộ khẩu hoặc giấy tạm trú.',
          'Tìm hiểu về công việc, thu nhập của người thuê để đánh giá khả năng thanh toán.',
          'Có thể yêu cầu người thuê cung cấp thông tin người bảo lãnh hoặc liên hệ khẩn cấp.'
        ]
      }
    ],
    tags: ['Cho thuê nhà', 'Hợp đồng thuê', 'Kinh nghiệm', 'Rủi ro', 'Thuê BDS']
  },
  {
    id: 8,
    title: 'Cách Định Giá Nhà Đất Chính Xác Trước Khi Bán',
    category: 'sell',
    categoryName: 'Bán BDS',
    date: '10/11/2025 11:45',
    readTime: '6 phút',
    views: '2,103',
    intro: 'Phương pháp định giá bất động sản chính xác để bán được giá tốt nhất trên thị trường.',
    mainImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
    imageCaption: 'Định giá chính xác giúp bán nhà nhanh và được giá tốt',
    sections: [
      {
        heading: 'Các Yếu Tố Ảnh Hưởng Đến Giá Nhà Đất',
        paragraphs: [
          'Giá nhà đất phụ thuộc vào nhiều yếu tố khác nhau, bao gồm:'
        ],
        list: [
          'Vị trí: Mặt tiền, hẻm, khoảng cách đến trung tâm',
          'Diện tích và hình dáng lô đất',
          'Pháp lý: Sổ đỏ, sổ hồng, giấy tờ hợp lệ',
          'Hạ tầng xung quanh: Đường, điện, nước, trường học, bệnh viện',
          'Quy hoạch khu vực',
          'Tình trạng xây dựng (nếu có nhà)'
        ]
      },
      {
        heading: 'Phương Pháp Định Giá Phổ Biến',
        paragraphs: [
          'Phương pháp so sánh: So sánh với các bất động sản tương tự đã giao dịch gần đây trong khu vực.',
          'Phương pháp chi phí: Tính toán chi phí xây dựng lại công trình cộng với giá trị đất.',
          'Phương pháp thu nhập: Áp dụng cho bất động sản cho thuê, dựa trên dòng tiền thu được.'
        ],
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200',
        imageCaption: 'Phân tích thị trường để định giá chính xác'
      },
      {
        heading: 'Sử Dụng Dịch Vụ Định Giá Chuyên Nghiệp',
        paragraphs: [
          'Nếu không tự tin định giá, bạn có thể sử dụng dịch vụ định giá từ các công ty thẩm định giá có uy tín.',
          'Chi phí định giá thường dao động từ 1-3 triệu đồng tùy theo loại bất động sản và vị trí.',
          'Kết quả định giá chuyên nghiệp có giá trị pháp lý và có thể sử dụng cho các giao dịch ngân hàng.'
        ]
      }
    ],
    tags: ['Định giá', 'Bán nhà', 'Giá nhà đất', 'Thẩm định giá', 'Bán BDS']
  },
  {
    id: 9,
    title: 'Thiết Kế Nội Thất Phòng Khách Hiện Đại 2025',
    category: 'interior',
    categoryName: 'Nội - Ngoại thất',
    date: '09/11/2025 10:30',
    readTime: '5 phút',
    views: '4,521',
    intro: 'Xu hướng thiết kế nội thất phòng khách hiện đại, sang trọng năm 2025 với các phong cách đa dạng.',
    mainImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200',
    imageCaption: 'Phòng khách hiện đại với tông màu trung tính',
    sections: [
      {
        heading: 'Xu Hướng Màu Sắc 2025',
        paragraphs: [
          'Năm 2025, xu hướng màu sắc trong thiết kế nội thất phòng khách nghiêng về các tông màu trung tính, ấm áp như be, nâu đất, xám nhạt.',
          'Màu xanh lá cây đậm (forest green) và xanh navy cũng được ưa chuộng để tạo điểm nhấn.',
          'Sự kết hợp giữa màu trắng và gỗ tự nhiên vẫn là lựa chọn an toàn và thanh lịch.'
        ],
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200',
        imageCaption: 'Tông màu trung tính tạo không gian ấm cúng'
      },
      {
        heading: 'Phong Cách Thiết Kế Phổ Biến',
        paragraphs: [
          'Các phong cách thiết kế được yêu thích trong năm 2025:'
        ],
        list: [
          'Minimalist (Tối giản): Ít đồ đạc, đường nét đơn giản, màu sắc trung tính',
          'Scandinavian: Sáng sủa, gỗ tự nhiên, cây xanh',
          'Industrial: Gạch trần, kim loại, đèn Edison',
          'Mid-century Modern: Đường cong mềm mại, màu sắc retro',
          'Japandi: Kết hợp Nhật Bản và Scandinavian'
        ]
      },
      {
        heading: 'Lựa Chọn Nội Thất Thông Minh',
        paragraphs: [
          'Sofa modular có thể thay đổi cấu hình linh hoạt theo không gian.',
          'Bàn trà có ngăn chứa đồ giúp tối ưu không gian lưu trữ.',
          'Kệ TV treo tường giúp phòng khách rộng rãi và hiện đại hơn.',
          'Đèn thông minh có thể điều chỉnh màu sắc và độ sáng theo tâm trạng.'
        ],
        note: 'Nên chọn nội thất có kích thước phù hợp với diện tích phòng, tránh chọn đồ quá lớn gây cảm giác chật chội.'
      }
    ],
    tags: ['Nội thất', 'Phòng khách', 'Thiết kế', 'Xu hướng 2025', 'Hiện đại']
  },
  {
    id: 10,
    title: 'Hợp Đồng Mua Bán Nhà Đất: Những Điều Cần Lưu Ý',
    category: 'legal',
    categoryName: 'Quy hoạch pháp lý',
    date: '08/11/2025 15:00',
    readTime: '8 phút',
    views: '3,245',
    intro: 'Các điều khoản quan trọng trong hợp đồng mua bán bất động sản mà người mua và người bán cần nắm rõ.',
    mainImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200',
    imageCaption: 'Hợp đồng mua bán nhà đất cần được soạn thảo kỹ lưỡng',
    sections: [
      {
        heading: 'Các Điều Khoản Bắt Buộc Trong Hợp Đồng',
        paragraphs: [
          'Theo quy định pháp luật, hợp đồng mua bán nhà đất phải có các nội dung sau:'
        ],
        list: [
          'Thông tin đầy đủ của bên bán và bên mua',
          'Mô tả chi tiết bất động sản: địa chỉ, diện tích, số sổ đỏ',
          'Giá bán và phương thức thanh toán',
          'Thời hạn bàn giao và sang tên',
          'Cam kết về tình trạng pháp lý của bất động sản',
          'Trách nhiệm của các bên khi vi phạm hợp đồng'
        ]
      },
      {
        heading: 'Những Điều Cần Kiểm Tra Trước Khi Ký',
        paragraphs: [
          'Trước khi ký hợp đồng, người mua cần kiểm tra kỹ các vấn đề sau:',
          'Xác minh quyền sở hữu của người bán thông qua sổ đỏ/sổ hồng.',
          'Kiểm tra bất động sản có đang thế chấp, tranh chấp hay không.',
          'Xác nhận quy hoạch khu vực tại UBND phường/xã.',
          'Kiểm tra diện tích thực tế có khớp với giấy tờ không.'
        ],
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200',
        imageCaption: 'Kiểm tra kỹ giấy tờ trước khi ký hợp đồng'
      },
      {
        heading: 'Quy Trình Công Chứng Hợp Đồng',
        paragraphs: [
          'Hợp đồng mua bán nhà đất bắt buộc phải được công chứng hoặc chứng thực.',
          'Các bước thực hiện: Chuẩn bị hồ sơ → Đặt lịch công chứng → Ký hợp đồng tại văn phòng công chứng → Nhận hợp đồng đã công chứng.',
          'Phí công chứng thường do bên mua chịu, dao động từ 0,1% - 0,5% giá trị hợp đồng.'
        ],
        note: 'Nên thuê luật sư hoặc chuyên gia pháp lý kiểm tra hợp đồng trước khi ký để đảm bảo quyền lợi.'
      }
    ],
    tags: ['Hợp đồng', 'Mua bán nhà đất', 'Pháp lý', 'Công chứng', 'Quy hoạch']
  }
]

export default WikiDetail
