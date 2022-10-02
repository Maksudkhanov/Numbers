import server from "./server";
import Database from "./db/db";
import dbMiddleware from "./middlewares/dbMiddleware";
import api from "./controllers/api";
import auth from "./controllers/auth";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT as string;
const DB_URI = process.env.DB_URI as string;
const DB_NAME = process.env.DB_NAME as string;

(async () => {
  try {
    const db = new Database(DB_URI);
    await db.connect(DB_NAME);

    server.use("/api", dbMiddleware(db), api);
    server.use("/auth", dbMiddleware(db), auth);

    server.listen(PORT, () => console.log("Running on server", PORT));
  } catch (error) {}
})();
