import { Router } from "express";
import Listing from "../models/Listing.js";
import { requireAuth } from "./auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { q, minPrice, maxPrice, location, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } },
      ];
    }
    if (location) {
      filter.address = { $regex: location, $options: 'i' };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    const pageNum = Math.max(1, Number(page));
    const perPage = Math.min(50, Math.max(1, Number(limit)));
    const [items, total] = await Promise.all([
      Listing.find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * perPage)
        .limit(perPage),
      Listing.countDocuments(filter)
    ]);
    res.json({ items, total, page: pageNum, limit: perPage });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const item = await Listing.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Not found" });
    res.json(item);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth(["admin"]), async (req, res, next) => {
  try {
    const created = await Listing.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", requireAuth(["admin"]), async (req, res, next) => {
  try {
    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", requireAuth(["admin"]), async (req, res, next) => {
  try {
    const deleted = await Listing.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export default router;
