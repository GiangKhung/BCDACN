import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getListings, deleteListing } from "../services/api";

export default function Admin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = async () => {
    setLoading(true);
    try {
      const data = await getListings();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id) => {
    if (!confirm("Xoa tin nay?")) return;
    await deleteListing(id);
    await load();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h2 style={{ margin: 0 }}>Quan tri tin dang</h2>
        <button onClick={() => navigate("/admin/new")}>Tao moi</button>
      </div>
      {loading ? (
        <div>Dang tai...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                  padding: 8,
                }}
              >
                Tieu de
              </th>
              <th
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                  padding: 8,
                }}
              >
                Gia
              </th>
              <th
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                  padding: 8,
                }}
              >
                Hanh dong
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it._id}>
                <td style={{ padding: 8 }}>
                  <Link to={`/listing/${it._id}`}>{it.title}</Link>
                </td>
                <td style={{ padding: 8 }}>{it.price?.toLocaleString()} VND</td>
                <td style={{ padding: 8 }}>
                  <button
                    onClick={() => navigate(`/admin/edit/${it._id}`)}
                    style={{ marginRight: 8 }}
                  >
                    Sua
                  </button>
                  <button onClick={() => onDelete(it._id)}>Xoa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
