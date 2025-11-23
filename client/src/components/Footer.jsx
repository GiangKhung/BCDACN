import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <div className="logo-wrapper">
                  <div className="logo-icon">
                    <img src="/images/logo/batdongsan-logo.png" alt="Batdongsan Logo" />
                  </div>
                  <div className="logo-text">
                    <h2>Batdongsan</h2>
                    <p className="logo-subtitle">by PropertyGuru</p>
                  </div>
                </div>
              </div>
              <div className="company-info">
                <h3>CÔNG TY CỔ PHẦN PROPERTYGURU VIỆT NAM</h3>
                <p className="address">
                  <span className="icon">📍</span>
                  Tầng 31, Keangnam Hanoi Landmark Tower, Phường Yên Hòa, Thành phố Hà Nội, Việt Nam
                </p>
                <p className="phone">
                  <span className="icon">📞</span>
                  (024) 3562 5939 - (024) 3562 5940
                </p>
                <div className="app-download">
                  <div className="qr-code">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://batdongsan.com.vn" alt="QR Code" />
                  </div>
                  <div className="store-badges">
                    <a href="#" className="store-badge">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
                    </a>
                    <a href="#" className="store-badge">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-col">
              <div className="footer-contact">
                <div className="contact-item">
                  <span className="icon">📞</span>
                  <div>
                    <p className="label">Hotline</p>
                    <p className="value">1900 1881</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="icon">👤</span>
                  <div>
                    <p className="label">Hỗ trợ khách hàng</p>
                    <p className="value">trogiup.batdongsan.com.vn</p>
                  </div>
                </div>
                <div className="contact-item">
                  <span className="icon">💬</span>
                  <div>
                    <p className="label">Chăm sóc khách hàng</p>
                    <p className="value">hotro@batdongsan.com.vn</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-col">
              <h4>HƯỚNG DẪN</h4>
              <ul className="footer-links">
                <li><a href="#">Về chúng tôi</a></li>
                <li><a href="#">Báo giá và hỗ trợ</a></li>
                <li><a href="#">Câu hỏi thường gặp</a></li>
                <li><a href="#">Góp ý báo lỗi</a></li>
                <li><a href="#">Sitemap</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>QUY ĐỊNH</h4>
              <ul className="footer-links">
                <li><a href="#">Quy định đăng tin</a></li>
                <li><a href="#">Quy chế hoạt động</a></li>
                <li><a href="#">Điều khoản thỏa thuận</a></li>
                <li><a href="#">Chính sách bảo mật</a></li>
                <li><a href="#">Giải quyết khiếu nại</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>ĐĂNG KÝ NHẬN TIN</h4>
              <form className="newsletter-form">
                <input type="email" placeholder="Nhập email của bạn" />
                <button type="submit">→</button>
              </form>
              <div className="country-selector">
                <h4>QUỐC GIA & NGÔN NGỮ</h4>
                <select>
                  <option>🌐 Việt Nam</option>
                  <option>🌐 English</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-branches">
        <div className="container">
          <button className="branches-toggle">
            Xem chi nhánh của Batdongsan.com.vn ▼
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>Copyright © 2007 - 2025 Batdongsan.com.vn</p>
              <p className="legal-text">
                Giấy ĐKKD số 0104630479 do Sở KH & ĐT TP Hà Nội cấp lần đầu ngày 02/06/2010
              </p>
            </div>
            <div className="certifications">
              <img src="/images/awards/Bocongthuong.png" alt="DMCA" />
            </div>
            <div className="social-links">
              <a href="#" aria-label="Facebook" className="social-icon facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="social-icon youtube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="social-icon twitter">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
