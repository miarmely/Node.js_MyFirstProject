import express from "express";
import { signInAsync, signOutAsync } from "../handlers/login";
import auth from "../lib/auth"

// no authentication
const router = express.Router();
router.post("/signin", signInAsync);

// with authentication
router.all("*", auth.authenticate())
router.post("/signout", auth.signOut(), signOutAsync);

export default router;