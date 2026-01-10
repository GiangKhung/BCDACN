import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import './GoogleLoginButton.css'

function GoogleLoginButton({ onSuccess, onError }) {
  const navigate = useNavigate()

  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/google/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          credential: credentialResponse.credential
        })
      })

      const data = await response.json()

      if (response.ok && data.token) {
        // Lưu token và thông tin user
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        // Dispatch event để Header cập nhật
        window.dispatchEvent(new Event('userLoggedIn'))
        
        if (onSuccess) {
          onSuccess(data)
        } else {
          alert('Đăng nhập Google thành công!')
          
          // Redirect based on role
          if (data.user.role === 'admin') {
            navigate('/admin')
          } else {
            navigate('/')
          }
        }
      } else {
        throw new Error(data.message || 'Đăng nhập Google thất bại')
      }
    } catch (error) {
      console.error('Google login error:', error)
      if (onError) {
        onError(error)
      } else {
        alert('Lỗi đăng nhập Google: ' + error.message)
      }
    }
  }

  const handleError = () => {
    console.error('Google login failed')
    if (onError) {
      onError(new Error('Google login failed'))
    } else {
      alert('Đăng nhập Google thất bại')
    }
  }

  return (
    <div className="google-login-wrapper">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        logo_alignment="left"
      />
    </div>
  )
}

export default GoogleLoginButton
