import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Header.css'

function Header() {
  const [savedCount, setSavedCount] = useState(0)
  const [user, setUser] = useState(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Cập nhật số lượng sản phẩm yêu thích
  useEffect(() => {
    const updateSavedCount = () => {
      const saved = JSON.parse(localStorage.getItem('savedProperties') || '[]')
      setSavedCount(saved.length)
    }

    // Cập nhật lần đầu
    updateSavedCount()

    // Lắng nghe sự kiện storage
    window.addEventListener('storage', updateSavedCount)
    
    // Lắng nghe sự kiện custom để cập nhật realtime
    window.addEventListener('savedPropertiesChanged', updateSavedCount)

    return () => {
      window.removeEventListener('storage', updateSavedCount)
      window.removeEventListener('savedPropertiesChanged', updateSavedCount)
    }
  }, [])

  // Kiểm tra user đã đăng nhập
  useEffect(() => {
    const checkUser = () => {
      const userData = localStorage.getItem('user')
      if (userData) {
        setUser(JSON.parse(userData))
      } else {
        setUser(null)
      }
    }

    checkUser()

    // Lắng nghe sự kiện đăng nhập/đăng xuất
    window.addEventListener('userLoggedIn', checkUser)
    window.addEventListener('userLoggedOut', checkUser)

    return () => {
      window.removeEventListener('userLoggedIn', checkUser)
      window.removeEventListener('userLoggedOut', checkUser)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setShowUserMenu(false)
    window.dispatchEvent(new Event('userLoggedOut'))
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="top-bar">
            <Link to="/" className="logo">
              <div className="logo-icon">
                <img src="/images/logo/batdongsan-logo.png" alt="Batdongsan Logo" />
              </div>
              <div>
                <h1>Batdongsan</h1>
                <div className="logo-subtitle">by PropertyGuru</div>
              </div>
            </Link>
            <div className="nav-actions">
              <Link to="/saved-properties" className="btn-favorite" title="Yêu thích">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                {savedCount > 0 && <span className="favorite-badge">{savedCount}</span>}
              </Link>
              
              {user ? (
                <div className="user-menu-container">
                  <button 
                    className="btn-user" 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <span>{user.name}</span>
                    <svg className="arrow-icon" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 10l5 5 5-5z"/>
                    </svg>
                  </button>
                  
                  {showUserMenu && (
                    <div className="user-dropdown">
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="user-name">{user.name}</div>
                          <div className="user-email">{user.email}</div>
                        </div>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                        Tài khoản của tôi
                      </Link>
                      <Link to="/my-properties" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                        </svg>
                        Tin đăng của tôi
                      </Link>
                      <Link to="/saved-properties" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        Tin đã lưu
                      </Link>
                      {user.role === 'admin' && (
                        <>
                          <div className="dropdown-divider"></div>
                          <Link to="/admin" className="dropdown-item admin-item" onClick={() => setShowUserMenu(false)}>
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                            </svg>
                            Quản trị
                          </Link>
                        </>
                      )}
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
                        </svg>
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn-login">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    Đăng nhập
                  </Link>
                  <Link to="/register" className="btn-register">Đăng ký</Link>
                </>
              )}
              
              <Link to="/post-property" className="btn-post">Đăng tin</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom">
        <div className="container">
          <nav className="nav">
            <ul className="nav-links">
              <li><Link to="/for-sale">Nhà đất bán</Link></li>
              <li><Link to="/for-rent">Nhà đất cho thuê</Link></li>
              <li><Link to="/projects">Dự án</Link></li>
              <li><Link to="/news">Tin tức</Link></li>
              <li><Link to="/wiki">Wiki BDS</Link></li>
              <li><Link to="/analysis">Phân tích đánh giá</Link></li>
              <li><Link to="/directory">Danh bạ</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
