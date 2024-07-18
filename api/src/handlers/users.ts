import { Request, Response } from "express"
import userModel from "../db/models/user"
import bcrypt from "bcrypt"
import enumConfig from "../config/enum";
import envConfig from "../config/dotenv"

export async function getAllUsersAsync(req: Request, res: Response) {
    const users = await userModel.find(
        { isDeleted: false },
        {
            isDeleted: false
        });

    res.json(users);
}

export async function registerAsync(req: Request, res: Response) {
    const { firstName, lastName, email, phone, password } = req.body;

    // check email or phone whether conflicted
    if (await isEmailOrPhoneConflictedAsync(email, phone, res))
        return;

    // hash the password
    const hashedPass = await bcrypt.hash(
        password,
        envConfig.BCRYPT_SALT_ROUNDS);

    // create user
    const user = await new userModel({
        firstName,
        lastName,
        email,
        phone,
        password: hashedPass
    });
    await user.save();

    res.status(enumConfig.HTTP_CODES.NO_CONTENT)
        .json({
            success: true,
            message: "register successful"
        });

    try {

    }
    catch (err) {
        res.status(enumConfig.HTTP_CODES.INT_SERVER_ERROR)
            .json({
                success: false,
                message: err
            });
    }
}

async function isEmailOrPhoneConflictedAsync(
    email: string,
    phone: string,
    res: Response
): Promise<boolean> {
    // get users with same email or phone
    const conflictedUsers = await userModel.find({ $or: [{ email }, { phone }] });

    if (conflictedUsers != null) {
        // when email is conflicted
        const conflictedUsersByEmail = conflictedUsers.find(u => u.email === email);

        if (conflictedUsersByEmail != null) {
            res.status(enumConfig.HTTP_CODES.CONFLICTED)
                .json({
                    success: false,
                    message: "email is conflicted."
                });

            return true;
        }

        // when phone is conflicted
        const conflictedUsersByPhone = conflictedUsers.find(u => u.phone === phone);

        if (conflictedUsersByPhone != null) {
            res.status(enumConfig.HTTP_CODES.CONFLICTED)
                .json({
                    success: false,
                    message: "phone is conflicted."
                });

            return true;
        }
    }

    return false;
}