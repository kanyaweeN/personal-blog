import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const profileRouter = Router();

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
