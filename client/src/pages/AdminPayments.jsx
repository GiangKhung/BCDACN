import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminPayments.css'

function AdminPayments() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [payments, setPayments] = useState([])
  const [filter, setFilter] = useState('pending')
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [adminNote, setAdminNote] = useState('')
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    checkAdmin()
    fetchPayments()
  }, [filter])

  const checkAdmin = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'admin') {
      navigate('/')
    }
  }

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:5000/api/admin/payments?status=${filter}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        setPayments(data.data)
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetail = (payment) => {
    setSelectedPayment(payment)
    setAdminNote('')
    setShowModal(true)
  }

  const handleConfirm = async () => {
    if (!selectedPayment) return
    
    if (!window.confirm('Xác nhận thanh toán này?')) return

    try {
      setProcessing(true)
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:5000/api/admin/payments/${selectedPayment._id}/confirm`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ adminNote })
      })

      const data = await res.json()
      if (data.success) {
        alert('Xác nhận thanh toán thành công!')
        setShowModal(false)
        fetchPayments()
      } else {
        alert(data.message || 'Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error confirming payment:', error)
      alert('Có lỗi xảy ra')
    } finally {
      setProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!selectedPayment) return
    
    if (!adminNote.trim()) {
      alert('Vui lòng nhập lý do từ chối')
      return
    }

    if (!window.confirm('Từ chối thanh toán này?')) return

    try {
      setProcessing(true)
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:5000/api/admin/payments/${selectedPayment._id}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ adminNote })
      })

      const data = await res.json()
      if (data.success) {
        alert('Đã từ chối thanh toán')
        setShowModal(false)
        fetchPayments()
      } else {
        alert(data.message || 'Có lỗi xảy ra')
      }
    } catch (error) {
      console.error('Error rejecting payment:', error)
      alert('Có lỗi xảy ra')
    } finally {
      setProcessing(false)
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('vi-VN')
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: 'Chờ xác nhận', class: 'warning' },
      completed: { text: 'Đã xác nhận', class: 'success' },
      failed: { text: 'Thất bại', class: 'danger' },
      refunded: { text: 'Đã hoàn tiền', class: 'info' }
    }
    const badge = badges[status] || badges.pending
    return <span className={`status-badge ${badge.class}`}>{badge.text}</span>
  }

  const getPaymentMethodText = (method) => {
    const methods = {
      bank_transfer: 'Chuyển khoản',
      momo: 'MoMo',
      vnpay: 'VNPay',
      cash: 'Tiền mặt'
    }
    return methods[method] || method
  }

  if (loading) {
    return <div className="admin-payments"><div className="loading">Đang tải...</div></div>
  }

  return (
    <div className="admin-payments">
      <div className="payments-container">
        <div className="payments-header">
          <h1>💳 Quản Lý Thanh Toán</h1>
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
            Chờ xác nhận
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Đã xác nhận
          </button>
          <button 
            className={filter === 'failed' ? 'active' : ''}
            onClick={() => setFilter('failed')}
          >
            Thất bại
          </button>
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            Tất cả
          </button>
        </div>

        {/* Payments List */}
        <div className="payments-list">
          {payments.length === 0 ? (
            <div className="empty-state">
              <p>Không có thanh toán nào</p>
            </div>
          ) : (
            <div className="payments-table">
              <table>
                <thead>
                  <tr>
                    <th>Mã GD</th>
                    <th>Người dùng</th>
                    <th>Tin đăng</th>
                    <th>Số tiền</th>
                    <th>Thời gian</th>
                    <th>Phương thức</th>
                    <th>Trạng thái</th>
                    <th>Ngày tạo</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map(payment => (
                    <tr key={payment._id}>
                      <td className="transaction-id">
                        {payment.transactionId || payment._id.slice(-8)}
                      </td>
                      <td>
                        <div className="user-info">
                          <strong>{payment.user?.name}</strong>
                          <small>{payment.user?.phone}</small>
                        </div>
                      </td>
                      <td>
                        <div className="property-info">
                          <strong>{payment.property?.title}</strong>
                          <small>{payment.property?.location}</small>
                        </div>
                      </td>
                      <td className="amount">{formatCurrency(payment.amount)}</td>
                      <td>{payment.durationDays} ngày</td>
                      <td>{getPaymentMethodText(payment.paymentMethod)}</td>
                      <td>{getStatusBadge(payment.status)}</td>
                      <td>{formatDate(payment.createdAt)}</td>
                      <td>
                        <button 
                          onClick={() => handleViewDetail(payment)}
                          className="btn-view"
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showModal && selectedPayment && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Chi Tiết Thanh Toán</h2>
              <button onClick={() => setShowModal(false)} className="btn-close">×</button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Thông tin giao dịch</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Mã giao dịch:</label>
                    <span>{selectedPayment.transactionId || 'Chưa có'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Trạng thái:</label>
                    {getStatusBadge(selectedPayment.status)}
                  </div>
                  <div className="detail-item">
                    <label>Số tiền:</label>
                    <span className="amount">{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Thời gian:</label>
                    <span>{selectedPayment.durationDays} ngày</span>
                  </div>
                  <div className="detail-item">
                    <label>Từ ngày:</label>
                    <span>{formatDate(selectedPayment.startDate)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Đến ngày:</label>
                    <span>{formatDate(selectedPayment.endDate)}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Thông tin người dùng</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Họ tên:</label>
                    <span>{selectedPayment.user?.name}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{selectedPayment.user?.email}</span>
                  </div>
                  <div className="detail-item">
                    <label>Số điện thoại:</label>
                    <span>{selectedPayment.user?.phone}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Thông tin tin đăng</h3>
                <div className="detail-grid">
                  <div className="detail-item full-width">
                    <label>Tiêu đề:</label>
                    <span>{selectedPayment.property?.title}</span>
                  </div>
                  <div className="detail-item full-width">
                    <label>Địa chỉ:</label>
                    <span>{selectedPayment.property?.location}</span>
                  </div>
                </div>
              </div>

              {selectedPayment.bankTransferInfo && (
                <div className="detail-section">
                  <h3>Thông tin chuyển khoản</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Ngân hàng:</label>
                      <span>{selectedPayment.bankTransferInfo.bankName}</span>
                    </div>
                    <div className="detail-item">
                      <label>Số tài khoản:</label>
                      <span>{selectedPayment.bankTransferInfo.accountNumber}</span>
                    </div>
                    <div className="detail-item">
                      <label>Tên tài khoản:</label>
                      <span>{selectedPayment.bankTransferInfo.accountName}</span>
                    </div>
                    <div className="detail-item">
                      <label>Nội dung CK:</label>
                      <span>{selectedPayment.bankTransferInfo.transferContent}</span>
                    </div>
                  </div>
                  {selectedPayment.bankTransferInfo.transferImage && (
                    <div className="transfer-image">
                      <label>Ảnh chuyển khoản:</label>
                      <img src={selectedPayment.bankTransferInfo.transferImage} alt="Transfer proof" />
                    </div>
                  )}
                </div>
              )}

              {selectedPayment.note && (
                <div className="detail-section">
                  <h3>Ghi chú của người dùng</h3>
                  <p>{selectedPayment.note}</p>
                </div>
              )}

              {selectedPayment.status === 'pending' && (
                <div className="detail-section">
                  <h3>Ghi chú admin</h3>
                  <textarea
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="Nhập ghi chú (bắt buộc nếu từ chối)"
                    rows="3"
                  />
                </div>
              )}

              {selectedPayment.adminNote && (
                <div className="detail-section">
                  <h3>Ghi chú admin</h3>
                  <p>{selectedPayment.adminNote}</p>
                </div>
              )}
            </div>

            {selectedPayment.status === 'pending' && (
              <div className="modal-footer">
                <button 
                  onClick={handleReject}
                  className="btn-reject"
                  disabled={processing}
                >
                  {processing ? 'Đang xử lý...' : 'Từ chối'}
                </button>
                <button 
                  onClick={handleConfirm}
                  className="btn-confirm"
                  disabled={processing}
                >
                  {processing ? 'Đang xử lý...' : 'Xác nhận'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPayments
