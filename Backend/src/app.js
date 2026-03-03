import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();


app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".netlify.app")
      ) {
        callback(null, true);
      } else {
        console.error(" Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({extended : true , limit : "16kb"}));
app.use(express.static("public"));

app.use(cookieParser());

import userRoute from "./routes/user.routes.js";

app.use("/api/v1/users" , userRoute)

export default app;