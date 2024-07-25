import express, { Request, Response } from "express";
import Auth from "./middleware/Auth";
import routes from "./routes/routes";
import cors from "cors";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "success" });
});
app.use("/v1/", routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
