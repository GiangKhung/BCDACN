import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListings } from "../services/api";

function ListingCard({ item }) {
  const imgSrc =
    item.images && item.images.length > 0
      ? item.images[0]
      : "/images/placeholder.svg";
  return (
    <div className="card">
      <div className="card-img">
        <img
          src={imgSrc}
          alt={item.title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="card-body">
        <div className="card-title">{item.title}</div>
        <div className="card-sub">{item.address}</div>
        <div className="price">{item.price?.toLocaleString()} VND</div>
        <div style={{ marginTop: 8 }}>
          <Link to={`/listing/${item._id}`}>Xem chi tiết</Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load(p = page) {
    setLoading(true);
    try {
      const res = await getListings({
        q: query || undefined,
        location: location || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        page: p,
        limit,
      });
      if (Array.isArray(res)) {
        // backward compatibility if API returns array
        setListings(res);
        setTotal(res.length);
      } else {
        setListings(res.items || []);
        setTotal(res.total || 0);
      }
      setPage(p);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(1);
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    await load(1);
  };

  return (
    <div className="container">
      <div className="hero">
        <img
          src="/images/hero.svg"
          alt="hero"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
      <form onSubmit={onSearch} className="search" style={{ flexWrap: "wrap" }}>
        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Từ khóa"
        />
        <input
          className="input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Khu vực"
        />
        <input
          className="input"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Giá tối thiểu"
        />
        <input
          className="input"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Giá tối đa"
        />
        <button className="btn" type="submit">
          Lọc
        </button>
      </form>
      {loading ? (
        <div className="muted container">Đang tải...</div>
      ) : (
        <div className="grid">
          {listings.map((item) => (
            <ListingCard key={item._id} item={item} />
          ))}
        </div>
      )}
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <button
          className="btn"
          onClick={() => load(Math.max(1, page - 1))}
          disabled={page <= 1}
        >
          Trước
        </button>
        <div className="muted">
          Trang {page} {total ? ` / ~${Math.ceil(total / limit)}` : ""}
        </div>
        <button
          className="btn"
          onClick={() => load(page + 1)}
          disabled={total && page >= Math.ceil(total / limit)}
        >
          Sau
        </button>
      </div>
    </div>
  );
}
