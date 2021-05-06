const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_IP,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const redis = require("redis");
const session = require("express-session");
const cors = require("cors");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});
const app = express();

app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 30, // 60 sec
      httpOnly: true,
      secure: false,
      saveUninitialized: false,
      resave: false,
    },
  })
);

app.use(express.json());

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`📡 - Successfully connected to Mongo `))
  .catch((e) => console.error(e));

app.get("/api/v1", (req, res) => {
  console.log("I ran");
  res.send("Hello there, we are live 🐶🚀");
});

const port = process.env.PORT || 4545;

app.listen(port, () => console.log(`🚀 - Listenin on port ${port}`));
