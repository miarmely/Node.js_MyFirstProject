import express from "express";
import { signInAsync, signOutAsync } from "../handlers/login";
import { validateTokenAsync } from "../lib/auth"


const router = express.Router();

// no authentication
router.post("/signin", signInAsync);

// with authentication
router.all("*", (req, res, next) => validateTokenAsync(req, res, next))
router.post("/signout", signOutAsync);


export default router;