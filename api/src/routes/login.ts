import express from "express";
import { loginAsync } from "../handlers/login";

const router = express.Router();
router.post("/", loginAsync);

export default router;