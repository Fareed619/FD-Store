import express from "express";
import connectToDB from "./config/db.js";
import cookieParser from "cookie-parser";
import All_Routes from "./routes/index.js";
import path from "path";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [CLIENT_URL, "http://localhost:5173"]
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//  App Routes
app.use(All_Routes);


// upload image folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../Frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"));
//   });
// }

app.listen(PORT, () => {
  console.log("Server Listning on port " + PORT);
  connectToDB();
});
