import express from "express"
import { getAllUsersAsync, registerAsync } from "../handlers/users"

const router = express.Router();

router.get("/display/all", getAllUsersAsync);
router.post("/register", registerAsync);

export default router;