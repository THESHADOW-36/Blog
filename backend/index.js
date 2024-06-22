import { config } from "dotenv";
import express from "express"
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.js";
import connectDB from "./config/database.js";
import errorHandler from "./middleware/error.js";

const app = express();

app.use(express.json());

app.use('/uploads', express.static("./uploads"));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(morgan('tiny'))

app.use(cors());

config({ path: './config/.env' });

connectDB();

app.use('/api/v1', router);

app.use(errorHandler);

const port = 8000;

app.listen(port, () => { console.log(`Server is started in ${port}`) });