import { useState, useEffect } from 'react'
import './MapView.css'

function MapView({ properties, onClose, onPropertyClick }) {
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [mapCenter, setMapCenter] = useState({ lat: 21.0285, lng: 105.8542 }) // Hà Nội mặc định

  useEffect(() => {
    // Tính toán center dựa trên các properties có tọa độ
    const propertiesWithCoords = properties.filter(p => p.coordinates?.lat && p.coordinates?.lng)
    
    if (propertiesWithCoords.length > 0) {
      const avgLat = propertiesWithCoords.reduce((sum, p) => sum + p.coordinates.lat, 0) / propertiesWithCoords.length
      const avgLng = propertiesWithCoords.reduce((sum, p) => sum + p.coordinates.lng, 0) / propertiesWithCoords.length
      setMapCenter({ lat: avgLat, lng: avgLng })
    }
  }, [properties])

  const formatPrice = (property) => {
    if (property.priceText) return property.priceText
    if (property.price === 0) return 'Thỏa thuận'
    
    if (property.pricePerMonth) {
      const million = property.price / 1000000
      return `${million.toFixed(0)} tr/tháng`
    }
    
    const billion = property.price / 1000000000
    if (billion >= 1) {
      return `${billion.toFixed(1)} tỷ`
    }
    const million = property.price / 1000000
    return `${million.toFixed(0)} triệu`
  }

  const propertiesWithCoords = properties.filter(p => p.coordinates?.lat && p.coordinates?.lng)

  return (
    <div className="map-view-overlay">
      <div className="map-view-container">
        <div className="map-view-header">
          <h2>Xem trên bản đồ ({propertiesWithCoords.length} bất động sản)</h2>
          <button className="close-map-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <div className="map-view-content">
          <div className="map-sidebar">
            <div className="map-properties-list">
              {propertiesWithCoords.length === 0 ? (
                <div className="no-coords-message">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <p>Không có bất động sản nào có tọa độ</p>
                </div>
              ) : (
                propertiesWithCoords.map(property => (
                  <div
                    key={property._id || property.id}
                    className={`map-property-item ${selectedProperty?._id === property._id ? 'active' : ''}`}
                    onClick={() => setSelectedProperty(property)}
                    onMouseEnter={() => setSelectedProperty(property)}
                  >
                    <img src={property.image} alt={property.title} />
                    <div className="map-property-info">
                      <h4>{property.title}</h4>
                      <p className="map-property-price">{formatPrice(property)}</p>
                      <p className="map-property-location">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        {property.location}
                      </p>
                      <div className="map-property-specs">
                        <span>{property.area} m²</span>
                        {property.bedrooms > 0 && <span>{property.bedrooms} PN</span>}
                        {property.bathrooms > 0 && <span>{property.bathrooms} PT</span>}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="map-display">
            {propertiesWithCoords.length > 0 ? (
              <iframe
                title="Properties Map"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${mapCenter.lat},${mapCenter.lng}&zoom=12`}
                allowFullScreen
              />
            ) : (
              <div className="map-placeholder">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
                </svg>
                <p>Không có dữ liệu bản đồ</p>
              </div>
            )}
            
            {selectedProperty && (
              <div className="map-property-popup">
                <button 
                  className="close-popup-btn"
                  onClick={() => setSelectedProperty(null)}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
                <img src={selectedProperty.image} alt={selectedProperty.title} />
                <div className="popup-content">
                  <h3>{selectedProperty.title}</h3>
                  <p className="popup-price">{formatPrice(selectedProperty)}</p>
                  <p className="popup-location">{selectedProperty.location}</p>
                  <div className="popup-specs">
                    <span>{selectedProperty.area} m²</span>
                    {selectedProperty.bedrooms > 0 && <span>{selectedProperty.bedrooms} PN</span>}
                    {selectedProperty.bathrooms > 0 && <span>{selectedProperty.bathrooms} PT</span>}
                  </div>
                  <button 
                    className="view-detail-btn"
                    onClick={() => onPropertyClick && onPropertyClick(selectedProperty)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapView
