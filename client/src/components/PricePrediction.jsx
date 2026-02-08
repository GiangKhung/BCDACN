import { useState } from 'react';
import axios from 'axios';
import './PricePrediction.css';

function PricePrediction({ onPriceSelect, initialData = {} }) {
    const [formData, setFormData] = useState({
        area: initialData.area || '',
        district: initialData.district || '',
        propertyType: initialData.propertyType || 'apartment',
        bedrooms: initialData.bedrooms || '',
        bathrooms: initialData.bathrooms || ''
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const propertyTypes = [
        { value: 'apartment', label: 'Căn hộ chung cư' },
        { value: 'house', label: 'Nhà riêng' },
        { value: 'villa', label: 'Biệt thự' },
        { value: 'townhouse', label: 'Nhà phố' },
        { value: 'land', label: 'Đất nền' },
        { value: 'office', label: 'Văn phòng' },
        { value: 'shophouse', label: 'Shophouse' }
    ];

    const districts = [
        'Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5',
        'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10',
        'Quận 11', 'Quận 12', 'Quận Bình Thạnh', 'Quận Gò Vấp',
        'Quận Phú Nhuận', 'Quận Tân Bình', 'Quận Tân Phú',
        'Thành phố Thủ Đức', 'Huyện Bình Chánh', 'Huyện Nhà Bè'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setResult(null);
        setError('');
    };

    const formatPrice = (price) => {
        if (price >= 1000000000) {
            return (price / 1000000000).toFixed(2) + ' tỷ';
        } else if (price >= 1000000) {
            return (price / 1000000).toFixed(0) + ' triệu';
        }
        return price.toLocaleString('vi-VN') + ' VNĐ';
    };

    const handlePredict = async () => {
        if (!formData.area || parseFloat(formData.area) <= 0) {
            setError('Vui lòng nhập diện tích hợp lệ');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/price-predict', {
                area: parseFloat(formData.area),
                district: formData.district,
                propertyType: formData.propertyType,
                bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : undefined,
                bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined
            });

            if (res.data.success && res.data.prediction) {
                setResult(res.data);
            } else {
                setError(res.data.message || 'Không thể dự đoán giá');
            }
        } catch (err) {
            console.error('Prediction error:', err);
            setError('Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleUsePrice = () => {
        if (result && onPriceSelect) {
            onPriceSelect(result.prediction.estimatedPrice);
        }
    };

    return (
        <div className="price-prediction">
            <div className="prediction-header">
                <span className="ai-icon">🤖</span>
                <h3>Ước Tính Giá AI</h3>
            </div>

            <div className="prediction-form">
                <div className="form-row">
                    <div className="form-group">
                        <label>Diện tích (m²) *</label>
                        <input
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            placeholder="VD: 80"
                            min="1"
                        />
                    </div>
                    <div className="form-group">
                        <label>Loại BĐS</label>
                        <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
                            {propertyTypes.map(t => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Quận/Huyện</label>
                        <select name="district" value={formData.district} onChange={handleChange}>
                            <option value="">-- Chọn quận --</option>
                            {districts.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group half">
                        <label>Phòng ngủ</label>
                        <input
                            type="number"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                        />
                    </div>
                    <div className="form-group half">
                        <label>Phòng tắm</label>
                        <input
                            type="number"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                            placeholder="0"
                            min="0"
                        />
                    </div>
                </div>

                <button 
                    className="predict-btn"
                    onClick={handlePredict}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            Đang phân tích...
                        </>
                    ) : (
                        <>
                            <span>✨</span>
                            Ước tính giá
                        </>
                    )}
                </button>

                {error && <div className="prediction-error">{error}</div>}
            </div>

            {result && result.prediction && (
                <div className="prediction-result">
                    <div className="result-main">
                        <span className="result-label">Giá ước tính</span>
                        <span className="result-price">{formatPrice(result.prediction.estimatedPrice)}</span>
                    </div>

                    <div className="result-range">
                        <div className="range-item">
                            <span>Thấp nhất</span>
                            <strong>{formatPrice(result.prediction.minPrice)}</strong>
                        </div>
                        <div className="range-bar">
                            <div 
                                className="range-indicator"
                                style={{ 
                                    left: `${((result.prediction.estimatedPrice - result.prediction.minPrice) / 
                                           (result.prediction.maxPrice - result.prediction.minPrice)) * 100}%` 
                                }}
                            ></div>
                        </div>
                        <div className="range-item">
                            <span>Cao nhất</span>
                            <strong>{formatPrice(result.prediction.maxPrice)}</strong>
                        </div>
                    </div>

                    <div className="result-stats">
                        <div className="stat">
                            <span>Giá/m²</span>
                            <strong>{formatPrice(result.prediction.pricePerSqm)}</strong>
                        </div>
                        <div className="stat">
                            <span>Độ tin cậy</span>
                            <strong className={result.prediction.confidence >= 70 ? 'high' : result.prediction.confidence >= 50 ? 'medium' : 'low'}>
                                {result.prediction.confidence}%
                            </strong>
                        </div>
                        <div className="stat">
                            <span>Mẫu phân tích</span>
                            <strong>{result.prediction.sampleSize} BĐS</strong>
                        </div>
                    </div>

                    {onPriceSelect && (
                        <button className="use-price-btn" onClick={handleUsePrice}>
                            Sử dụng giá này
                        </button>
                    )}

                    <p className="disclaimer">{result.disclaimer}</p>
                </div>
            )}
        </div>
    );
}

export default PricePrediction;
