import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function getListings(params) {
  const res = await api.get("/listings", { params });
  return res.data;
}

export async function getListingById(id) {
  const res = await api.get(`/listings/${id}`);
  return res.data;
}

export async function createListing(payload) {
  const res = await api.post("/listings", payload);
  return res.data;
}

export async function updateListing(id, payload) {
  const res = await api.put(`/listings/${id}`, payload);
  return res.data;
}

export async function deleteListing(id) {
  const res = await api.delete(`/listings/${id}`);
  return res.data;
}

export async function login(email, password) {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

export async function register(email, password) {
  const res = await api.post("/auth/register", { email, password });
  return res.data;
}
