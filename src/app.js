require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import routes from "./router";

/**
 *
 */
(async () => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use("/api", routes);
  const port = process.env.PORT || 8000;
  try {
    await mongoose.connect(process.env.DB_URL, {});
    const server = http.createServer(app);
    server
      .listen(port)
      .on("listening", () => console.log(`App is starting on port: ${port}`))
      .on("error", (err) =>
        console.log(`An error occured while starting server`, err)
      );
  } catch (error) {
    console.log("An error happening to connect with the DB URL!");
  }
})();
