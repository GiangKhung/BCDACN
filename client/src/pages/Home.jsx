import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import RecommendedProperties from "../components/RecommendedProperties";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const [allProperties, setAllProperties] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("mua");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeNewsTab, setActiveNewsTab] = useState("news");
  const [displayCount, setDisplayCount] = useState(8);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [currentPressIndex, setCurrentPressIndex] = useState(0);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    setDisplayedProperties(allProperties.slice(0, displayCount));
  }, [allProperties, displayCount]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/properties");
      console.log("Properties loaded:", response.data);
      setAllProperties(response.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 8);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Xây dựng URL với query params
    const params = new URLSearchParams();
    if (searchQuery) {
      params.append('search', searchQuery);
    }
    
    // Điều hướng dựa trên tab đang active
    if (activeTab === "mua") {
      navigate(`/for-sale?${params.toString()}`);
    } else if (activeTab === "thue") {
      navigate(`/for-rent?${params.toString()}`);
    } else if (activeTab === "duan") {
      navigate(`/projects?${params.toString()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const nextProjects = () => {
    if (currentProjectIndex < projects.length - 4) {
      setCurrentProjectIndex((prev) => prev + 1);
    }
  };

  const prevProjects = () => {
    if (currentProjectIndex > 0) {
      setCurrentProjectIndex((prev) => prev - 1);
    }
  };

  const nextBlog = () => {
    if (currentBlogIndex < blogPosts.length - 3) {
      setCurrentBlogIndex((prev) => prev + 1);
    }
  };

  const prevBlog = () => {
    if (currentBlogIndex > 0) {
      setCurrentBlogIndex((prev) => prev - 1);
    }
  };

  const nextPartner = () => {
    if (currentPartnerIndex < partners.length - 5) {
      setCurrentPartnerIndex((prev) => prev + 1);
    }
  };

  const prevPartner = () => {
    if (currentPartnerIndex > 0) {
      setCurrentPartnerIndex((prev) => prev - 1);
    }
  };

  const nextPress = () => {
    if (currentPressIndex < pressArticles.length - 4) {
      setCurrentPressIndex((prev) => prev + 1);
    }
  };

  const prevPress = () => {
    if (currentPressIndex > 0) {
      setCurrentPressIndex((prev) => prev - 1);
    }
  };

  const featuredNews = {
    id: 1,
    title: 'Nhà Đầu Tư "Dư Định" Đất Nền 2021-2022 Khi Nào "Về Bờ"?',
    time: "14 giờ trước",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
  };

  const newsList = [
    {
      id: 2,
      title: "Đất Nền Cần Giờ Dậy Sóng, Hút Giới Đầu Tư",
    },
    {
      id: 3,
      title:
        'Nghịch Lý Thị Trường Chung Cư Hà Nội: Giá Bán Tăng, Giá Thuê Vẫn "Giậm Chân" Tại Chỗ',
    },
    {
      id: 4,
      title: "Giá Bán Nhà Phố Trung Tâm TP.HCM Đang Đi Ngang",
    },
    {
      id: 5,
      title: "Lãi Vay Mua Nhà Tăng, Thị Trường Bất Động Sản Diễn Biến Ra Sao?",
    },
    {
      id: 6,
      title: "Thị Trường Bất Động Sản Công Nghiệp Tiếp Tục Tăng Trưởng",
    },
  ];

  const projects = [
    {
      id: 1,
      name: "Green Little Town",
      area: "3,2 ha",
      location: "Gia Lâm, Hà Nội",
      status: "Đang mở bán",
      statusColor: "green",
      images: 13,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    },
    {
      id: 2,
      name: "Kita Capital Ciputra",
      area: "18,8 ha",
      location: "Tây Hồ, Hà Nội",
      status: "Đang mở bán",
      statusColor: "green",
      images: 17,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    },
    {
      id: 3,
      name: "Noble Palace Tây Thăng Long",
      area: "76,99 ha",
      location: "Đan Phượng, Hà Nội",
      status: "Đang mở bán",
      statusColor: "green",
      images: 15,
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    },
    {
      id: 4,
      name: "The Diamond Residence",
      area: "8.004 m²",
      location: "Thanh Xuân, Hà Nội",
      status: "Đã bàn giao",
      statusColor: "purple",
      images: 14,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    },
    {
      id: 5,
      name: "Vinhomes Ocean Park",
      area: "420 ha",
      location: "Gia Lâm, Hà Nội",
      status: "Đang mở bán",
      statusColor: "green",
      images: 20,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Sổ Đỏ Hộ Gia Đình Là Gì? Thủ Tục Tách Sổ Đỏ Hộ Gia Đình",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    },
    {
      id: 2,
      title: 'Hành Trình Cham Tới "Trái Tim" Của Mọi Công Trình',
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
    },
    {
      id: 3,
      title: "Hướng Dẫn Chi Tiết Thủ Tục Đổi Sổ Đỏ Cũ Sang Sổ Mới 2025",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800",
    },
    {
      id: 4,
      title: "Quy Định Mới Về Thuế Bất Động Sản Năm 2025",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    },
    {
      id: 5,
      title: "Xu Hướng Đầu Tư Bất Động Sản Trong Năm 2025",
      image:
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800",
    },
  ];

  const partners = [
    {
      id: 1,
      name: "Thiên Minh Capital",
      logo: "/images/partners/thien-minh-capital.png",
    },
    {
      id: 2,
      name: "Hausland",
      logo: "/images/partners/hausland.png",
    },
    {
      id: 3,
      name: "CityLand",
      logo: "/images/partners/cityland.png",
    },
    {
      id: 4,
      name: "Hoàng Thế Group",
      logo: "/images/partners/hoang-the-group.png",
    },
    {
      id: 5,
      name: "Kim Tính Group",
      logo: "/images/partners/kim-tinh-group.png",
    },
    {
      id: 6,
      name: "Cát Tường Group",
      logo: "/images/partners/cat-tuong-group.png",
    },
    {
      id: 7,
      name: "Novaland",
      logo: "/images/partners/novaland.png",
    },
    {
      id: 8,
      name: "Vingroup",
      logo: "/images/partners/vingroup.png",
    },
  ];

  const pressArticles = [
    {
      id: 1,
      title: "Mua bán nhà đất ở tỉnh: 4 lưu ý quan trọng",
      source: "Tuổi Trẻ",
      sourceLogo: "/images/press/tuoi-tre.png",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
    },
    {
      id: 2,
      title: "Bất chấp nhu cầu sụt giảm, giá nhà đất vẫn...",
      source: "VnExpress",
      sourceLogo: "/images/press/vnexpress.png",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400",
    },
    {
      id: 3,
      title: "Lời giải cho bài toán mua bất động sản ở tỉnh",
      source: "Dân Trí",
      sourceLogo: "/images/press/dan-tri.png",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400",
    },
    {
      id: 4,
      title: "Công ty mẹ Batdongsan.com.vn...",
      source: "CafeF",
      sourceLogo: "/images/press/cafef.png",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    },
    {
      id: 5,
      title: "Thị trường bất động sản 2025: Triển vọng tích cực",
      source: "VietnamNet",
      sourceLogo: "/images/press/vietnamnet.png",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
    },
    {
      id: 6,
      title: "Xu hướng đầu tư bất động sản năm 2025",
      source: "Thanh Niên",
      sourceLogo: "/images/press/thanh-nien.png",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
    },
  ];

  return (
    <main className="home">
      <section className="hero">
        <div className="container">
          <div className="search-box">
            <div className="search-tabs">
              <button
                className={`search-tab ${activeTab === "mua" ? "active" : ""}`}
                onClick={() => setActiveTab("mua")}
              >
                Mua bán
              </button>
              <button
                className={`search-tab ${activeTab === "thue" ? "active" : ""}`}
                onClick={() => setActiveTab("thue")}
              >
                Cho thuê
              </button>
              <button
                className={`search-tab ${activeTab === "duan" ? "active" : ""}`}
                onClick={() => setActiveTab("duan")}
              >
                Dự án
              </button>
            </div>
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder={
                  activeTab === "mua" 
                    ? "Nhà riêng, Thủ Đức dưới 8 tỷ" 
                    : activeTab === "thue"
                    ? "Thuê chung cư 2 phòng ngủ"
                    : "Tìm kiếm dự án bất động sản"
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button type="submit" className="search-btn">
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="news-section">
        <div className="container">
          <div className="section-header">
            <button
              className={`section-tab ${
                activeNewsTab === "news" ? "active" : ""
              }`}
              onClick={() => setActiveNewsTab("news")}
            >
              Tin nổi bật
            </button>
            <button
              className={`section-tab ${
                activeNewsTab === "tintuc" ? "active" : ""
              }`}
              onClick={() => setActiveNewsTab("tintuc")}
            >
              Tin tức
            </button>
            <button
              className={`section-tab ${
                activeNewsTab === "hcm" ? "active" : ""
              }`}
              onClick={() => setActiveNewsTab("hcm")}
            >
              BDS TP.HCM
            </button>
            <button
              className={`section-tab ${
                activeNewsTab === "hanoi" ? "active" : ""
              }`}
              onClick={() => setActiveNewsTab("hanoi")}
            >
              BDS Hà Nội
            </button>
            <a href="#" className="view-more">
              Xem thêm →
            </a>
          </div>
          <div className="news-layout">
            <a href="#" className="featured-news">
              <img src={featuredNews.image} alt={featuredNews.title} />
              <div className="featured-content">
                <h3>{featuredNews.title}</h3>
                <p className="time">🕐 {featuredNews.time}</p>
              </div>
            </a>
            <div className="news-list">
              {newsList.map((news) => (
                <a href="#" key={news.id} className="news-item">
                  {news.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Properties Section */}
      <div className="container">
        <RecommendedProperties />
      </div>

      <section className="for-you-section">
        <div className="container">
          <div className="section-title">
            <h2>Bất động sản dành cho bạn</h2>
            <div className="filter-links">
              <a href="#" className="active">
                Tin nhà đất bán mới nhất
              </a>
              <span>|</span>
              <a href="#">Tin nhà đất cho thuê mới nhất</a>
            </div>
          </div>
          {loading ? (
            <p className="loading">Đang tải...</p>
          ) : (
            <>
              <div className="for-you-grid">
                {displayedProperties.map((property) => (
                  <PropertyCard key={property._id || property.id} property={property} layout="grid" />
                ))}
              </div>
              {displayedProperties.length < allProperties.length && (
                <div className="load-more-container">
                  <button className="load-more-btn" onClick={handleLoadMore}>
                    Mở rộng ▼
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="projects-section">
        <div className="container">
          <div className="section-title">
            <h2>Dự án bất động sản nổi bật</h2>
            <a href="#" className="view-more">
              Xem thêm →
            </a>
          </div>
          <div className="projects-carousel">
            <button
              className="carousel-btn prev"
              onClick={prevProjects}
              disabled={currentProjectIndex === 0}
            >
              ‹
            </button>
            <div className="projects-wrapper">
              <div
                className="projects-track"
                style={{
                  transform: `translateX(-${currentProjectIndex * 25}%)`,
                }}
              >
                {projects.map((project) => (
                  <a href="#" key={project.id} className="project-card">
                    <div className="project-image-wrapper">
                      <img src={project.image} alt={project.name} />
                      <span className="project-images-badge">
                        📷 {project.images}
                      </span>
                    </div>
                    <div className="project-info">
                      <span className={`project-status ${project.statusColor}`}>
                        {project.status}
                      </span>
                      <h3>{project.name}</h3>
                      <p className="project-area">{project.area}</p>
                      <p className="project-location">📍 {project.location}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <button
              className="carousel-btn next"
              onClick={nextProjects}
              disabled={currentProjectIndex >= projects.length - 4}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="locations-section">
        <div className="container">
          <h2>Bất động sản theo địa điểm</h2>
          <div className="locations-grid">
            <a href="#" className="location-card large">
              <img
                src="https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800"
                alt="TP. Hồ Chí Minh"
              />
              <div className="location-overlay">
                <h3>TP. Hồ Chí Minh</h3>
                <p>93.910 tin đăng</p>
              </div>
            </a>
            <div className="location-column">
              <a href="#" className="location-card">
                <img
                  src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800"
                  alt="Hà Nội"
                />
                <div className="location-overlay">
                  <h3>Hà Nội</h3>
                  <p>68.499 tin đăng</p>
                </div>
              </a>
              <a href="#" className="location-card">
                <img
                  src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800"
                  alt="Bình Dương"
                />
                <div className="location-overlay">
                  <h3>Bình Dương</h3>
                  <p>9.526 tin đăng</p>
                </div>
              </a>
            </div>
            <div className="location-column">
              <a href="#" className="location-card">
                <img
                  src="https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800"
                  alt="Đà Nẵng"
                />
                <div className="location-overlay">
                  <h3>Đà Nẵng</h3>
                  <p>10.582 tin đăng</p>
                </div>
              </a>
              <a href="#" className="location-card">
                <img
                  src="https://images.unsplash.com/photo-1598948485421-33a1655d3c18?w=800"
                  alt="Đồng Nai"
                />
                <div className="location-overlay">
                  <h3>Đồng Nai</h3>
                  <p>4.405 tin đăng</p>
                </div>
              </a>
            </div>
          </div>
          <div className="popular-projects">
            <div className="popular-projects-tabs">
              <a href="#" className="project-tab">
                Vinhomes Central Park
              </a>
              <a href="#" className="project-tab">
                Vinhomes Grand Park
              </a>
              <a href="#" className="project-tab">
                Vinhomes Smart City
              </a>
              <a href="#" className="project-tab">
                Vinhomes Ocean Park
              </a>
              <a href="#" className="project-tab">
                Vũng Tàu Pearl
              </a>
              <a href="#" className="project-tab">
                Bcons Green View
              </a>
              <a href="#" className="project-tab">
                Grandeur Palace
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-section">
        <div className="container">
          <h2>Tin tức bất động sản</h2>
          <div className="blog-carousel">
            <button
              className="carousel-btn prev"
              onClick={prevBlog}
              disabled={currentBlogIndex === 0}
            >
              ‹
            </button>
            <div className="blog-wrapper">
              <div
                className="blog-track"
                style={{
                  transform: `translateX(-${currentBlogIndex * 33.33}%)`,
                }}
              >
                {blogPosts.map((post) => (
                  <a href="#" key={post.id} className="blog-card">
                    <img src={post.image} alt={post.title} />
                    <div className="blog-content">
                      <span className="blog-number">
                        {String(post.id).padStart(2, "0")}
                      </span>
                      <h3>{post.title}</h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <button
              className="carousel-btn next"
              onClick={nextBlog}
              disabled={currentBlogIndex >= blogPosts.length - 3}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="utilities-section">
        <div className="container">
          <h2>Hỗ trợ tiện ích</h2>
          <div className="utilities-grid">
            <a href="#" className="utility-card">
              <div className="utility-icon">
                <img
                  src="/images/utilities/xem-tuoi-xay-nha.png"
                  alt="Xem tuổi xây nhà"
                />
              </div>
              <h3>Xem tuổi xây nhà</h3>
            </a>
            <a href="#" className="utility-card">
              <div className="utility-icon">
                <img
                  src="/images/utilities/chi-phi-lam-nha.png"
                  alt="Chi phí làm nhà"
                />
              </div>
              <h3>Chi phí làm nhà</h3>
            </a>
            <a href="#" className="utility-card">
              <div className="utility-icon">
                <img
                  src="/images/utilities/tinh-lai-suat.png"
                  alt="Tính lãi suất"
                />
              </div>
              <h3>Tính lãi suất</h3>
            </a>
            <a href="#" className="utility-card">
              <div className="utility-icon">
                <img
                  src="/images/utilities/tu-van-phong-thuy.png"
                  alt="Tư vấn phong thủy"
                />
              </div>
              <h3>Tư vấn phong thủy</h3>
            </a>
          </div>
        </div>
      </section>

      <section className="partners-section">
        <div className="container">
          <h2>Doanh nghiệp tiêu biểu</h2>
          <div className="partners-carousel">
            <button 
              className="carousel-btn prev" 
              onClick={prevPartner}
              disabled={currentPartnerIndex === 0}
            >
              ‹
            </button>
            <div className="partners-wrapper">
              <div 
                className="partners-track"
                style={{ transform: `translateX(-${currentPartnerIndex * 20}%)` }}
              >
                {partners.map(partner => (
                  <a href="#" key={partner.id} className="partner-logo">
                    <img src={partner.logo} alt={partner.name} />
                  </a>
                ))}
              </div>
            </div>
            <button 
              className="carousel-btn next" 
              onClick={nextPartner}
              disabled={currentPartnerIndex >= partners.length - 5}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="press-section">
        <div className="container">
          <div className="press-header">
            <h2>Báo chí nói về Batdongsan.com.vn</h2>
            <a href="#" className="view-all">Triệu lựa chọn nhà, một kênh tìm kiếm</a>
          </div>
          <div className="press-carousel">
            <button 
              className="carousel-btn prev" 
              onClick={prevPress}
              disabled={currentPressIndex === 0}
            >
              ‹
            </button>
            <div className="press-wrapper">
              <div 
                className="press-track"
                style={{ transform: `translateX(-${currentPressIndex * 25}%)` }}
              >
                {pressArticles.map(article => (
                  <a href="#" key={article.id} className="press-card">
                    <img src={article.image} alt={article.title} />
                    <div className="press-content">
                      <div className="press-source">
                        <img src={article.sourceLogo} alt={article.source} className="source-logo" />
                      </div>
                      <div className="press-text">
                        <h3>{article.title}</h3>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <button 
              className="carousel-btn next" 
              onClick={nextPress}
              disabled={currentPressIndex >= pressArticles.length - 4}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      <section className="footer-services">
        <div className="container">
          <div className="services-grid">
            <div className="service-item">
              <div className="service-icon">
                <img src="https://img.icons8.com/color/96/real-estate.png" alt="Bất động sản bán" />
              </div>
              <h3>Bất động sản bán</h3>
              <p>Đăng tin bất động sản bán nhanh như mơ với công cụ đăng tin thông minh và tìm kiếm thông tin bất động sản dễ dàng với hàng ngàn tin đăng mới mỗi ngày. Bạn có thể tìm kiếm theo khu vực, loại hình và giá cả phù hợp với nhu cầu của mình.</p>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <img src="https://img.icons8.com/color/96/home.png" alt="Bất động sản cho thuê" />
              </div>
              <h3>Bất động sản cho thuê</h3>
              <p>Cập nhật thông tin nhanh về dự án bất động sản mới nhất, phương thức thanh toán, nhà mẫu, bảng giá, tiến độ xây dựng, pháp lý và các chương trình ưu đãi hấp dẫn từ chủ đầu tư.</p>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <img src="https://img.icons8.com/color/96/building.png" alt="Danh mục dự án" />
              </div>
              <h3>Danh mục dự án</h3>
              <p>Cập nhật danh sách các dự án bất động sản mới nhất, các chương trình ưu đãi hấp dẫn từ chủ đầu tư. Việc tìm kiếm thông tin dự án trở nên dễ dàng hơn với hàng ngàn dự án được cập nhật liên tục.</p>
            </div>
            <div className="service-item">
              <div className="service-icon">
                <img src="https://img.icons8.com/color/96/book.png" alt="Wiki BDS" />
              </div>
              <h3>Wiki BDS</h3>
              <p>Ngoài các nội dung về thị trường bất động sản, chúng tôi cũng cung cấp các kiến thức về pháp lý, tài chính, phong thủy, thiết kế và các vấn đề liên quan đến bất động sản. Giúp bạn có cái nhìn toàn diện về thị trường.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="awards-section">
        <div className="container">
          <div className="awards-grid">
            <a href="#" className="award-logo">
              <img src="/images/awards/propertyguru-asia-awards.png" alt="PropertyGuru Asia Property Awards" />
            </a>
            <a href="#" className="award-logo">
              <img src="/images/awards/propertyguru-business.png" alt="PropertyGuru For Business" />
            </a>
            <a href="#" className="award-logo">
              <img src="/images/awards/property-report.png" alt="Property Report" />
            </a>
            <a href="#" className="award-logo">
              <img src="/images/awards/asia-real-estate-summit.png" alt="Asia Real Estate Summit" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
