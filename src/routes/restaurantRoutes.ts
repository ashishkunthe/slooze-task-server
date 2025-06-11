import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { MenuItem, Restaurant } from "../db";

const route = Router();

route.get("/", authMiddleware, async (req, res) => {
  const region = req.region;

  try {
    const restaurants = await Restaurant.find(
      req.role === "admin" ? {} : { region: req.region }
    );
    res.json(restaurants);
  } catch (e) {
    res.json({ message: "Failed to fetch restaurants" });
  }
});

route.get("/:id/menu", authMiddleware, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      res.json({ message: "Restaurant not found" });
      return;
    }

    if (req.role !== "admin" && req.region !== restaurant.region) {
      res.json({ message: "Access denied: region mismatch" });
      return;
    }

    const menuItems = await MenuItem.find({ restaurantId: req.params.id });
    res.json(menuItems);
  } catch (err) {
    res.json({ message: "Failed to fetch menu" });
  }
});

export default route;
