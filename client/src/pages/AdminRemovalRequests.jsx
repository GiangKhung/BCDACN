import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminRemovalRequests.css'

function AdminRemovalRequests() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [filter, setFilter] = useState('pending')
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('') // 'approve' or 'reject'
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [note, setNote] = useState('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    checkAdmin()
    fetchRequests()
  }, [filter])

  const checkAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'admin') {
      navigate('/')
    }
  }

  const fetchRequests = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:5000/api/removal-requests?status=${filter}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setRequests(data.data)
      }
    } catch (error) {
      console.error('Error fetching removal requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const openModal = (request, type) => {
    setSelectedRequest(request)
    setModalType(type)
    setNote('')
    setShowModal(true)
  }

  const handleApprove = async () => {
    if (!selectedRequest) return

    try {
      setProcessing(true)
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:5000/api/removal-requests/${selectedRequest._id}/approve`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ note })
      })

      const data = await res.json()
      if (data.success) {
        alert('Đã duyệt yêu cầu gỡ tin')
        setShowModal(false)
        fetchRequests()
      } else {
        alert(data.message || 'Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error approving request:', error)
      alert('Có lỗi xảy ra')
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!selectedRequest) return
    
    if (!note.trim()) {
      alert('Vui lòng nhập lý do từ chối')
      return
    }

    try {
      setProcessing(true)
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:5000/api/removal-requests/${selectedRequest._id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ note })
      })

      const data = await res.json()
      if (data.success) {
        alert('Đã từ chối yêu cầu')
        setShowModal(false)
        fetchRequests()
      } else {
        alert(data.message || 'Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error rejecting request:', error)
      alert('Có lỗi xảy ra')
    } finally {
      setProcessing(false)
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('vi-VN')
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: 'Chờ duyệt', class: 'warning' },
      approved: { text: 'Đã duyệt', class: 'success' },
      rejected: { text: 'Đã từ chối', class: 'danger' }
    }
    const badge = badges[status] || badges.pending
    return <span className={`request-status ${badge.class}`}>{badge.text}</span>
  }

  if (loading) {
    return <div className="admin-removal-requests"><div className="loading">Đang tải...</div></div>
  }

  return (
    <div className="admin-removal-requests">
      <div className="requests-container">
        <div className="requests-header">
          <h1>🗑️ Yêu Cầu Gỡ Tin</h1>
          <button onClick={() => navigate('/admin/dashboard')} className="btn-back">
            ← Quay lại Dashboard
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Chờ duyệt
          </button>
          <button 
            className={filter === 'approved' ? 'active' : ''}
            onClick={() => setFilter('approved')}
          >
            Đã duyệt
          </button>
          <button 
            className={filter === 'rejected' ? 'active' : ''}
            onClick={() => setFilter('rejected')}
          >
            Đã từ chối
          </button>
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Tất cả
          </button>
        </div>

        {/* Requests Grid */}
        {requests.length === 0 ? (
          <div className="empty-state">
            <p>Không có yêu cầu nào</p>
          </div>
        ) : (
          <div className="requests-grid">
            {requests.map(request => (
              <div key={request._id} className="request-card">
                <img 
                  src={request.image || '/placeholder.jpg'} 
                  alt={request.title}
                  className="request-image"
                />
                <div className="request-content">
                  {getStatusBadge(request.removalRequest.status)}
                  
                  <h3 className="request-title">{request.title}</h3>
                  
                  <div className="request-location">
                    📍 {request.location}
                  </div>

                  <div className="request-info">
                    <div className="request-info-item">
                      <label>Người đăng:</label>
                      <span>{request.agent?.name}</span>
                    </div>
                    <div className="request-info-item">
                      <label>SĐT:</label>
                      <span>{request.agent?.phone}</span>
                    </div>
                    <div className="request-info-item">
                      <label>Ngày yêu cầu:</label>
                      <span>{formatDate(request.removalRequest.requestedAt)}</span>
                    </div>
                  </div>

                  {request.removalRequest.reason && (
                    <div className="request-reason">
                      <label>Lý do gỡ tin:</label>
                      <p>{request.removalRequest.reason}</p>
                    </div>
                  )}

                  {request.removalRequest.status === 'pending' && (
                    <div className="request-actions">
                      <button 
                        onClick={() => openModal(request, 'approve')}
                        className="btn-approve"
                      >
                        ✓ Duyệt
                      </button>
                      <button 
                        onClick={() => openModal(request, 'reject')}
                        className="btn-reject"
                      >
                        ✕ Từ chối
                      </button>
                    </div>
                  )}

                  {request.removalRequest.status !== 'pending' && (
                    <div className="request-info">
                      <div className="request-info-item">
                        <label>Xử lý lúc:</label>
                        <span>{formatDate(request.removalRequest.processedAt)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showModal && selectedRequest && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>
                {modalType === 'approve' ? '✓ Duyệt yêu cầu' : '✕ Từ chối yêu cầu'}
              </h2>
              <button onClick={() => setShowModal(false)} className="btn-close">×</button>
            </div>

            <div className="modal-body">
              <p style={{ marginBottom: '15px', color: '#666' }}>
                {modalType === 'approve' 
                  ? 'Xác nhận duyệt yêu cầu gỡ tin này? Tin đăng sẽ được đánh dấu là "Đã bán" và không còn hiển thị.'
                  : 'Xác nhận từ chối yêu cầu gỡ tin này? Vui lòng nhập lý do.'
                }
              </p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={modalType === 'approve' ? 'Ghi chú (tùy chọn)' : 'Lý do từ chối (bắt buộc)'}
                rows="4"
              />
            </div>

            <div className="modal-footer">
              <button 
                onClick={() => setShowModal(false)}
                className="btn-cancel"
                disabled={processing}
              >
                Hủy
              </button>
              <button 
                onClick={modalType === 'approve' ? handleApprove : handleReject}
                className="btn-submit"
                disabled={processing}
              >
                {processing ? 'Đang xử lý...' : 'Xác nhận'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminRemovalRequests
