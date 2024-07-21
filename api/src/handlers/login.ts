import { Request, Response } from "express"
import myEnv from "../config/dotenv"
import httpCodes from "../config/enums/httpCodes"
import userModel from "../db/models/user"
import bcrypt from "bcrypt"
import { generateToken } from "../lib/auth"
import { validateEmail, validatePassword } from "../lib/validation"


//////////////////////////// VARIABLES /////////////////////////////////

const errorMsg = {
    failedSignIn: "email or password is invalid",
};

const jsonRes = {
    successfulSignIn: (user: any) => {
        const nowDateInSec = Date.now() / 1000;

        const payload = {
            id: user.id,
            exp: nowDateInSec * myEnv.JWT.EXPIRES_TIME_IN_SEC
        };

        return {
            success: true,
            message: "successful",
            token: generateToken(payload),
            data: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            signInDate: nowDateInSec
        };
    },

    failedSignIn: (msg: string) => {
        return {
            success: false,
            message: msg,
            token: null,
            data: {},
            signInDate: null
        };
    }
};


//////////////////////////////// FUNCTIONS /////////////////////////////

export async function signInAsync(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        // when email or password format is invalid
        if (!validateEmail(email)
            || !validatePassword(password))
            throw new Error("expected");

        // when email not found (THROW)
        const user = await userModel.findOne({ email })
        if (!user)
            throw new Error("expected");

        // when password is wrong (THROW)
        const isPassTrue = await bcrypt.compare(password, user.password);
        if (!isPassTrue)
            throw new Error("expected");

        // return token
        res.status(httpCodes.OK)
            .json(jsonRes.successfulSignIn(user));
    }
    catch (err: any) {
        // when expected error is occured
        if (err.message === "expected")
            res.status(httpCodes.NOT_FOUND)
                .json(jsonRes.failedSignIn(errorMsg.failedSignIn));

        // when unexpected error is occured
        else
            res.status(httpCodes.INT_SERVER_ERROR)
                .json(jsonRes.failedSignIn("internal server error"))
    }
}

export async function signOutAsync(req: Request, res: Response) {
}