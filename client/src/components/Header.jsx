import { Link } from 'react-router-dom'
import './Header.css'

function Header() {
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
              <button className="btn-favorite" title="Yêu thích">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </button>
              <Link to="/login" className="btn-login">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Đăng nhập
              </Link>
              <Link to="/register" className="btn-register">Đăng ký</Link>
              <button className="btn-post">Đăng tin</button>
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
