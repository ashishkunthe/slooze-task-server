import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { Order } from "../db";

const route = Router();

route.post("/", authMiddleware, async (req, res) => {
  const { items, paymentMethod } = req.body;
  const userId = req.userId;
  const region = req.region;
  try {
    const order = await Order.create({
      userId: userId,
      region: region,
      paymentMethod: paymentMethod,
      items: items,
    });
    res.json({
      message: "order has been placeds",
      order: order,
    });
  } catch (error) {
    res.json({
      message: "something went wrong,try again",
    });
  }
});

export default route;
