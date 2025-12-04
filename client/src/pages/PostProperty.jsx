import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './PostProperty.css'

function PostProperty() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [mapLocation, setMapLocation] = useState({
    lat: 10.8231,
    lng: 106.6297
  })
  const [formData, setFormData] = useState({
    // Thông tin cơ bản
    title: '',
    propertyType: 'apartment',
    listingType: 'sale', // sale hoặc rent
    
    // Địa chỉ
    city: '',
    district: '',
    ward: '',
    street: '',
    
    // Giá và diện tích
    price: '',
    area: '',
    
    // Chi tiết
    bedrooms: '',
    bathrooms: '',
    floors: '',
    direction: '',
    furniture: 'empty',
    legalDocument: '',
    
    // Mô tả
    description: '',
    
    // Thông tin liên hệ
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    
    if (images.length + files.length > 10) {
      alert('Bạn chỉ có thể tải lên tối đa 10 hình ảnh')
      return
    }

    files.forEach(file => {
      // Kiểm tra kích thước file (tối đa 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`File ${file.name} quá lớn. Vui lòng chọn ảnh nhỏ hơn 5MB`)
        return
      }

      // Nén ảnh trước khi upload
      const reader = new FileReader()
      reader.onload = (event) => {
        const img = new Image()
        img.onload = () => {
          // Tạo canvas để resize ảnh
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          
          // Giới hạn kích thước tối đa
          const maxWidth = 1200
          const maxHeight = 1200
          let width = img.width
          let height = img.height
          
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width
              width = maxWidth
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height
              height = maxHeight
            }
          }
          
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0, width, height)
          
          // Chuyển về base64 với chất lượng 0.8
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8)
          
          setImages(prev => [...prev, {
            file,
            preview: compressedDataUrl
          }])
        }
        img.src = event.target.result
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Kiểm tra đăng nhập
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Vui lòng đăng nhập để đăng tin!')
      navigate('/login')
      return
    }

    setLoading(true)

    try {
      // Chuẩn bị dữ liệu
      const propertyData = {
        title: formData.title,
        propertyType: formData.propertyType,
        location: `${formData.ward}, ${formData.district}, ${formData.city}`,
        address: {
          street: formData.street,
          ward: formData.ward,
          district: formData.district,
          city: formData.city,
          fullAddress: `${formData.street}, ${formData.ward}, ${formData.district}, ${formData.city}`
        },
        price: Number(formData.price),
        priceText: formatPrice(Number(formData.price)),
        pricePerMonth: formData.listingType === 'rent',
        area: Number(formData.area),
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        floors: Number(formData.floors) || 0,
        direction: formData.direction,
        furniture: formData.furniture,
        legalDocument: formData.legalDocument,
        description: formData.description,
        image: images.length > 0 ? images[0].preview : '/images/properties/default.jpg',
        imageList: images.map(img => img.preview),
        images: images.length,
        coordinates: mapLocation,
        agent: {
          name: formData.contactName,
          phone: formData.contactPhone,
          email: formData.contactEmail
        },
        status: 'available'
      }

      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(propertyData)
      })

      if (response.ok) {
        alert('Đăng tin thành công!')
        navigate('/my-properties')
      } else {
        const error = await response.json()
        alert(error.message || 'Có lỗi xảy ra khi đăng tin')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Không thể kết nối đến server')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    if (price >= 1000000000) {
      return `${(price / 1000000000).toFixed(1)} tỷ`
    } else if (price >= 1000000) {
      return `${(price / 1000000).toFixed(0)} triệu`
    }
    return `${price.toLocaleString()} đ`
  }

  const nextStep = () => {
    // Validate bước 2: yêu cầu ít nhất 1 ảnh
    if (step === 2 && images.length === 0) {
      alert('Vui lòng tải lên ít nhất 1 hình ảnh!')
      return
    }
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="post-property-page">
      <div className="container">
        <div className="post-header">
          <h1>Đăng tin bất động sản</h1>
          <p>Điền thông tin chi tiết để đăng tin của bạn</p>
        </div>

        <div className="post-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-label">Thông tin cơ bản</div>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-label">Chi tiết & Hình ảnh</div>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-label">Vị trí & Liên hệ</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="post-form">
          {/* Bước 1: Thông tin cơ bản */}
          {step === 1 && (
            <div className="form-step">
              <h2>Thông tin cơ bản</h2>
              
              <div className="form-group">
                <label>Loại hình <span className="required">*</span></label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="listingType"
                      value="sale"
                      checked={formData.listingType === 'sale'}
                      onChange={handleChange}
                    />
                    <span>Cần bán</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="listingType"
                      value="rent"
                      checked={formData.listingType === 'rent'}
                      onChange={handleChange}
                    />
                    <span>Cho thuê</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Loại bất động sản <span className="required">*</span></label>
                <select name="propertyType" value={formData.propertyType} onChange={handleChange} required>
                  <option value="apartment">Căn hộ/Chung cư</option>
                  <option value="house">Nhà riêng</option>
                  <option value="villa">Biệt thự</option>
                  <option value="townhouse">Nhà phố</option>
                  <option value="land">Đất nền</option>
                  <option value="office">Văn phòng</option>
                  <option value="shophouse">Shophouse</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tiêu đề tin đăng <span className="required">*</span></label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="VD: Bán căn hộ 2PN view đẹp tại Vinhomes Central Park"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tỉnh/Thành phố <span className="required">*</span></label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="VD: Hồ Chí Minh"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quận/Huyện <span className="required">*</span></label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="VD: Bình Thạnh"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phường/Xã <span className="required">*</span></label>
                  <input
                    type="text"
                    name="ward"
                    value={formData.ward}
                    onChange={handleChange}
                    placeholder="VD: Phường 22"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Đường/Số nhà</label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="VD: 28 Mai Chí Thọ"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-next" onClick={nextStep}>
                  Tiếp tục
                </button>
              </div>
            </div>
          )}

          {/* Bước 2: Chi tiết BĐS */}
          {step === 2 && (
            <div className="form-step">
              <h2>Chi tiết bất động sản</h2>

              <div className="form-row">
                <div className="form-group">
                  <label>Giá {formData.listingType === 'rent' ? 'thuê' : 'bán'} <span className="required">*</span></label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="VD: 5000000000"
                    required
                  />
                  <small>Đơn vị: VNĐ {formData.listingType === 'rent' && '/ tháng'}</small>
                </div>
                <div className="form-group">
                  <label>Diện tích <span className="required">*</span></label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="VD: 75"
                    required
                  />
                  <small>Đơn vị: m²</small>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số phòng ngủ</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="VD: 2"
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Số phòng tắm</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="VD: 2"
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Số tầng</label>
                  <input
                    type="number"
                    name="floors"
                    value={formData.floors}
                    onChange={handleChange}
                    placeholder="VD: 1"
                    min="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Hướng nhà</label>
                  <select name="direction" value={formData.direction} onChange={handleChange}>
                    <option value="">Chọn hướng</option>
                    <option value="east">Đông</option>
                    <option value="west">Tây</option>
                    <option value="south">Nam</option>
                    <option value="north">Bắc</option>
                    <option value="northeast">Đông Bắc</option>
                    <option value="northwest">Tây Bắc</option>
                    <option value="southeast">Đông Nam</option>
                    <option value="southwest">Tây Nam</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Nội thất</label>
                  <select name="furniture" value={formData.furniture} onChange={handleChange}>
                    <option value="empty">Không nội thất</option>
                    <option value="basic">Nội thất cơ bản</option>
                    <option value="full">Nội thất đầy đủ</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Pháp lý</label>
                <select name="legalDocument" value={formData.legalDocument} onChange={handleChange}>
                  <option value="">Chọn loại giấy tờ</option>
                  <option value="red-book">Sổ đỏ/Sổ hồng</option>
                  <option value="pink-book">Sổ hồng riêng</option>
                  <option value="sale-contract">Hợp đồng mua bán</option>
                  <option value="waiting">Đang chờ sổ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="form-group">
                <label>Mô tả chi tiết</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Nhập mô tả chi tiết về bất động sản của bạn..."
                ></textarea>
              </div>

              <div className="form-group">
                <label>Hình ảnh <span className="required">*</span></label>
                <div className="image-upload-container">
                  <div className="image-upload-box">
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="imageUpload" className="upload-label">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                      <span>Chọn hình ảnh</span>
                      <small>Tối đa 10 ảnh, mỗi ảnh tối đa 5MB</small>
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="image-preview-grid">
                      {images.map((img, index) => (
                        <div key={index} className="image-preview-item">
                          <img src={img.preview} alt={`Preview ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-image"
                            onClick={() => removeImage(index)}
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                            </svg>
                          </button>
                          {index === 0 && (
                            <span className="main-image-badge">Ảnh chính</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <small>Ảnh đầu tiên sẽ là ảnh đại diện cho tin đăng</small>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-back" onClick={prevStep}>
                  Quay lại
                </button>
                <button type="button" className="btn-next" onClick={nextStep}>
                  Tiếp tục
                </button>
              </div>
            </div>
          )}

          {/* Bước 3: Vị trí & Thông tin liên hệ */}
          {step === 3 && (
            <div className="form-step">
              <h2>Vị trí và thông tin liên hệ</h2>

              <div className="form-group">
                <label>Vị trí trên bản đồ (Tọa độ GPS)</label>
                <div className="location-input-container">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Vĩ độ (Latitude)</label>
                      <input
                        type="number"
                        step="0.000001"
                        value={mapLocation.lat}
                        onChange={(e) => setMapLocation({...mapLocation, lat: parseFloat(e.target.value) || 0})}
                        placeholder="VD: 10.823100"
                      />
                    </div>
                    <div className="form-group">
                      <label>Kinh độ (Longitude)</label>
                      <input
                        type="number"
                        step="0.000001"
                        value={mapLocation.lng}
                        onChange={(e) => setMapLocation({...mapLocation, lng: parseFloat(e.target.value) || 0})}
                        placeholder="VD: 106.629700"
                      />
                    </div>
                  </div>
                  
                  <div className="location-helper">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <div>
                      <strong>Cách lấy tọa độ GPS:</strong>
                      <ol>
                        <li>Mở <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Google Maps</a></li>
                        <li>Tìm và nhấn vào vị trí BĐS của bạn</li>
                        <li>Nhấn chuột phải → "Sao chép tọa độ"</li>
                        <li>Dán vào 2 ô bên trên (vĩ độ, kinh độ)</li>
                      </ol>
                      <p>Hoặc để mặc định (Trung tâm TP.HCM)</p>
                    </div>
                  </div>

                  <div className="map-preview-link">
                    <a 
                      href={`https://www.google.com/maps?q=${mapLocation.lat},${mapLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-view-map"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      Xem vị trí trên Google Maps
                    </a>
                  </div>
                </div>
              </div>

              <div className="form-divider"></div>

              <div className="form-group">
                <label>Tên người liên hệ <span className="required">*</span></label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="VD: Nguyễn Văn A"
                  required
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại <span className="required">*</span></label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  placeholder="VD: 0901234567"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="VD: example@email.com"
                />
              </div>

              <div className="form-note">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <div>
                  <strong>Lưu ý:</strong>
                  <p>Thông tin liên hệ sẽ được hiển thị công khai cho người xem tin. Vui lòng kiểm tra kỹ trước khi đăng.</p>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-back" onClick={prevStep}>
                  Quay lại
                </button>
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? 'Đang đăng tin...' : 'Đăng tin'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default PostProperty
