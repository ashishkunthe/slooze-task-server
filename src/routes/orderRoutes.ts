import { Request, Response, Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import { Order } from "../db";

const route = Router();

route.post("/", authMiddleware, async (req: Request, res: Response) => {
  const { items, paymentMethod } = req.body;
  const userId = req.userId;
  const region = req.region;

  if (!items || items.length === 0) {
    res.json({ message: "Items cannot be empty" });
    return;
  }

  try {
    const order = await Order.create({
      userId,
      region,
      paymentMethod,
      items,
      status: "created",
    });
    res.json({ message: "Order has been placed", order });
  } catch (error) {
    res.json({ message: "Something went wrong, try again" });
  }
});

route.patch(
  "/:id/checkout",
  authMiddleware,
  async (req: Request, res: Response) => {
    const role = req.role;

    if (role !== "admin" && role !== "manager") {
      res.json({ message: "Only admin or manager can checkout orders" });
      return;
    }

    try {
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: "placed" },
        { new: true }
      );
      res.json({ message: "Order placed successfully", order });
    } catch (err) {
      res.json({ message: "Failed to checkout order" });
    }
  }
);

route.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const role = req.role;

  if (role !== "admin" && role !== "manager") {
    res.json({ message: "Only admin or manager can cancel orders" });
    return;
  }

  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );
    res.json({ message: "Order cancelled", order });
  } catch (err) {
    res.json({ message: "Failed to cancel order" });
  }
});

route.get("/", authMiddleware, async (req: Request, res: Response) => {
  const { role, region } = req;

  if (role !== "admin" && role !== "manager") {
    res.json({ message: "Only admin or manager can access this route" });
    return;
  }

  try {
    const filter = role === "admin" ? {} : { region };
    const orders = await Order.find(filter);
    res.json(orders);
  } catch (err) {
    res.json({ message: "Failed to fetch orders" });
  }
});

route.patch(
  "/:id/payment-method",
  authMiddleware,
  async (req: Request, res: Response) => {
    const role = req.role;

    if (role !== "admin") {
      res.json({ message: "Only admin can update payment method" });
      return;
    }

    try {
      const { paymentMethod } = req.body;
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { paymentMethod },
        { new: true }
      );
      res.json({ message: "Payment method updated", order });
    } catch (err) {
      res.json({ message: "Failed to update payment method" });
    }
  }
);

export default route;
