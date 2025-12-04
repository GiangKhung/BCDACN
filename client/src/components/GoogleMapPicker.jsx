import { useState, useEffect, useRef } from 'react'
import './GoogleMapPicker.css'

function GoogleMapPicker({ location, onLocationChange, address }) {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load Google Maps script
  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => setIsLoaded(true)
    document.head.appendChild(script)

    return () => {
      // Cleanup if needed
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!isLoaded || !mapRef.current || map) return

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 15,
      mapTypeControl: true,
      streetViewControl: false,
      fullscreenControl: true,
    })

    const newMarker = new window.google.maps.Marker({
      position: location,
      map: newMap,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
    })

    // Handle marker drag
    newMarker.addListener('dragend', (e) => {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      onLocationChange(newLocation)
    })

    // Handle map click
    newMap.addListener('click', (e) => {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      newMarker.setPosition(newLocation)
      onLocationChange(newLocation)
    })

    setMap(newMap)
    setMarker(newMarker)
  }, [isLoaded, mapRef.current])

  // Update marker position when location changes
  useEffect(() => {
    if (marker && location) {
      marker.setPosition(location)
      if (map) {
        map.panTo(location)
      }
    }
  }, [location, marker, map])

  const searchLocation = async () => {
    if (!address) {
      alert('Vui lòng nhập địa chỉ trước!')
      return
    }

    try {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const newLocation = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }
          onLocationChange(newLocation)
          if (map) {
            map.setCenter(newLocation)
            map.setZoom(17)
          }
        } else {
          alert('Không tìm thấy địa chỉ. Vui lòng kiểm tra lại!')
        }
      })
    } catch (error) {
      console.error('Geocoding error:', error)
      alert('Có lỗi xảy ra khi tìm kiếm địa chỉ')
    }
  }

  if (!isLoaded) {
    return (
      <div className="map-loading">
        <div className="spinner"></div>
        <p>Đang tải bản đồ...</p>
      </div>
    )
  }

  return (
    <div className="google-map-picker">
      <div className="map-controls">
        <button type="button" className="btn-search-map" onClick={searchLocation}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Tìm vị trí từ địa chỉ
        </button>
        <div className="location-display">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          <span>{location.lat.toFixed(6)}, {location.lng.toFixed(6)}</span>
        </div>
      </div>
      <div ref={mapRef} className="map-canvas"></div>
      <div className="map-hint">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <span>Nhấn vào bản đồ hoặc kéo marker để chọn vị trí chính xác</span>
      </div>
    </div>
  )
}

export default GoogleMapPicker
