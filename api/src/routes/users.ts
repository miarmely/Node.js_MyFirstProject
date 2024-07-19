import express from "express"
import { authenticateAsync, getAllUsersAsync, registerAsync } from "../handlers/users"
import auth from "../lib/auth"

const router = express.Router();

// no authentication
router.post("/register", registerAsync);

// with authentication
router.all("*", auth.authenticate(), authenticateAsync);
router.get("/display/all", getAllUsersAsync);

export default router;