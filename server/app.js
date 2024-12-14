const path = require("path");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const monogoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const globalErrorMiddleware = require("./middlewares/globalErrorMiddleware");
const routes = require("./routes");

const app = express();

// GLOBAL MIDDLEWARES:
app.use(cors());

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/xwww-form-urlencoded

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serving static files
app.use(helmet()); // Set security HTTP headers

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, Please try again after an hour!",
// });

// app.use("/api", limiter); // Limit request from same IP
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(monogoSanitize()); // Data sanitization against NoSQL query injection --> "email": { "$gt": "" }

app.get("/", (req, res) => {
  return res.send("hello from okobiz");
});

app.use(routes);
app.use(globalErrorMiddleware);

module.exports = app;
