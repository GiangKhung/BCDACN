import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Admin.css'

function Admin() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [users, setUsers] = useState([])
  const [properties, setProperties] = useState([])
  const [usersPage, setUsersPage] = useState(1)
  const [propertiesPage, setPropertiesPage] = useState(1)
  const [totalUsersPages, setTotalUsersPages] = useState(1)
  const [totalPropertiesPages, setTotalPropertiesPages] = useState(1)
  const [approvalFilter, setApprovalFilter] = useState('all')
  const [rejectionReason, setRejectionReason] = useState('')
  const [selectedProperty, setSelectedProperty] = useState(null)
  const navigate = useNavigate()

  const API_URL = 'http://localhost:5000'

  useEffect(() => {
    checkAdminAccess()
    fetchStats()
  }, [])

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers()
    } else if (activeTab === 'properties') {
      fetchProperties()
    }
  }, [activeTab, usersPage, propertiesPage, approvalFilter])

  const checkAdminAccess = () => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    if (!token) {
      alert('Vui lòng đăng nhập để tiếp tục!')
      navigate('/login')
      return
    }
    
    if (user.role !== 'admin') {
      alert('Bạn không có quyền truy cập trang này!')
      navigate('/')
    }
  }

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token')
    return { Authorization: `Bearer ${token}` }
  }

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/stats`, {
        headers: getAuthHeaders()
      })
      setStats(response.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('Phiên đăng nhập hết hạn!')
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/users?page=${usersPage}&limit=10`, {
        headers: getAuthHeaders()
      })
      setUsers(response.data.users)
      setTotalUsersPages(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const fetchProperties = async () => {
    try {
      const url = approvalFilter === 'all' 
        ? `${API_URL}/api/admin/properties?page=${propertiesPage}&limit=10`
        : `${API_URL}/api/admin/properties?page=${propertiesPage}&limit=10&approvalStatus=${approvalFilter}`
      
      const response = await axios.get(url, {
        headers: getAuthHeaders()
      })
      setProperties(response.data.properties)
      setTotalPropertiesPages(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching properties:', error)
    }
  }

  const handleApproveProperty = async (propertyId) => {
    if (!confirm('Bạn có chắc muốn duyệt tin này?')) return

    try {
      await axios.put(`${API_URL}/api/admin/properties/${propertyId}/approve`, {}, {
        headers: getAuthHeaders()
      })
      alert('Duyệt tin thành công!')
      fetchProperties()
      fetchStats()
    } catch (error) {
      console.error('Error approving property:', error)
      alert('Lỗi khi duyệt tin!')
    }
  }

  const handleRejectProperty = async (propertyId) => {
    if (!rejectionReason.trim()) {
      alert('Vui lòng nhập lý do từ chối!')
      return
    }

    try {
      await axios.put(`${API_URL}/api/admin/properties/${propertyId}/reject`, {
        reason: rejectionReason
      }, {
        headers: getAuthHeaders()
      })
      alert('Từ chối tin thành công!')
      setSelectedProperty(null)
      setRejectionReason('')
      fetchProperties()
      fetchStats()
    } catch (error) {
      console.error('Error rejecting property:', error)
      alert('Lỗi khi từ chối tin!')
    }
  }

  const handleDeleteProperty = async (propertyId) => {
    if (!confirm('Bạn có chắc muốn xóa tin này?')) return

    try {
      await axios.delete(`${API_URL}/api/admin/properties/${propertyId}`, {
        headers: getAuthHeaders()
      })
      alert('Xóa tin thành công!')
      fetchProperties()
      fetchStats()
    } catch (error) {
      console.error('Error deleting property:', error)
      alert('Lỗi khi xóa tin!')
    }
  }

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(`${API_URL}/api/admin/users/${userId}`, {
        isActive: !currentStatus
      }, {
        headers: getAuthHeaders()
      })
      alert('Cập nhật trạng thái thành công!')
      fetchUsers()
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Lỗi khi cập nhật!')
    }
  }

  const getApprovalStatusBadge = (status) => {
    const badges = {
      pending: { text: 'Chờ duyệt', class: 'badge-warning' },
      approved: { text: 'Đã duyệt', class: 'badge-success' },
      rejected: { text: 'Từ chối', class: 'badge-danger' }
    }
    const badge = badges[status] || badges.pending
    return <span className={`badge ${badge.class}`}>{badge.text}</span>
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatPrice = (price) => {
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(1)} tỷ`
    }
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(0)} triệu`
    }
    return `${price.toLocaleString('vi-VN')} đ`
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Đang tải...</p>
      </div>
    )
  }

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>🏠 Admin Panel</h2>
        </div>
        
        <nav className="admin-nav">
          <button 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
            </svg>
            Dashboard
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
            Người dùng
          </button>
          
          <button 
            className={`nav-item ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            Bất động sản
          </button>
          
          <button 
            className="nav-item"
            onClick={() => navigate('/')}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/>
            </svg>
            Về trang chủ
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <h1>
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'users' && 'Quản lý người dùng'}
            {activeTab === 'properties' && 'Quản lý bất động sản'}
          </h1>
        </header>

        <div className="admin-content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && stats && (
            <div className="dashboard">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon" style={{background: '#667eea'}}>
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>Tổng người dùng</h3>
                    <p className="stat-number">{stats.totalUsers}</p>
                    <span className="stat-detail">+{stats.newUsersThisMonth} tháng này</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon" style={{background: '#f093fb'}}>
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>Tổng tin đăng</h3>
                    <p className="stat-number">{stats.totalProperties}</p>
                    <span className="stat-detail">+{stats.newPropertiesThisMonth} tháng này</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon" style={{background: '#4facfe'}}>
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>Đã duyệt</h3>
                    <p className="stat-number">{stats.approvedProperties}</p>
                    <span className="stat-detail">Tin đã được duyệt</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon" style={{background: '#feca57'}}>
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>Chờ duyệt</h3>
                    <p className="stat-number">{stats.pendingProperties}</p>
                    <span className="stat-detail">Cần xem xét</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon" style={{background: '#ee5a6f'}}>
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>Từ chối</h3>
                    <p className="stat-number">{stats.rejectedProperties}</p>
                    <span className="stat-detail">Tin bị từ chối</span>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon" style={{background: '#43e97b'}}>
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <div className="stat-info">
                    <h3>User hoạt động</h3>
                    <p className="stat-number">{stats.activeUsers}</p>
                    <span className="stat-detail">Đang hoạt động</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="users-section">
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Số điện thoại</th>
                      <th>Vai trò</th>
                      <th>Trạng thái</th>
                      <th>Ngày tạo</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || 'N/A'}</td>
                        <td>
                          <span className={`badge ${user.role === 'admin' ? 'badge-danger' : 'badge-info'}`}>
                            {user.role === 'admin' ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${user.isActive ? 'badge-success' : 'badge-secondary'}`}>
                            {user.isActive ? 'Hoạt động' : 'Khóa'}
                          </span>
                        </td>
                        <td>{formatDate(user.createdAt)}</td>
                        <td>
                          <button
                            className="btn-action btn-warning"
                            onClick={() => handleToggleUserStatus(user._id, user.isActive)}
                          >
                            {user.isActive ? 'Khóa' : 'Mở khóa'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button
                  disabled={usersPage === 1}
                  onClick={() => setUsersPage(usersPage - 1)}
                >
                  Trước
                </button>
                <span>Trang {usersPage} / {totalUsersPages}</span>
                <button
                  disabled={usersPage === totalUsersPages}
                  onClick={() => setUsersPage(usersPage + 1)}
                >
                  Sau
                </button>
              </div>
            </div>
          )}

          {/* Properties Tab */}
          {activeTab === 'properties' && (
            <div className="properties-section">
              {/* Filter */}
              <div className="filter-bar">
                <button
                  className={`filter-btn ${approvalFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setApprovalFilter('all')}
                >
                  Tất cả ({stats?.totalProperties || 0})
                </button>
                <button
                  className={`filter-btn ${approvalFilter === 'pending' ? 'active' : ''}`}
                  onClick={() => setApprovalFilter('pending')}
                >
                  Chờ duyệt ({stats?.pendingProperties || 0})
                </button>
                <button
                  className={`filter-btn ${approvalFilter === 'approved' ? 'active' : ''}`}
                  onClick={() => setApprovalFilter('approved')}
                >
                  Đã duyệt ({stats?.approvedProperties || 0})
                </button>
                <button
                  className={`filter-btn ${approvalFilter === 'rejected' ? 'active' : ''}`}
                  onClick={() => setApprovalFilter('rejected')}
                >
                  Từ chối ({stats?.rejectedProperties || 0})
                </button>
              </div>

              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tiêu đề</th>
                      <th>Địa điểm</th>
                      <th>Giá</th>
                      <th>Người đăng</th>
                      <th>Trạng thái</th>
                      <th>Ngày đăng</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map(property => (
                      <tr key={property._id}>
                        <td>
                          <div className="property-title">
                            {property.title}
                            {property.verified && <span className="verified-badge">✓</span>}
                          </div>
                        </td>
                        <td>{property.location}</td>
                        <td>{formatPrice(property.price)}</td>
                        <td>
                          {property.userId?.name || 'N/A'}
                          <br />
                          <small>{property.userId?.email}</small>
                        </td>
                        <td>{getApprovalStatusBadge(property.approvalStatus)}</td>
                        <td>{formatDate(property.createdAt)}</td>
                        <td>
                          <div className="action-buttons">
                            {property.approvalStatus === 'pending' && (
                              <>
                                <button
                                  className="btn-action btn-success"
                                  onClick={() => handleApproveProperty(property._id)}
                                  title="Duyệt tin"
                                >
                                  ✓
                                </button>
                                <button
                                  className="btn-action btn-danger"
                                  onClick={() => setSelectedProperty(property)}
                                  title="Từ chối"
                                >
                                  ✗
                                </button>
                              </>
                            )}
                            {property.approvalStatus === 'rejected' && property.rejectionReason && (
                              <button
                                className="btn-action btn-info"
                                onClick={() => alert(`Lý do từ chối:\n${property.rejectionReason}`)}
                                title="Xem lý do từ chối"
                              >
                                ℹ
                              </button>
                            )}
                            <button
                              className="btn-action btn-danger"
                              onClick={() => handleDeleteProperty(property._id)}
                              title="Xóa"
                            >
                              🗑
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button
                  disabled={propertiesPage === 1}
                  onClick={() => setPropertiesPage(propertiesPage - 1)}
                >
                  Trước
                </button>
                <span>Trang {propertiesPage} / {totalPropertiesPages}</span>
                <button
                  disabled={propertiesPage === totalPropertiesPages}
                  onClick={() => setPropertiesPage(propertiesPage + 1)}
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Rejection Modal */}
      {selectedProperty && (
        <div className="modal-overlay" onClick={() => setSelectedProperty(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Từ chối tin đăng</h3>
            <p><strong>Tiêu đề:</strong> {selectedProperty.title}</p>
            <textarea
              placeholder="Nhập lý do từ chối..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows="4"
            />
            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => {
                  setSelectedProperty(null)
                  setRejectionReason('')
                }}
              >
                Hủy
              </button>
              <button
                className="btn-confirm"
                onClick={() => handleRejectProperty(selectedProperty._id)}
              >
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
