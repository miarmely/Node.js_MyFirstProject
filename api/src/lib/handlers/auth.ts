import userModel from "../../db/models/user"
import envConfig from "../../config/dotenv"
import passJwt from "passport-jwt"

export async function authStrategyAsync(payload: any, done: passJwt.VerifiedCallback) {
    try {
        // get user by id
        const user = await userModel.findOne(
            { _id: payload.id, isDeleted: false },
            { password: false, isDeleted: false })

        // when id not found
        if (!user) {
            done(new Error("User not found").message, null);
            return;
        }

        // set new payload for jwt
        const currentTimeInSec = Date.now() / 1000;
        const newPayload = {
            id: user.id,
            exp: currentTimeInSec + envConfig.JWT.EXPIRES_TIME_IN_SEC
        };
        done(null, newPayload);
    }
    catch (err) {
        done(err, null);
        return;
    }
}

export async function signOutStrategyAsync(payload: any, done: passJwt.VerifiedCallback) {
    // change expire time
    const currentTimeInSec = Date.now() / 1000;
    const newPayload = {
        exp: currentTimeInSec - 1000
    }

    done(null, newPayload);
}