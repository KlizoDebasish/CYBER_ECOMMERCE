const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { databaseConnect } = require("./config/cyber.database");
const productRoute = require("./routes/cyber.route.product");
const userRoute = require("./routes/cyber.route.user");
const cartRoute = require("./routes/cyber.route.cart");
const wishlistRoute = require("./routes/cyber.route.wishlist");
const feedbackRoute = require("./routes/cyber.route.feedback");
const adminRoute = require("./routes/admin.cyber.route");
const offerRoute = require("./routes/cyber.route.offer");
const queryRoute = require("./routes/cyber.route.query");
const orderRoute = require("./routes/cyber.route.order");
require("dotenv").config();

const Cyber = express();

const PORT = process.env.PORT || 2008;

// Enable CORS for all domains
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN_URI,
  credentials: true
};

Cyber.use(cors(corsOptions));

// Middleware
Cyber.use(express.json());
Cyber.use(express.urlencoded({ extended: true }));
Cyber.use(cookieParser());

// Mount Middleware (Router)
Cyber.use("/cyber/user", userRoute);
Cyber.use("/cyber/user/cart", cartRoute);
Cyber.use("/cyber/user/wishlist", wishlistRoute);
Cyber.use("/cyber/user/feedback", feedbackRoute);
Cyber.use("/cyber/query/products", queryRoute);

Cyber.use("/cyber/payment/orders", orderRoute);

Cyber.use("/admin/cyber/dashboard/products", productRoute);
Cyber.use("/admin/cyber/dashboard", adminRoute);
Cyber.use("/admin/cyber/dashboard/offer", offerRoute);

// Database intergrated
databaseConnect();

// Start the server
Cyber.listen(PORT, () => {
  console.log(`Cyber server is running on port ${PORT}`);
});

// Default Routes
Cyber.get("/", (req, res) => {
  res.send("Welcome to the Cyber Server");
});
