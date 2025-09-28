import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import bcrypt from "bcryptjs";

const profileRouter = Router();

// profileRouter.post("/register", async (req, res) => {
//   console.log("profileRouter/register", req.body);

//   const { name, username, email, password, role } = req.body

//   const hashedPassword = await bcrypt.hash(password, 10);

//   try {
//     let query = `
//       insert into users
//       (
//           name,
//           username,
//           email,
//           password,
//           role
//       )
//       values(
//           $1,
//           $2,
//           $3,
//           $4,
//           $5
//       )
//     `;
//     const result = await connectionPool.query(
//       query,
//       [
//         name,
//         username,
//         email,
//         hashedPassword,
//         role
//       ]
//     );

//     return res.status(200).json(result);
//   } catch (e) {
//     return res.status(500).json({
//       // message: "Server could not read post because database issue",
//       message: e.message,
//     });
//   }
// });

profileRouter.get("/", async (req, res) => {
  try {
    let query = `
    SELECT 
        *
    FROM user
  `;
    const result = await connectionPool.query(query);

    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      // message: "Server could not read post because database issue",
      message: e.message,
    });
  }
});

profileRouter.get("/1", async (req, res) => {
  try {
    return res.status(200).json({
      message: "Read profiles successfully",
      data: {
        name: "john",
        age: 20
      }
    })
  } catch {
    return res.status(500).json({
      message: "Server could not read post because database issue",
    });
  }
});

export default profileRouter;
