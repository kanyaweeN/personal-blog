import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    const { name, username, email, password, role } = req.body

    try {
        // ตรวจสอบว่า username มีในฐานข้อมูลหรือไม่
        const usernameCheckQuery = `
                                SELECT * FROM users 
                                WHERE username = $1
                               `;

        const usernameCheckValues = [username];
        const { rows: existingUser } = await connectionPool.query(
            usernameCheckQuery,
            usernameCheckValues
        );

        if (existingUser.length > 0) {
            return res.status(409).json({
                message: "This username is already taken"
            });
        }

        // ตรวจสอบว่า email มีในฐานข้อมูลหรือไม่
        const emailCheckQuery = `
                                SELECT * FROM users 
                                WHERE email = $1
                               `;
        const emailCheckValues = [email];

        const { rows: existingEmail } = await connectionPool.query(
            emailCheckQuery,
            emailCheckValues
        );

        if (existingEmail.length > 0) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // เพิ่มข้อมูลผู้ใช้ในฐานข้อมูล PostgreSQL
        const query = `
            insert into users
            (
                name,
                username,
                email,
                password,
                role
            )
            values(
                $1,
                $2,
                $3,
                $4,
                $5
            )
            RETURNING *;
        `;

        const values = [name, username, email, hashedPassword, role];

        const { rows } = await connectionPool.query(query, values);

        // สร้าง JWT token
        const token = jwt.sign(
            {
                userId: rows[0].id,
                email: rows[0].email,
                role: rows[0].role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: "User created successfully",
            user: rows[0],
            access_token: token,
        });
    } catch (error) {
        console.error("/register error", error);

        res.status(500).json({ message: "An error occurred during registration" });
    }
});
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // ค้นหาผู้ใช้จากฐานข้อมูล
        const query = `
            SELECT * FROM users 
            WHERE email = $1
        `;
        const values = [email];
        const { rows } = await connectionPool.query(query, values);

        if (rows.length === 0) {
            return res.status(400).json({
                message: "Your password is incorrect or this email doesn't exist",
            });
        }

        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Your password is incorrect or this email doesn't exist",
            });
        }

        // สร้าง JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );
        return res.status(200).json({
            message: "Signed in successfully",
            access_token: token,
        });
    } catch (error) {
        console.error("/login", error);

        return res.status(500).json({ message: "An error occurred during login" });
    }
});
authRouter.get("/get-user", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    try {
        // ตรวจสอบ JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const query = `
                    SELECT * FROM users 
                    WHERE id = $1
                  `;
        const values = [decoded.userId];
        const { rows } = await connectionPool.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];
        res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
            name: user.name,
            role: user.role,
            profilePic: user.profile_pic,
            bio: user.bio
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Unauthorized or token expired" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});
authRouter.put("/reset-password", async (req, res) => {
    const token = req.headers.Authorization?.split(" ")[1]; // ดึง token จาก Authorization header
    const { oldPassword, newPassword } = req.body;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    if (!newPassword) {
        return res.status(400).json({ message: "New password is required" });
    }

    try {
        // ตรวจสอบ JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const userQuery = `
            SELECT * FROM users 
            WHERE id = $1
        `;
        const userValues = [decoded.userId];
        const { rows: userRows } = await connectionPool.query(userQuery, userValues);

        if (userRows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = userRows[0];

        // ตรวจสอบรหัสผ่านเดิม
        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isOldPasswordValid) {
            return res.status(400).json({ message: "Invalid old password" });
        }

        // เข้ารหัสรหัสผ่านใหม่
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // อัปเดตรหัสผ่านในฐานข้อมูล
        const updateQuery = `
            UPDATE users 
            SET password = $1 
            WHERE id = $2
            RETURNING *
        `;
        const updateValues = [hashedNewPassword, decoded.userId];
        const { rows: updatedRows } = await connectionPool.query(updateQuery, updateValues);

        res.status(200).json({
            message: "Password updated successfully",
            user: updatedRows[0],
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});



export default authRouter;

