import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: phone, 2: full form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePhoneSubmit = (e) => {
    e.preventDefault()
    if (!formData.phone) {
      setError('Vui lòng nhập số điện thoại!')
      return
    }
    setError('')
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate
    if (!formData.name || !formData.email || !formData.password) {
      setError('Vui lòng điền đầy đủ thông tin')
      return
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok && data.token) {
        // Lưu token và thông tin user
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Dispatch event để Header cập nhật
        window.dispatchEvent(new Event('userLoggedIn'))
        
        alert('Đăng ký thành công!')
        navigate('/')
      } else {
        setError(data.message || 'Đăng ký thất bại')
      }
    } catch (error) {
      console.error('Register error:', error)
      setError('Không thể kết nối đến server')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialRegister = (provider) => {
    alert(`Chức năng đăng ký với ${provider} đang được phát triển`)
  }

  return (
    <div className="auth-page">
      <div className="auth-overlay" onClick={() => navigate(-1)}></div>
      <div className="auth-modal auth-modal-large">
        <button className="auth-close" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <div className="auth-content auth-content-register">
          <div className="auth-illustration">
            <div className="auth-illustration-content">
              <img src="/images/auth-illustration.svg" alt="Register" />
              <div className="auth-brand">
                <h3>Tìm nhà đất</h3>
                <p>Batdongsan.com.vn dẫn lối</p>
              </div>
            </div>
          </div>

          <div className="auth-form-container">
            <div className="auth-header">
              <p className="auth-greeting">Xin chào bạn</p>
              <h2>Đăng ký tài khoản mới</h2>
            </div>

            {step === 1 ? (
              <form onSubmit={handlePhoneSubmit} className="auth-form">
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                  <div className="input-wrapper input-phone">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                    <input
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-submit">Tiếp tục</button>

                <div className="divider">
                  <span>Hoặc</span>
                </div>

                <div className="social-login">
                  <button type="button" className="btn-social btn-apple" onClick={() => handleSocialRegister('apple')}>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    Đăng nhập với Apple
                  </button>
                  <button type="button" className="btn-social btn-google" onClick={() => handleSocialRegister('google')}>
                    <svg viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Đăng nhập với Google
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="auth-form">
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Mật khẩu"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={loading}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        {showPassword ? (
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
                        ) : (
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        )}
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-wrapper">
                    <svg className="input-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Xác nhận mật khẩu"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                </button>

                <button type="button" className="btn-back" onClick={() => setStep(1)}>
                  Quay lại
                </button>
              </form>
            )}

            <div className="auth-footer">
              {step === 1 && (
                <p>
                  Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
              )}
              <p className="terms-text">
                Bằng việc tiếp tục, bạn đồng ý với <Link to="/terms" className="terms-link">Điều khoản sử dụng</Link>, <Link to="/privacy" className="terms-link">Chính sách bảo mật</Link>, <Link to="/rules" className="terms-link">Quy chế</Link>, <Link to="/privacy-policy" className="terms-link">Chính sách của chúng tôi</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
