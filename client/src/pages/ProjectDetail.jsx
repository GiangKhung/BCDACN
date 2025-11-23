import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import './ProjectDetail.css'

function ProjectDetail() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      console.log('Fetching project with ID:', id)
      const response = await axios.get(`http://localhost:5000/api/projects/${id}`)
      console.log('Project data:', response.data)
      setProject(response.data)
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error)
      console.error('Error details:', error.response?.data)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải thông tin dự án...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="error-container">
        <h2>Không tìm thấy dự án</h2>
        <p>Dự án này có thể đã bị xóa hoặc không tồn tại</p>
        <Link to="/projects" className="back-btn">Quay lại danh sách</Link>
      </div>
    )
  }

  const images = project.images || []
  const mainImage = images.find(img => img.type === 'main') || images[0]
  const galleryImages = images.filter(img => img.type === 'gallery')

  return (
    <div className="project-detail-page">
      {/* Breadcrumb */}
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Dự án</Link>
          <span>/</span>
          <Link to="/projects">{project.address?.city || project.location}</Link>
          <span>/</span>
          <Link to="/projects">{project.address?.district}</Link>
          <span>/</span>
          <span>{project.name}</span>
        </div>
      </div>

      {/* Header */}
      <div className="project-header">
        <div className="container">
          <div className="header-content">
            <div className="header-left">
              <h1>{project.name}</h1>
              <p className="address">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {project.address?.fullAddress || project.location}
              </p>
            </div>
            <div className="header-right">
              <button className="btn-share">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                Chia sẻ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="image-gallery">
        <div className="container">
          <div className="gallery-grid">
            <div className="main-image">
              {project.status && (
                <span className={`status-badge ${project.status}`}>
                  {project.status === 'selling' ? 'Đang mở bán' : 
                   project.status === 'completed' ? 'Đã bàn giao' : 'Sắp mở bán'}
                </span>
              )}
              <img 
                src={images[activeImageIndex]?.url || project.mainImage} 
                alt={project.name}
              />
              <div className="image-counter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                {images.length} Căn hộ
              </div>
            </div>
            <div className="thumbnail-grid">
              {images.slice(0, 4).map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={img.url} alt={img.caption} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs-sticky">
        <div className="container">
          <div className="nav-tabs">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              Tổng quan
            </button>
            <button 
              className={activeTab === 'details' ? 'active' : ''}
              onClick={() => setActiveTab('details')}
            >
              Thông tin chi tiết
            </button>
            <button 
              className={activeTab === 'masterplan' ? 'active' : ''}
              onClick={() => setActiveTab('masterplan')}
            >
              Mặt bằng dự án
            </button>
            <button 
              className={activeTab === 'utilities' ? 'active' : ''}
              onClick={() => setActiveTab('utilities')}
            >
              Vị trí
            </button>
            <button 
              className={activeTab === 'loan' ? 'active' : ''}
              onClick={() => setActiveTab('loan')}
            >
              Ước tính khoản vay
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="project-content">
        <div className="container">
          <div className="content-layout">
            <main className="main-content">
              {/* Tổng quan */}
              {activeTab === 'overview' && (
                <section className="overview-section">
                  <h2>Tổng quan {project.name}</h2>
                  <div className="overview-image">
                    <img src={project.mainImage} alt={project.name} />
                    <p className="image-caption">Hình ảnh thực tế dự án {project.name}</p>
                  </div>
                  
                  <div className="overview-text">
                    <p>{project.overview || project.description}</p>
                  </div>

                  {/* Thông tin cơ bản */}
                  <div className="basic-info">
                    <h3>Thông tin cơ bản</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="label">Tên dự án:</span>
                        <span className="value">{project.name}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Vị trí:</span>
                        <span className="value">{project.address?.fullAddress || project.location}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Chủ đầu tư:</span>
                        <span className="value">{project.developer}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Quy mô:</span>
                        <span className="value">{project.scale?.totalArea} ha</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Số căn:</span>
                        <span className="value">{project.scale?.totalUnits} căn</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Loại hình:</span>
                        <span className="value">
                          {project.productTypes?.map(type => {
                            const typeMap = {
                              'apartment': 'Căn hộ',
                              'villa': 'Biệt thự',
                              'townhouse': 'Nhà phố',
                              'shophouse': 'Shophouse',
                              'land': 'Đất nền'
                            }
                            return typeMap[type] || type
                          }).join(', ')}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="label">Mức giá:</span>
                        <span className="value">{project.priceText}</span>
                      </div>
                      <div className="info-item">
                        <span className="label">Tiến độ:</span>
                        <span className="value">{project.progress?.currentProgress}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Tiện ích */}
                  {project.utilities && project.utilities.length > 0 && (
                    <div className="utilities-section">
                      <h3>Tiện ích nội khu</h3>
                      <div className="utilities-grid">
                        {project.utilities.map((utility, index) => (
                          <div key={index} className="utility-item">
                            <div className="utility-icon">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                            </div>
                            <span>{utility.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chính sách bán hàng */}
                  {project.salesPolicy && project.salesPolicy.length > 0 && (
                    <div className="sales-policy">
                      <h3>Chính sách bán hàng</h3>
                      <div className="policy-list">
                        {project.salesPolicy.map((policy, index) => (
                          <div key={index} className="policy-item">
                            <div className="policy-icon">
                              <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                              </svg>
                            </div>
                            <div className="policy-content">
                              <h4>{policy.title}</h4>
                              <p>{policy.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* Thông tin chi tiết */}
              {activeTab === 'details' && (
                <section className="details-section">
                  <h2>Thông tin chi tiết</h2>
                  <div className="details-content">
                    <div className="detail-group">
                      <h3>Thông tin dự án</h3>
                      <table className="detail-table">
                        <tbody>
                          <tr>
                            <td>Tên dự án</td>
                            <td>{project.name}</td>
                          </tr>
                          <tr>
                            <td>Địa chỉ</td>
                            <td>{project.address?.fullAddress || project.location}</td>
                          </tr>
                          <tr>
                            <td>Chủ đầu tư</td>
                            <td>{project.developer}</td>
                          </tr>
                          <tr>
                            <td>Tổng diện tích</td>
                            <td>{project.scale?.totalArea} ha</td>
                          </tr>
                          <tr>
                            <td>Tổng số căn</td>
                            <td>{project.scale?.totalUnits} căn</td>
                          </tr>
                          <tr>
                            <td>Mật độ xây dựng</td>
                            <td>{project.scale?.density}%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="detail-group">
                      <h3>Tiến độ dự án</h3>
                      <table className="detail-table">
                        <tbody>
                          <tr>
                            <td>Ngày khởi công</td>
                            <td>{project.progress?.startDate ? new Date(project.progress.startDate).toLocaleDateString('vi-VN') : 'Đang cập nhật'}</td>
                          </tr>
                          <tr>
                            <td>Ngày hoàn thành</td>
                            <td>{project.progress?.completionDate ? new Date(project.progress.completionDate).toLocaleDateString('vi-VN') : 'Đang cập nhật'}</td>
                          </tr>
                          <tr>
                            <td>Ngày bàn giao</td>
                            <td>{project.progress?.handoverDate ? new Date(project.progress.handoverDate).toLocaleDateString('vi-VN') : 'Đang cập nhật'}</td>
                          </tr>
                          <tr>
                            <td>Tiến độ hiện tại</td>
                            <td>
                              <div className="progress-bar">
                                <div className="progress-fill" style={{width: `${project.progress?.currentProgress || 0}%`}}></div>
                                <span className="progress-text">{project.progress?.currentProgress || 0}%</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {project.legal && (
                      <div className="detail-group">
                        <h3>Pháp lý</h3>
                        <table className="detail-table">
                          <tbody>
                            <tr>
                              <td>Loại hình sở hữu</td>
                              <td>{project.legal.legalType === 'red-book' ? 'Sổ đỏ lâu dài' : project.legal.legalType}</td>
                            </tr>
                            <tr>
                              <td>Mô tả</td>
                              <td>{project.legal.description}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Mặt bằng */}
              {activeTab === 'masterplan' && (
                <section className="masterplan-section">
                  <h2>Mặt bằng dự án</h2>
                  {project.masterPlan ? (
                    <div className="masterplan-content">
                      <img src={project.masterPlan.image} alt="Mặt bằng dự án" />
                      <p className="masterplan-description">{project.masterPlan.description}</p>
                    </div>
                  ) : (
                    <p className="no-data">Thông tin mặt bằng đang được cập nhật</p>
                  )}
                </section>
              )}

              {/* Vị trí */}
              {activeTab === 'utilities' && (
                <section className="location-section">
                  <h2>Vị trí dự án</h2>
                  <div className="location-map">
                    <iframe
                      src={`https://www.google.com/maps?q=${project.coordinates?.lat},${project.coordinates?.lng}&output=embed`}
                      width="100%"
                      height="450"
                      style={{border: 0}}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                  </div>

                  {project.nearbyPlaces && project.nearbyPlaces.length > 0 && (
                    <div className="nearby-places">
                      <h3>Tiện ích lân cận</h3>
                      <div className="places-list">
                        {project.nearbyPlaces.map((place, index) => (
                          <div key={index} className="place-item">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <div className="place-info">
                              <span className="place-name">{place.name}</span>
                              <span className="place-distance">{place.distance}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* Ước tính khoản vay */}
              {activeTab === 'loan' && (
                <section className="loan-section">
                  <h2>Ước tính khoản vay</h2>
                  <div className="loan-calculator">
                    <p className="note">Công cụ tính toán khoản vay đang được phát triển</p>
                  </div>
                </section>
              )}
            </main>

            {/* Sidebar */}
            <aside className="sidebar">
              <div className="contact-box">
                <h3>Thông tin liên hệ</h3>
                <div className="contact-info">
                  {project.contact?.hotline && (
                    <div className="contact-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      <div>
                        <span className="label">Hotline</span>
                        <a href={`tel:${project.contact.hotline}`} className="value">{project.contact.hotline}</a>
                      </div>
                    </div>
                  )}
                  {project.contact?.email && (
                    <div className="contact-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <div>
                        <span className="label">Email</span>
                        <a href={`mailto:${project.contact.email}`} className="value">{project.contact.email}</a>
                      </div>
                    </div>
                  )}
                  {project.contact?.website && (
                    <div className="contact-item">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                      <div>
                        <span className="label">Website</span>
                        <a href={`https://${project.contact.website}`} target="_blank" rel="noopener noreferrer" className="value">{project.contact.website}</a>
                      </div>
                    </div>
                  )}
                </div>
                <button className="btn-contact">Liên hệ tư vấn</button>
              </div>

              {/* Tin tức dự án */}
              {project.news && project.news.length > 0 && (
                <div className="news-box">
                  <h3>Tin tức về dự án</h3>
                  <div className="news-list">
                    {project.news.map((item, index) => (
                      <div key={index} className="news-item">
                        <img src={item.image} alt={item.title} />
                        <div className="news-content">
                          <h4>{item.title}</h4>
                          <span className="news-date">
                            {new Date(item.date).toLocaleDateString('vi-VN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Thống kê */}
              <div className="stats-box">
                <div className="stat-item">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  <div>
                    <span className="stat-value">{project.views?.toLocaleString() || 0}</span>
                    <span className="stat-label">Lượt xem</span>
                  </div>
                </div>
                <div className="stat-item">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <div>
                    <span className="stat-value">{project.favorites?.toLocaleString() || 0}</span>
                    <span className="stat-label">Quan tâm</span>
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

export default ProjectDetail
