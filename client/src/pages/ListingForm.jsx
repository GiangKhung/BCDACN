import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createListing, updateListing, getListingById } from "../services/api";

export default function ListingForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    address: "",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    getListingById(id).then((data) =>
      setForm({
        title: data.title || "",
        description: data.description || "",
        price: data.price || 0,
        address: data.address || "",
        bedrooms: data.bedrooms || 0,
        bathrooms: data.bathrooms || 0,
        area: data.area || 0,
      })
    );
  }, [id, isEdit]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]:
        name === "price" ||
        name === "bedrooms" ||
        name === "bathrooms" ||
        name === "area"
          ? Number(value)
          : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) await updateListing(id, form);
      else await createListing(form);
      navigate("/admin");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "grid", gap: 10, maxWidth: 640 }}
    >
      <h2>{isEdit ? "Sua tin" : "Tao tin moi"}</h2>
      <input
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="Tieu de"
        required
      />
      <input
        name="address"
        value={form.address}
        onChange={onChange}
        placeholder="Dia chi"
        required
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={onChange}
        placeholder="Gia"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="Mo ta"
        rows={5}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
        }}
      >
        <input
          name="bedrooms"
          type="number"
          value={form.bedrooms}
          onChange={onChange}
          placeholder="Phong ngu"
        />
        <input
          name="bathrooms"
          type="number"
          value={form.bathrooms}
          onChange={onChange}
          placeholder="Phong tam"
        />
        <input
          name="area"
          type="number"
          value={form.area}
          onChange={onChange}
          placeholder="Dien tich"
        />
      </div>
      <div>
        <button type="submit" disabled={saving}>
          {saving ? "Dang luu..." : "Luu"}
        </button>
      </div>
    </form>
  );
}
