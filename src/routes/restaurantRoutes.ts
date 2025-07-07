import { Request, Response, Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { MenuItem, Restaurant } from "../db";
import mongoose from "mongoose";

const route = Router();

route.get("/", authMiddleware, async (req: Request, res: Response) => {
  const region = req.region;

  try {
    const restaurants = await Restaurant.find(
      req.role === "admin" ? {} : { region: region }
    );
    res.json(restaurants);
  } catch (e) {
    res.json({ message: "Failed to fetch restaurants" });
  }
});

route.get("/:id/menu", authMiddleware, async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      res.json({ message: "Restaurant not found" });
      return;
    }

    if (req.region !== restaurant.region) {
      res.json({ message: "Access denied: region mismatch" });
      return;
    }

    const menuItems = await MenuItem.find({
      restaurantId: new mongoose.Types.ObjectId(req.params.id),
    });
    res.json(menuItems);
  } catch (err) {
    res.json({ message: "Failed to fetch menu" });
  }
});

export default route;
