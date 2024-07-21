import { NextFunction, Request, Response } from "express";
import jwtModule from "jsonwebtoken"
import myEnv from "../config/dotenv"
import userModel from "../db/models/user"
import httpCodes from "../config/enums/httpCodes"

//////////////////////// VARIABLES ////////////////////////

const JWT_SECRET_KEY: string = myEnv.JWT.SECRET_KEY;
const JWT_EXPIRES_TIME_IN_SEC: number = myEnv.JWT.EXPIRES_TIME_IN_SEC;
const ERROR_MSG: string = "invalid token";  // for use the validation.


//////////////////////// FUNCTIONS ////////////////////////

export function generateToken(payload: object): string {
    const currentTimeInSec = Date.now() / 1000;

    return jwtModule.sign(
        payload,
        JWT_SECRET_KEY,
        { expiresIn: currentTimeInSec * JWT_EXPIRES_TIME_IN_SEC });;
}

export async function validateTokenAsync(
    req: Request,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
        const token = getTokenFromHeader(req);

        // when payload is empty (THROW)
        const payload = jwtModule.verify(token, JWT_SECRET_KEY);
        if (typeof payload === "string")
            throw new Error();

        // when id not found (THROW)
        const user = await userModel.findOne({ _id: payload.id })
        if (!user)
            throw new Error();

        next();
    }
    catch (err: any) {
        res.status(httpCodes.UNAUTHORIZED)
            .json({
                success: false,
                message: ERROR_MSG
            })
    }
}

export function getTokenFromHeader(req: Request): string {
    const token: string = req.headers.authentication === undefined ?
        ""  // if undefined
        : typeof req.headers.authentication === "string" ?
            req.headers.authentication // if str
            : req.headers.authentication[0];  // if array

    return token;
}