import dotenv from "dotenv";
import { app } from "./app.js";
import connecttoDB from "./db/index.js";
dotenv.config({
  path: "./.env",
});

connecttoDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`app is listning on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGO DB connection failed !! ", error);
  });
