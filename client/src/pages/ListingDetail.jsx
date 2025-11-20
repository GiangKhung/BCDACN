import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getListingById } from "../services/api";

export default function ListingDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getListingById(id)
      .then((res) => setItem(res))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Đang tải...</div>;
  if (!item)
    return (
      <div>
        Không tìm thấy tin rao. <Link to="/">Quay lại</Link>
      </div>
    );

  return (
    <div className="container">
      <div className="muted">
        <Link to="/">← Quay lại</Link>
      </div>
      <h2 style={{ marginTop: 12 }}>{item.title}</h2>
      <div className="detail" style={{ marginTop: 12 }}>
        <div>
          <div className="media">
            <img
              src={(item.images && item.images[0]) || "/images/placeholder.svg"}
              alt={item.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {item.images && item.images.length > 1 && (
            <div className="thumbs">
              {item.images.slice(1, 5).map((src, idx) => (
                <div key={idx} className="thumb">
                  <img
                    src={src}
                    alt={`image-${idx}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="panel">
          <div className="muted" style={{ marginBottom: 8 }}>
            {item.address}
          </div>
          <div style={{ fontWeight: 700, marginBottom: 12 }}>
            {item.price?.toLocaleString()} VND
          </div>
          <p className="muted">{item.description}</p>
          <div className="muted" style={{ marginTop: 12 }}>
            <span>Phòng ngủ: {item.bedrooms}</span>{" "}
            <span> | Phòng tắm: {item.bathrooms}</span>{" "}
            <span> | Diện tích: {item.area} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}
