import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './MyPayments.css'

function MyPayments() {
  const navigate = useNavigate()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      const response = await fetch('http://localhost:5000/api/payment/my-payments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      if (data.success) {
        setPayments(data.data)
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: 'Chờ xác nhận', class: 'warning' },
      completed: { text: 'Đã thanh toán', class: 'success' },
      failed: { text: 'Thất bại', class: 'danger' },
      refunded: { text: 'Đã hoàn tiền', class: 'info' }
    }
    const badge = badges[status] || badges.pending
    return <span className={`status-badge ${badge.class}`}>{badge.text}</span>
  }

  if (loading) {
    return <div className="my-payments-page"><div className="loading">Đang tải...</div></div>
  }

  return (
    <div className="my-payments-page">
      <div className="container">
        <div className="page-header">
          <h1>Lịch Sử Thanh Toán</h1>
          <p>Quản lý các giao dịch thanh toán tin đăng của bạn</p>
        </div>

        {payments.length === 0 ? (
          <div className="empty-state">
            <p>Bạn chưa có giao dịch thanh toán nào</p>
            <button onClick={() => navigate('/my-properties')} className="btn-primary">
              Quản Lý Tin Đăng
            </button>
          </div>
        ) : (
          <div className="payments-list">
            {payments.map(payment => (
              <div key={payment._id} className="payment-card">
                <div className="payment-header">
                  <div className="payment-id">
                    <span>Mã GD:</span>
                    <strong>{payment._id.slice(-8).toUpperCase()}</strong>
                  </div>
                  {getStatusBadge(payment.status)}
                </div>

                {payment.property && (
                  <div className="property-info">
                    <img src={payment.property.image} alt={payment.property.title} />
                    <div className="property-details">
                      <h3>{payment.property.title}</h3>
                      <p>{payment.property.location}</p>
                      <p className="price">{payment.property.price?.toLocaleString('vi-VN')} VNĐ</p>
                    </div>
                  </div>
                )}

                <div className="payment-details">
                  <div className="detail-row">
                    <span>Thời gian:</span>
                    <strong>{payment.durationDays} ngày</strong>
                  </div>
                  <div className="detail-row">
                    <span>Từ ngày:</span>
                    <strong>{new Date(payment.startDate).toLocaleDateString('vi-VN')}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Đến ngày:</span>
                    <strong>{new Date(payment.endDate).toLocaleDateString('vi-VN')}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Phương thức:</span>
                    <strong>Chuyển khoản ngân hàng</strong>
                  </div>
                  <div className="detail-row total">
                    <span>Tổng tiền:</span>
                    <strong>{payment.amount.toLocaleString('vi-VN')} VNĐ</strong>
                  </div>
                </div>

                <div className="payment-footer">
                  <span className="date">
                    {new Date(payment.createdAt).toLocaleString('vi-VN')}
                  </span>
                  {payment.status === 'completed' && payment.confirmedAt && (
                    <span className="confirmed">
                      Xác nhận: {new Date(payment.confirmedAt).toLocaleDateString('vi-VN')}
                    </span>
                  )}
                </div>

                {payment.adminNote && (
                  <div className="admin-note">
                    <strong>Ghi chú từ Admin:</strong> {payment.adminNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyPayments
