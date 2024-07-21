import { Request, Response } from "express"
import userModel from "../db/models/user"
import bcrypt from "bcrypt"
import envConfig from "../config/dotenv"
import httpCodes from "../config/enums/httpCodes"


export async function registerAsync(req: Request, res: Response) {
    const { firstName, lastName, email, phone, password } = req.body;

    // check email or phone whether conflicted
    const errorMsg = await isEmailOrPhoneConflictedAsync(email, phone);

    if (errorMsg) {
        res.status(httpCodes.CONFLICTED)
            .json({
                success: false,
                message: errorMsg
            });

        return;
    }

    // create user
    try {
        const hashedPass = await bcrypt.hash(
            password,
            envConfig.BCRYPT_SALT_ROUNDS);

        const user = await new userModel({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPass
        });

        await user.save();

        res.status(httpCodes.NO_CONTENT)
            .json({
                success: true,
                message: "register successful"
            });

    }
    catch (err) {
        res.status(httpCodes.INT_SERVER_ERROR)
            .json({
                success: false,
                message: err
            });
    }
}

export async function getAllUsersAsync(req: Request, res: Response) {
    const users = await userModel.find(
        { isDeleted: false },
        { isDeleted: false, password: false });

    res.json(users);
}


async function isEmailOrPhoneConflictedAsync(
    email: string,
    phone: string
): Promise<string | null> {
    // get users with same email or phone
    const conflictedUsers = await userModel.find({ $or: [{ email }, { phone }] });
    let errorMsg = "";

    if (conflictedUsers != null) {
        // when email is conflicted
        const conflictedUsersByEmail = conflictedUsers.find(u => u.email === email);
        if (conflictedUsersByEmail != null)
            errorMsg += "'phone' ";

        // when phone is conflicted
        const conflictedUsersByPhone = conflictedUsers.find(u => u.phone === phone);
        if (conflictedUsersByPhone != null)
            errorMsg += "'email' "

        errorMsg += "is conflicted";
    }

    return null;
}