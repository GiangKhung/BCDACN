import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

function GoogleAuthSuccess() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (token) {
      // Lưu token
      localStorage.setItem('token', token)
      
      // Lấy thông tin user
      fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data.user) {
            localStorage.setItem('user', JSON.stringify(data.data.user))
            window.dispatchEvent(new Event('userLoggedIn'))
            
            // Redirect based on role
            if (data.data.user.role === 'admin') {
              navigate('/admin')
            } else {
              navigate('/')
            }
          } else {
            navigate('/login?error=auth_failed')
          }
        })
        .catch(error => {
          console.error('Error fetching user:', error)
          navigate('/login?error=auth_failed')
        })
    } else {
      navigate('/login?error=no_token')
    }
  }, [searchParams, navigate])

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div className="spinner"></div>
      <p>Đang xử lý đăng nhập...</p>
    </div>
  )
}

export default GoogleAuthSuccess
