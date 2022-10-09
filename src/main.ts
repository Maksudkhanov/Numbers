import server from "./server";
import apiController from "./controllers/api";
import authController from "./controllers/auth";
import dotenv from "dotenv";
import { Database } from "./db/db";
import { UserService } from "./services/userService";
import NumberService from "./services/numberService";

dotenv.config();

const PORT = process.env.PORT as string;

(async () => {
  try {
    const db = new Database();
    await db.connect();

    const userService = new UserService(db);
    const numberService = new NumberService(db);

    const auth = authController(userService);
    const api = apiController(numberService);

    server.use("/auth", auth);
    server.use("/api", api);

    server.listen(PORT, () => console.log("Running on server", PORT));
  } catch (error) {
    console.log(error);
  }
})();
