import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Payment.css'

function Payment() {
  const { propertyId } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    durationDays: 30,
    paymentMethod: 'bank_transfer'
  })
  
  const [calculation, setCalculation] = useState({
    pricePerDay: 50000,
    amount: 1500000
  })

  const [payment, setPayment] = useState(null)
  const [step, setStep] = useState(1) // 1: Chọn gói, 2: Thanh toán, 3: Hoàn thành
  const [pollingInterval, setPollingInterval] = useState(null)

  useEffect(() => {
    fetchProperty()
  }, [propertyId])

  useEffect(() => {
    calculatePayment()
  }, [formData.durationDays])

  // Auto-check payment status khi ở step 2 với SePay QR
  useEffect(() => {
    if (step === 2 && payment && formData.paymentMethod === 'sepay_qr') {
      // Bắt đầu polling mỗi 5 giây
      const interval = setInterval(() => {
        checkPaymentStatus(payment.payment?._id || payment._id, true)
      }, 5000)
      
      setPollingInterval(interval)
      
      // Cleanup khi unmount hoặc chuyển step
      return () => {
        if (interval) clearInterval(interval)
      }
    } else {
      // Stop polling khi không ở step 2
      if (pollingInterval) {
        clearInterval(pollingInterval)
        setPollingInterval(null)
      }
    }
  }, [step, payment, formData.paymentMethod])

  const fetchProperty = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/properties/${propertyId}`)
      const data = await response.json()
      if (data) {
        setProperty(data)
      }
    } catch (error) {
      console.error('Error fetching property:', error)
      setError('Không thể tải thông tin tin đăng')
    } finally {
      setLoading(false)
    }
  }

  const calculatePayment = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/payment/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ durationDays: formData.durationDays })
      })
      const data = await response.json()
      if (data.success) {
        setCalculation(data.data)
      }
    } catch (error) {
      console.error('Error calculating:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      const response = await fetch('http://localhost:5000/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          propertyId,
          durationDays: formData.durationDays,
          paymentMethod: formData.paymentMethod
        })
      })

      const data = await response.json()
      
      if (data.success) {
        console.log('💳 Payment created:', data.data)
        console.log('💳 Payment ID:', data.data.payment?._id || data.data._id)
        setPayment(data.data)
        setStep(2)
      } else {
        setError(data.message || 'Tạo đơn thanh toán thất bại')
      }
    } catch (error) {
      console.error('Error creating payment:', error)
      setError('Không thể kết nối đến server')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUploadProof = async (e) => {
    e.preventDefault()
    const transferImage = document.getElementById('transferImage').value
    
    if (!transferImage) {
      alert('Vui lòng nhập link ảnh chuyển khoản')
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/api/payment/upload-proof/${payment.payment?._id || payment._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          transferImage,
          bankName: payment.bankInfo.bankName,
          accountNumber: payment.bankInfo.accountNumber,
          transferContent: payment.bankInfo.transferContent
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setStep(3)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error uploading proof:', error)
      alert('Lỗi upload ảnh chuyển khoản')
    }
  }

  const checkPaymentStatus = async (paymentId, silent = false) => {
    try {
      console.log('🔍 Checking payment status for ID:', paymentId)
      const response = await fetch(`http://localhost:5000/api/sepay/check-payment/${paymentId}`)
      const data = await response.json()
      
      console.log('📊 Payment status response:', data)
      
      if (data.success) {
        if (data.data.status === 'completed') {
          if (!silent) alert('✅ Thanh toán thành công!')
          // Stop polling
          if (pollingInterval) {
            clearInterval(pollingInterval)
            setPollingInterval(null)
          }
          setStep(3)
        } else if (data.data.webhookReceived) {
          if (!silent) alert('⏳ Đã nhận được thanh toán, đang xử lý...')
        } else {
          if (!silent) alert('⏳ Chưa nhận được thanh toán. Vui lòng thử lại sau.')
        }
      }
    } catch (error) {
      console.error('Error checking payment:', error)
      if (!silent) alert('Lỗi kiểm tra trạng thái thanh toán')
    }
  }

  if (loading) {
    return <div className="payment-page"><div className="loading">Đang tải...</div></div>
  }

  if (!property) {
    return <div className="payment-page"><div className="error">Không tìm thấy tin đăng</div></div>
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <h1>Thanh Toán Tin Đăng</h1>
          <div className="payment-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Chọn gói</div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Thanh toán</div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Hoàn thành</div>
          </div>
        </div>

        {/* Thông tin tin đăng */}
        <div className="property-info">
          <img src={property.image} alt={property.title} />
          <div>
            <h3>{property.title}</h3>
            <p>{property.location}</p>
            <p className="price">{property.price?.toLocaleString('vi-VN')} VNĐ</p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Bước 1: Chọn gói */}
        {step === 1 && (
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-section">
              <h2>Chọn Thời Gian Đăng Tin</h2>
              <div className="duration-options">
                <label className={formData.durationDays === 30 ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="duration"
                    value="30"
                    checked={formData.durationDays === 30}
                    onChange={(e) => setFormData({...formData, durationDays: 30})}
                  />
                  <div className="option-content">
                    <span className="duration">1 Tháng</span>
                    <span className="price">1,500,000 VNĐ</span>
                    <span className="note">50,000 VNĐ/ngày</span>
                  </div>
                </label>

                <label className={formData.durationDays === 60 ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="duration"
                    value="60"
                    checked={formData.durationDays === 60}
                    onChange={(e) => setFormData({...formData, durationDays: 60})}
                  />
                  <div className="option-content">
                    <span className="duration">2 Tháng</span>
                    <span className="price">3,000,000 VNĐ</span>
                    <span className="note">Tiết kiệm 0 VNĐ</span>
                  </div>
                </label>

                <label className={formData.durationDays === 90 ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="duration"
                    value="90"
                    checked={formData.durationDays === 90}
                    onChange={(e) => setFormData({...formData, durationDays: 90})}
                  />
                  <div className="option-content">
                    <span className="duration">3 Tháng</span>
                    <span className="price">4,500,000 VNĐ</span>
                    <span className="note popular">Phổ biến nhất</span>
                  </div>
                </label>
              </div>

              <div className="custom-duration">
                <label>Hoặc nhập số ngày tùy chỉnh (tối thiểu 30 ngày):</label>
                <input
                  type="number"
                  min="30"
                  value={formData.durationDays}
                  onChange={(e) => setFormData({...formData, durationDays: parseInt(e.target.value) || 30})}
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Phương Thức Thanh Toán</h2>
              <div className="payment-methods">
                <label className={formData.paymentMethod === 'sepay_qr' ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="sepay_qr"
                    checked={formData.paymentMethod === 'sepay_qr'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <div className="method-content">
                    <span className="method-name">🔥 Quét mã QR (Khuyến nghị)</span>
                    <span className="method-desc">Tự động xác nhận trong 10 giây</span>
                  </div>
                </label>

                <label className={formData.paymentMethod === 'bank_transfer' ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={formData.paymentMethod === 'bank_transfer'}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  />
                  <div className="method-content">
                    <span className="method-name">Chuyển khoản ngân hàng</span>
                    <span className="method-desc">Cần upload ảnh xác nhận</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="payment-summary">
              <h3>Tổng Kết</h3>
              <div className="summary-row">
                <span>Thời gian:</span>
                <span>{formData.durationDays} ngày</span>
              </div>
              <div className="summary-row">
                <span>Đơn giá:</span>
                <span>50,000 VNĐ/ngày</span>
              </div>
              <div className="summary-row total">
                <span>Tổng cộng:</span>
                <span>{calculation.amountFormatted}</span>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Đang xử lý...' : 'Tiếp Tục Thanh Toán'}
            </button>
          </form>
        )}

        {/* Bước 2: Thông tin thanh toán */}
        {step === 2 && payment && (
          <div className="payment-info">
            {/* Payment ID Info Box */}
            <div className="payment-id-box">
              <div className="payment-id-header">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '24px', height: '24px'}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <h3>Mã Thanh Toán (Payment ID)</h3>
              </div>
              <div className="payment-id-content">
                <code className="payment-id-code">{payment.payment?._id || payment._id}</code>
                <button 
                  className="btn-copy-id"
                  onClick={() => {
                    navigator.clipboard.writeText(payment.payment?._id || payment._id)
                    alert('Đã copy Payment ID!')
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                  Copy
                </button>
              </div>
              <p className="payment-id-note">
                ⚠️ <strong>LƯU Ý:</strong> Đây là mã thanh toán (Payment ID), KHÔNG phải mã sản phẩm (Property ID). 
                Vui lòng sử dụng mã này khi chuyển khoản!
              </p>
            </div>

            {/* SePay QR Code */}
            {formData.paymentMethod === 'sepay_qr' && payment.sepayInfo && (
              <div className="sepay-qr-section">
                <h2>Quét Mã QR Để Thanh Toán</h2>
                <div className="qr-container">
                  <img 
                    src={payment.sepayInfo.qrCodeUrl} 
                    alt="QR Code" 
                    className="qr-code"
                  />
                </div>
                
                <div className="payment-instructions">
                  <h3>Hướng dẫn thanh toán:</h3>
                  <ol>
                    <li>Mở ứng dụng ngân hàng trên điện thoại</li>
                    <li>Chọn chức năng quét mã QR</li>
                    <li>Quét mã QR bên trên</li>
                    <li>Kiểm tra thông tin và xác nhận thanh toán</li>
                    <li>Hệ thống sẽ tự động xác nhận trong vòng 10 giây</li>
                  </ol>
                </div>

                <div className="bank-info-card">
                  <h3>Hoặc chuyển khoản thủ công:</h3>
                  <div className="info-row">
                    <span>Ngân hàng:</span>
                    <strong>{payment.sepayInfo.bankName}</strong>
                  </div>
                  <div className="info-row">
                    <span>Số tài khoản:</span>
                    <strong>{payment.sepayInfo.accountNumber}</strong>
                  </div>
                  <div className="info-row">
                    <span>Chủ tài khoản:</span>
                    <strong>{payment.sepayInfo.accountName}</strong>
                  </div>
                  <div className="info-row">
                    <span>Số tiền:</span>
                    <strong className="amount">{payment.sepayInfo.amount.toLocaleString('vi-VN')} VNĐ</strong>
                  </div>
                  <div className="info-row important">
                    <span>Nội dung CK:</span>
                    <strong className="transfer-content">{payment.sepayInfo.transferContent}</strong>
                  </div>
                  <p className="warning">⚠️ Vui lòng nhập chính xác nội dung chuyển khoản để hệ thống tự động xác nhận</p>
                </div>

                <div className="waiting-section">
                  <div className="spinner"></div>
                  <p>Đang chờ thanh toán...</p>
                  <p className="auto-check">Hệ thống tự động kiểm tra mỗi 5 giây</p>
                  <button 
                    onClick={() => checkPaymentStatus(payment.payment?._id || payment._id, false)} 
                    className="btn-check-status"
                  >
                    Kiểm tra ngay
                  </button>
                </div>
              </div>
            )}

            {/* Bank Transfer */}
            {formData.paymentMethod === 'bank_transfer' && payment.bankInfo && (
              <>
                <h2>Thông Tin Chuyển Khoản</h2>
                <div className="bank-info">
                  <div className="info-row">
                    <span>Ngân hàng:</span>
                    <strong>{payment.bankInfo.bankName}</strong>
                  </div>
                  <div className="info-row">
                    <span>Số tài khoản:</span>
                    <strong>{payment.bankInfo.accountNumber}</strong>
                  </div>
                  <div className="info-row">
                    <span>Chủ tài khoản:</span>
                    <strong>{payment.bankInfo.accountName}</strong>
                  </div>
                  <div className="info-row">
                    <span>Số tiền:</span>
                    <strong className="amount">{payment.bankInfo.amount.toLocaleString('vi-VN')} VNĐ</strong>
                  </div>
                  <div className="info-row">
                    <span>Nội dung:</span>
                    <strong className="transfer-content">{payment.bankInfo.transferContent}</strong>
                  </div>
                </div>

                <div className="upload-proof">
                  <h3>Upload Ảnh Chuyển Khoản</h3>
                  <p>Sau khi chuyển khoản, vui lòng upload ảnh xác nhận để admin duyệt</p>
                  <form onSubmit={handleUploadProof}>
                    <input
                      type="text"
                      id="transferImage"
                      placeholder="Nhập link ảnh chuyển khoản (imgur, cloudinary...)"
                      required
                    />
                    <button type="submit" className="btn-submit">Xác Nhận Đã Chuyển Khoản</button>
                  </form>
                </div>
              </>
            )}
          </div>
        )}

        {/* Bước 3: Hoàn thành */}
        {step === 3 && (
          <div className="payment-success">
            <div className="success-icon">✓</div>
            <h2>Gửi Yêu Cầu Thành Công!</h2>
            <p>Chúng tôi đã nhận được thông tin thanh toán của bạn.</p>
            <p>Admin sẽ xác nhận trong vòng 24h.</p>
            <p>Tin đăng sẽ được kích hoạt sau khi thanh toán được xác nhận.</p>
            <div className="success-actions">
              <button onClick={() => navigate('/my-properties')} className="btn-primary">
                Quản Lý Tin Đăng
              </button>
              <button onClick={() => navigate('/')} className="btn-secondary">
                Về Trang Chủ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Payment
