import jwt from "jsonwebtoken";

// Middleware ตรวจสอบ JWT token และสิทธิ์ Admin
const protectAdmin = async (req, res, next) => {
    const token = req.headers.Authorization?.split(" ")[1]; // ดึง token จาก Authorization header

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    try {
        // ตรวจสอบ JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ตรวจสอบว่าผู้ใช้เป็น admin หรือไม่
        if (decoded.role !== "admin") {
            return res
                .status(403)
                .json({ message: "Forbidden: You do not have admin access" });
        }

        // แนบข้อมูลผู้ใช้เข้ากับ request object
        req.user = {
            id: decoded.userId,
            email: decoded.email,
            role: decoded.role
        };

        // ดำเนินการต่อไปยัง middleware หรือ route handler ถัดไป
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

export default protectAdmin;

