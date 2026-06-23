const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const twilio = require("twilio");

const client = twilio(
   process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN

);
// Create Order
router.post("/create", async (req, res) => {
  try {
    const order = await Order.create(req.body);

    console.log("ORDER SAVED");

    const message = await client.messages.create({
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919894715074",
      body: "🛍 New Jewelry Order"
    });

    console.log("WHATSAPP SENT:", message.sid);

    res.json({
      success: true,
      message: "Order Created"
    });

  } catch (error) {
    console.error("TWILIO ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get All Orders
router.get("/", async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
});

// Update Status
router.put("/:id", async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    });

    res.json({
        success: true
    });
});


router.delete("/:id", async (req,res)=>{

    await Order.findByIdAndDelete(req.params.id);

    res.json({
        success:true
    });

});

module.exports = router;