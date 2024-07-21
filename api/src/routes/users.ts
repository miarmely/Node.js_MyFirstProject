import express from "express"
import { getAllUsersAsync, registerAsync } from "../handlers/users"
import { validateTokenAsync } from "../lib/auth"


const router = express.Router();

// no authentication
router.post("/register", registerAsync);

// with authentication
router.all("*", (req, res, next) => validateTokenAsync(req, res, next))
router.get("/display/all", getAllUsersAsync);

export default router;