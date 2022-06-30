import express from "express";
import apiRouter from "../src/features/api.router";
import db from "../config/db";
import config from "../config/index";

const app = express();

app.use(express.json());

app.use(apiRouter);

// Stablish mongoose connection
db.connect();

// Process ping
app.get("/ping", async (req, res) =>
  res.send({
    status: "pong",
    name,
    uptime: process.uptime(),
    db: mongoose.connection.readyState,
    // cache: redisClient.connected
  })
); // eslint-disable-line

app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Stolen bikes app listening on port ${config.port}`);
});

app.use((err, req, res) => {
  console.log(err);
  res.status(500).json({ error: err.message });
});
