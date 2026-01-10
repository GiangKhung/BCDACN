import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'

function AdminDashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [revenueChart, setRevenueChart] = useState([])
  const [propertyTypeStats, setPropertyTypeStats] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [checkingExpired, setCheckingExpired] = useState(false)

  useEffect(() => {
    checkAdmin()
    fetchStatistics()
  }, [])

  const checkAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'admin') {
      navigate('/')
    }
  }

  const fetchStatistics = async () => {
    try {
      const token = localStorage.getItem('token')
      
      // Fetch overview
      const overviewRes = await fetch('http://localhost:5000/api/statistics/overview', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const overviewData = await overviewRes.json()
      if (overviewData.success) {
        setStats(overviewData.data)
      }

      // Fetch revenue by month
      const revenueRes = await fetch('http://localhost:5000/api/statistics/revenue-by-month', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const revenueData = await revenueRes.json()
      if (revenueData.success) {
        setRevenueChart(revenueData.data)
      }

      // Fetch property type stats
      const typeRes = await fetch('http://localhost:5000/api/statistics/by-property-type', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const typeData = await typeRes.json()
      if (typeData.success) {
        setPropertyTypeStats(typeData.data)
      }

    } catch (error) {
      console.error('Error fetching statistics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const getPropertyTypeName = (type) => {
    const types = {
      apartment: 'Căn hộ',
      house: 'Nhà riêng',
      villa: 'Biệt thự',
      land: 'Đất nền',
      townhouse: 'Nhà phố',
      office: 'Văn phòng',
      shophouse: 'Shophouse',
      other: 'Khác'
    }
    return types[type] || type
  }

  const getMonthName = (month) => {
    return `Tháng ${month}`
  }

  const handleCheckExpiredProperties = async () => {
    if (!window.confirm('Chạy kiểm tra tin đăng hết hạn ngay bây giờ?')) return

    try {
      setCheckingExpired(true)
      const token = localStorage.getItem('token')
      
      const res = await fetch('http://localhost:5000/api/admin/check-expired-properties', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      const data = await res.json()
      
      if (data.success) {
        if (data.count === 0) {
          alert('✅ Không có tin đăng nào hết hạn')
        } else {
          alert(`✅ Đã deactivate ${data.count} tin đăng hết hạn`)
          fetchStatistics() // Refresh statistics
        }
      } else {
        alert(data.message || 'Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error checking expired properties:', error)
      alert('Có lỗi xảy ra khi kiểm tra tin đăng hết hạn')
    } finally {
      setCheckingExpired(false)
    }
  }

  if (loading) {
    return <div className="admin-dashboard"><div className="loading">Đang tải...</div></div>
  }

  if (!stats) {
    return <div className="admin-dashboard"><div className="error">Không thể tải thống kê</div></div>
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>📊 Dashboard Quản Trị</h1>
          <p>Tổng quan hệ thống bất động sản</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card revenue">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Tổng Doanh Thu</h3>
              <p className="stat-value">{formatCurrency(stats.payments.revenue)}</p>
              <span className="stat-label">
                Hôm nay: {formatCurrency(stats.payments.todayRevenue)}
              </span>
            </div>
          </div>

          <div className="stat-card properties">
            <div className="stat-icon">🏠</div>
            <div className="stat-content">
              <h3>Tin Đăng</h3>
              <p className="stat-value">{stats.properties.total}</p>
              <span className="stat-label">
                Đang hoạt động: {stats.properties.active}
              </span>
            </div>
          </div>

          <div className="stat-card payments">
            <div className="stat-icon">💳</div>
            <div className="stat-content">
              <h3>Thanh Toán</h3>
              <p className="stat-value">{stats.payments.total}</p>
              <span className="stat-label">
                Chờ xác nhận: {stats.payments.pending}
              </span>
            </div>
          </div>

          <div className="stat-card users">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>Người Dùng</h3>
              <p className="stat-value">{stats.users.total}</p>
              <span className="stat-label">
                Mới hôm nay: {stats.users.newToday}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="dashboard-tabs">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Tổng Quan
          </button>
          <button 
            className={activeTab === 'revenue' ? 'active' : ''}
            onClick={() => setActiveTab('revenue')}
          >
            Doanh Thu
          </button>
          <button 
            className={activeTab === 'properties' ? 'active' : ''}
            onClick={() => setActiveTab('properties')}
          >
            Tin Đăng
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="content-grid">
                <div className="content-card">
                  <h3>📈 Trạng Thái Tin Đăng</h3>
                  <div className="status-list">
                    <div className="status-item">
                      <span>Đang hoạt động</span>
                      <strong className="success">{stats.properties.active}</strong>
                    </div>
                    <div className="status-item">
                      <span>Chờ thanh toán</span>
                      <strong className="warning">{stats.properties.pending}</strong>
                    </div>
                    <div className="status-item">
                      <span>Đã bán</span>
                      <strong className="info">{stats.properties.sold}</strong>
                    </div>
                    <div className="status-item">
                      <span>Mới hôm nay</span>
                      <strong className="primary">{stats.properties.newToday}</strong>
                    </div>
                  </div>
                </div>

                <div className="content-card">
                  <h3>💳 Trạng Thái Thanh Toán</h3>
                  <div className="status-list">
                    <div className="status-item">
                      <span>Hoàn thành</span>
                      <strong className="success">{stats.payments.completed}</strong>
                    </div>
                    <div className="status-item">
                      <span>Chờ xác nhận</span>
                      <strong className="warning">{stats.payments.pending}</strong>
                    </div>
                    <div className="status-item">
                      <span>Yêu cầu gỡ tin</span>
                      <strong className="danger">{stats.removalRequests.pending}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="quick-actions">
                <h3>⚡ Thao Tác Nhanh</h3>
                <div className="action-buttons">
                  <button onClick={() => navigate('/admin/payments')} className="action-btn">
                    <span>💳</span>
                    <div>
                      <strong>Xác Nhận Thanh Toán</strong>
                      <small>{stats.payments.pending} đơn chờ</small>
                    </div>
                  </button>
                  <button onClick={() => navigate('/admin/removal-requests')} className="action-btn">
                    <span>🗑️</span>
                    <div>
                      <strong>Yêu Cầu Gỡ Tin</strong>
                      <small>{stats.removalRequests.pending} yêu cầu</small>
                    </div>
                  </button>
                  <button onClick={() => navigate('/admin/properties')} className="action-btn">
                    <span>🏠</span>
                    <div>
                      <strong>Quản Lý Tin Đăng</strong>
                      <small>{stats.properties.total} tin</small>
                    </div>
                  </button>
                  <button onClick={() => navigate('/admin/users')} className="action-btn">
                    <span>👥</span>
                    <div>
                      <strong>Quản Lý Users</strong>
                      <small>{stats.users.total} người dùng</small>
                    </div>
                  </button>
                  <button onClick={handleCheckExpiredProperties} className="action-btn action-btn-warning">
                    <span>⏰</span>
                    <div>
                      <strong>Kiểm Tra Tin Hết Hạn</strong>
                      <small>Chạy ngay</small>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'revenue' && (
            <div className="revenue-content">
              <div className="content-card">
                <h3>📊 Doanh Thu Theo Tháng ({new Date().getFullYear()})</h3>
                <div className="chart-container">
                  <div className="bar-chart">
                    {revenueChart.map(item => (
                      <div key={item.month} className="bar-item">
                        <div 
                          className="bar" 
                          style={{ 
                            height: `${(item.revenue / Math.max(...revenueChart.map(i => i.revenue))) * 200}px` 
                          }}
                          title={formatCurrency(item.revenue)}
                        >
                          <span className="bar-value">{item.count}</span>
                        </div>
                        <span className="bar-label">{getMonthName(item.month)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="chart-legend">
                  <p>Tổng doanh thu: <strong>{formatCurrency(stats.payments.revenue)}</strong></p>
                  <p>Số giao dịch: <strong>{stats.payments.completed}</strong></p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="properties-content">
              <div className="content-card">
                <h3>🏘️ Thống Kê Theo Loại BĐS</h3>
                <div className="property-type-list">
                  {propertyTypeStats.map(item => (
                    <div key={item._id} className="property-type-item">
                      <div className="type-info">
                        <span className="type-name">{getPropertyTypeName(item._id)}</span>
                        <span className="type-count">{item.count} tin</span>
                      </div>
                      <div className="type-bar">
                        <div 
                          className="type-bar-fill" 
                          style={{ 
                            width: `${(item.count / stats.properties.total) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="type-percent">
                        {((item.count / stats.properties.total) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
