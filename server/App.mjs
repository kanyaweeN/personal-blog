import "dotenv/config";
import express from "express";
import cors from "cors";
import profileRouter from "./routes/ProfileRouter.mjs";
import postRouter from "./routes/PostRouter.mjs";
import authRouter from "./routes/auth.mjs";
import protectUser from "./middlewares/protectUser.mjs";
import protectAdmin from "./middlewares/protectAdmin.mjs";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.json("Server API is working")
})

app.use("/auth", authRouter);

app.use("/profile", profileRouter);
app.use("/post", postRouter);
// ตัวอย่างเส้นทางที่ผู้ใช้ทั่วไปที่ล็อกอินแล้วสามารถเข้าถึงได้
app.get("/protected-route", protectUser, (req, res) => {
    res.json({ message: "This is protected content", user: req.user });
});

// ตัวอย่างเส้นทางที่เฉพาะ Admin เท่านั้นที่เข้าถึงได้
app.get("/admin-only", protectAdmin, (req, res) => {
    res.json({ message: "This is admin-only content", admin: req.user });
});


app.listen(port, () => {
    console.log(`Server is runnig at ${port}`);
})