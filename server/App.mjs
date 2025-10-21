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
import notificationRouter from "./routes/notificationRouter.mjs";

const app = express();
const port = process.env.PORT || 4001;

const allowedOrigins = [
    process.env.CLIENT_URL || "https://personal-blog-ivory-eight.vercel.app",
    "http://localhost:3000",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.warn(`Blocked by CORS: ${origin}`);
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "Accept",
            "Origin",
        ],
        optionsSuccessStatus: 204,
    })
);

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    return res.json({ message: "Server API is working", timestamp: new Date().toISOString() });
});

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/posts", postRouter);
app.use("/comment", commentRouter);
app.use("/categories", categoriesRouter);
app.use("/status", statusRouter);
app.use("/notifications", notificationRouter);

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
    console.error('Error:', err);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
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