import { Request, Response } from "express"
import userModel from "../db/models/user"
import jwt from "jwt-simple"
import envConfig from "../config/dotenv"
import enumConfig from "../config/enum"
import bcrypt from "bcrypt"

export async function signInAsync(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // when email not found
        const user = await userModel.findOne({ email })
        if (user == null) {
            res.status(enumConfig.HTTP_CODES.NOT_FOUND)
                .json({
                    success: false,
                    message: "Email or password is wrong"
                });

            return;
        }

        // when password is wrong
        const isPassTrue = await bcrypt.compare(password, user.password);
        if (!isPassTrue) {
            res.status(enumConfig.HTTP_CODES.NOT_FOUND)
                .json({
                    success: false,
                    message: "Email or password is wrong"
                });

            return;
        }

        // return token
        res.status(enumConfig.HTTP_CODES.OK)
            .json({
                success: true,
                token: await generateJwtTokenAsync(user),
                data: {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            })
    }
    catch (err) {
        // when unexpected error is occured
        res.status(enumConfig.HTTP_CODES.INT_SERVER_ERROR)
            .json({
                success: false,
                message: "asdas"
            })
    }
}

export async function signOutAsync(req: Request, res: Response) {
    console.log("signed out.")

    res.status(204)
    res.json("signed out");
}

async function generateJwtTokenAsync(user: any): Promise<string> {
    const nowDateInSec = Date.now() * 1000;

    const payload = {
        id: user.id,
        exp: nowDateInSec + envConfig.JWT.EXPIRES_TIME_IN_SEC,
    };

    return jwt.encode(payload, envConfig.JWT.SECRET_KEY);
}