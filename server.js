const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* =============================
   CORS CONFIG (FIXED)
============================= */
const allowedOrigins = [
  process.env.CLIENT_URL_LOCAL,
  process.env.CLIENT_URL_PROD,
  process.env.CLIENT_URL_AZURE
].filter(Boolean); // removes undefined values

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

/* =============================
   MIDDLEWARE
============================= */
app.use(express.json());

/* =============================
   ROUTE
============================= */
app.use("/api/todos", require("./routes/todoRoutes"));

/* =============================
   SERVER
============================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);