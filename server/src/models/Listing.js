import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    address: { type: String, required: true },
    images: { type: [String], default: [] },
    bedrooms: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    area: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["available", "pending", "sold"],
      default: "available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Listing", ListingSchema);
