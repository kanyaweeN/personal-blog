import "dotenv/config";
import express from "express";
import cors from "cors";
import profileRouter from "./routes/ProfileRouter.mjs";
import postRouter from "./routes/PostRouter.mjs";
import authRouter from "./routes/auth.mjs";
import protectUser from "./middlewares/protectUser.mjs";
import protectAdmin from "./middlewares/protectAdmin.mjs";
import commentRouter from "./routes/CommentRouter.mjs";
import categoriesRouter from "./routes/CategoriesRouter.mjs";
import statusRouter from "./routes/StatusRouter.mjs";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// จัดการ preflight requests
app.options('*', cors());

app.use(express.json());

// เพิ่ม middleware สำหรับตั้งค่า headers ทุก request
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.get("/", (req, res) => {
    return res.json({ message: "Server API is working", timestamp: new Date().toISOString() });
});

app.use("/auth", authRouter);

app.use("/profile", profileRouter);
app.use("/posts", postRouter);

app.use("/comment", commentRouter);

app.use("/categories", categoriesRouter);
app.use("/status", statusRouter);

// ตัวอย่างเส้นทางที่ผู้ใช้ทั่วไปที่ล็อกอินแล้วสามารถเข้าถึงได้
app.get("/protected-route", protectUser, (req, res) => {
    res.json({ message: "This is protected content", user: req.user });
});

// ตัวอย่างเส้นทางที่เฉพาะ Admin เท่านั้นที่เข้าถึงได้
app.get("/admin-only", protectAdmin, (req, res) => {
    res.json({ message: "This is admin-only content", admin: req.user });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// สำหรับ Vercel (Serverless)
export default app;

// สำหรับ Local
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}