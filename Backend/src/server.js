import app from "./app.js"
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config({
    path : ".env"
})

const PORT = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.listen(PORT , (req, res) => {
    console.log("Server is listening on port : " , PORT);
})
})
.catch((error) => {
    console.log(error)
})