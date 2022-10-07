import server from "./server";
import apiController from "./controllers/api";
import authController from "./controllers/auth";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT as string;

(async () => {
  try {
    server.use("/auth", authController);
    server.use("/api", apiController);

    server.listen(PORT, () => console.log("Running on server", PORT));
  } catch (error) {
    console.log(error);
  }
})();
