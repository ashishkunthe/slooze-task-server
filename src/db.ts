import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "manager", "member"], required: true },
  region: { type: String, enum: ["India", "America"], required: true },
});

export const User = model("User", userSchema);

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  region: { type: String, enum: ["India", "America"], required: true },
});

export const Restaurant = model("Restaurant", restaurantSchema);

const menuItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
});

export const MenuItem = model("MenuItem", menuItemSchema);

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      menuItemId: {
        type: Schema.Types.ObjectId,
        ref: "MenuItem",
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["created", "placed", "cancelled"],
    default: "created",
  },
  paymentMethod: { type: String },
  region: { type: String, enum: ["India", "America"], required: true }, // copy from user on order creation
});

export const Order = model("Order", orderSchema);
