import { Router } from "express";
import { auth, isAdmin } from "../middlewares/authMiddleware.js";
import { calcPrice } from "../utils/helperFunctions.js";
import OrderModel from "../models/OrderModel.js";
import ProductModel from "../models/ProductModel.js";
const router = Router();

// Create Order  http://localhost:4000/api/orders
router.post("/", auth, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    const itemsFromDB = await ProductModel.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });


    const dbOrderItmes = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingItemFromDB) {
        res.status(404);
        throw new Error(`Product Not Found: ${itemFromClient._id}`);
      }
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrice(dbOrderItmes);

    const order = new OrderModel({
      orderItems: dbOrderItmes,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// get All the orders =>  http://localhost:4000/api/orders
router.get("/", auth, isAdmin, async (req, res) => {
  try {
    const orders = await OrderModel.find({}).populate("user", "id username");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// get specific order user's order => http://localhost:4000/api/orders/mine
router.get("/mine", auth, async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get total orders (How much order that I made )   http://localhost:4000/api/orders/total-orders
router.get("/total-orders", auth, async (req, res) => {
  try {
    const totalOrders = await OrderModel.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    console.erro(error);
    res.status(500).json({ error: error.message });
  }
});

// Get total sales   http://localhost:4000/api/orders/total-sales
router.get("/total-sales", auth, async (req, res) => {
  try {
    const orders = await OrderModel.find();
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json({ totalSales });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get total sales by date  http://localhost:4000/api/orders/total-sales-by-date
router.get("/total-sales-by-date", auth, async (req, res) => {
  try {
    const salesByDate = await OrderModel.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.json(salesByDate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// get order details by id   => http://localhost:4000/api/orders/:id
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

//  Pay Order  => http://localhost:4000/api/orders/:id/pay
router.put("/:id/pay", auth, async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      // order.paymentResult = {
      //   id: req.body.id,
      //   status: req.body.status,
      //   update_time: req.body.update_time,
      //   email_address: req.body.payer.email_address,
      // };
      const updateOrder = await order.save();
      res.status(200).json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Deliver Order   ==> http://localhost:4000/api/orders/:id/deliver
router.put("/:id/deliver", auth, isAdmin, async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
export default router;
