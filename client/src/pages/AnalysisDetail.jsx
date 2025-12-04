import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AnalysisDetail.css';

function AnalysisDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [topArticles, setTopArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticleDetail();
    fetchTopArticles();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchArticleDetail = async () => {
    try {
      // Mock data - thay bằng API call thực tế
      const mockArticle = {
        id: id,
        title: 'Thị Trường Bất Động Sản Công Nghiệp Tiếp Tục Tăng Trưởng',
        category: 'Bất động sản khu công nghiệp',
        date: '06/11/2025 23:50',
        readTime: '7',
        author: 'Nguyễn Nam',
        authorAvatar: '/images/authors/nguyen-nam.jpg',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200',
        imageCaption: 'Ông Nguyễn Văn Định, Chủ tịch Hội Môi giới Bất động sản Việt Nam',
        summary: 'Bất chấp các biến động của thị trường, liên tiếp trong nhiều năm nay, bất động sản công nghiệp vẫn là ngôi sao sáng của thị trường bất động sản với những con số tăng trưởng tích cực cả về giá thuê và tỷ lệ lấp đầy.',
        content: `
          <p>Dưới đây là trả lời của chúng tôi với ông Nguyễn Văn Định, Chủ tịch <strong>Hội Môi giới Bất động sản Việt Nam</strong> về những diễn biến của bất động sản công nghiệp.</p>
          
          <p><em>Phóng viên: Thưa ông, thị trường bất động sản công nghiệp Việt Nam đã diễn biến ra sao trong thời gian qua?</em></p>
          
          <p><strong>Ông Nguyễn Văn Định:</strong> Dòng vốn FDI vào Việt Nam tiếp tục duy trì ở mức tăng trưởng mạnh, đặc biệt trong các lĩnh vực công nghệ cao, sản xuất hiện đại và công nghiệp hỗ trợ. Nhiều tập đoàn đa quốc gia như Samsung, LG, Foxconn, Intel... vẫn đang mở rộng quy mô hoạt động dự án mới, khẳng định vị thế của Việt Nam như một mắt xích quan trọng trong chuỗi cung ứng toàn cầu.</p>

          <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200" alt="Khu công nghiệp" style="width: 100%; border-radius: 8px; margin: 2rem 0;" />

          <p>Việt Nam đang hưởng lợi rõ rệt từ làn sóng dịch chuyển sản xuất khỏi Trung Quốc. Quyết định đầu tư FDI vốn có tính dài hạn, ít bị chi phối bởi biến động thuế quan ngắn hạn, trong khi Việt Nam sở hữu lợi thế cạnh tranh về vị trí địa lý, chi phí lao động hợp lý, chính trị ổn định và chính sách thu hút đầu tư nhất quán. Bên cạnh đó, nhiều quốc gia đối tác thương mại lớn đang chủ động thuế quan tương đương, giúp Việt Nam duy trì sức hấp dẫn trong mắt nhà đầu tư. Hệ thống giao thông – từ cao tốc đến cảng biển quốc tế – ngày càng được đầu tư đồng bộ, nâng cao năng lực kết nối giữa các trung tâm sản xuất với thị trường toàn cầu.</p>

          <h2>Triển Vọng Phát Triển</h2>
          
          <p>Với những yếu tố thuận lợi trên, thị trường bất động sản công nghiệp Việt Nam được dự báo sẽ tiếp tục duy trì đà tăng trưởng mạnh mẽ trong những năm tới. Các nhà đầu tư trong và ngoài nước đang tích cực tìm kiếm cơ hội đầu tư vào phân khúc này.</p>

          <p>Tuy nhiên, để duy trì sức hút, Việt Nam cần tiếp tục hoàn thiện hạ tầng, nâng cao chất lượng nguồn nhân lực và tạo môi trường đầu tư thuận lợi hơn nữa cho các doanh nghiệp.</p>

          <blockquote style="border-left: 4px solid #e74c3c; padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: #555;">
            "Bất động sản công nghiệp không chỉ là điểm sáng của thị trường hiện tại mà còn là nền tảng cho sự phát triển bền vững của nền kinh tế Việt Nam trong tương lai."
          </blockquote>

          <h2>Kết Luận</h2>
          
          <p>Thị trường bất động sản công nghiệp Việt Nam đang ở giai đoạn phát triển mạnh mẽ với nhiều cơ hội đầu tư hấp dẫn. Sự ổn định về chính sách, vị trí địa lý thuận lợi và nguồn nhân lực dồi dào là những lợi thế cạnh tranh quan trọng giúp Việt Nam thu hút đầu tư FDI trong thời gian tới.</p>
        `,
        tags: ['Bất động sản công nghiệp', 'FDI', 'Đầu tư', 'Phát triển'],
        views: 1250,
        shares: 45
      };
      
      setArticle(mockArticle);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching article:', error);
      setLoading(false);
    }
  };

  const fetchTopArticles = async () => {
    try {
      // Mock data
      const mockTop = [
        {
          id: 1,
          title: 'Giá Bán Chung Cư Hà Nội Sẽ Diễn Biến Ra Sao Thời Gian Tới?'
        },
        {
          id: 2,
          title: 'Giá Chung Cư Hà Nội Tăng Cao, Tỉ Lệ Hấp Thụ Vẫn Tích Cực'
        },
        {
          id: 3,
          title: 'Cần Hỏi Chung Cư Tiếp Tục Dẫn Đắt Nguồn Cung Và Thanh Khoản'
        },
        {
          id: 4,
          title: 'Thị Trường Bất Động Sản Việt Nam: Những Giai Phạp Phải Triển Bền Vững'
        },
        {
          id: 5,
          title: 'Thị Trường Bất Động Sản Công Nghiệp Tiếp Tục Tăng Trưởng'
        }
      ];
      
      setTopArticles(mockTop);
    } catch (error) {
      console.error('Error fetching top articles:', error);
    }
  };

  if (loading) {
    return <div className="analysis-detail-loading">Đang tải...</div>;
  }

  if (!article) {
    return <div className="analysis-detail-error">Không tìm thấy bài viết</div>;
  }

  return (
    <div className="analysis-detail">
      <div className="analysis-detail-container">
        {/* Main Content */}
        <div className="analysis-detail-content">
          <article className="article-main">
            {/* Header */}
            <header className="article-header">
              <h1 className="article-title">{article.title}</h1>
              
              <div className="article-meta">
                <img src={article.authorAvatar || '/images/default-avatar.jpg'} alt={article.author} className="author-avatar" />
                <div className="author-info">
                  <span className="author-label">Được đăng bởi <strong>{article.author}</strong></span>
                  <span className="article-meta-info">
                    Cập nhật lần cuối vào {article.date} • Đọc trong khoảng {article.readTime} phút
                  </span>
                </div>
              </div>
            </header>

            {/* Summary */}
            <div className="article-summary">
              {article.summary}
            </div>

            {/* Featured Image */}
            <div className="article-image">
              <img src={article.image} alt={article.title} />
              {article.imageCaption && (
                <p className="image-caption">{article.imageCaption}</p>
              )}
            </div>

            {/* Content */}
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          {/* Sidebar */}
          <aside className="article-sidebar">
            {/* Category Tag */}
            <div className="sidebar-section category-tag-section">
              <div className="category-tag">{article.category}</div>
            </div>

            {/* Top Articles */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Bài viết được xem nhiều nhất</h3>
              <div className="top-articles">
                {topArticles.map((topArticle, index) => (
                  <div 
                    key={topArticle.id}
                    className="top-article-item"
                    onClick={() => navigate(`/analysis/${topArticle.id}`)}
                  >
                    <span className="article-number">{index + 1}</span>
                    <h4 className="article-title-small">{topArticle.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default AnalysisDetail;
