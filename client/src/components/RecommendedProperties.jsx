import { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import "./RecommendedProperties.css";

function RecommendedProperties({ currentPropertyId }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, [currentPropertyId]);

  const fetchRecommendations = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axios.get("http://localhost:5000/api/recommendations", { headers });
      
      // Lọc bỏ property hiện tại nếu đang ở trang chi tiết
      let data = response.data;
      if (currentPropertyId) {
        data = data.filter(p => p._id !== currentPropertyId);
      }
      
      setProperties(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || properties.length === 0) {
    return null; // Không hiển thị nếu không có dữ liệu hoặc đang tải
  }

  return (
    <section className="recommended-section">
        <div className="section-title">
          <h2>Bất động sản dành cho bạn</h2>
          <div className="filter-links">
            <span className="ai-badge">✨ Gợi ý từ AI</span>
          </div>
        </div>
        
        <div className="recommended-grid">
          {properties.slice(0, 4).map((property) => ( // Hiển thị tối đa 4 tin
            <PropertyCard key={property._id} property={property} layout="grid" />
          ))}
        </div>
    </section>
  );
}

export default RecommendedProperties;
