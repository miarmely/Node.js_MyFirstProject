import pass from "passport"
import passJwt from "passport-jwt"
import envConfig from "../config/dotenv"
import { authStrategyAsync, signOutStrategyAsync } from "./handlers/auth"

function auth() {
    return {
        initialize: () => {
            // set strategy
            const strategy = getAuthStrategy();
            pass.use(strategy);

            return pass.initialize();
        },
        authenticate: () => {
            // set strategy
            const strategy = getAuthStrategy();
            pass.use(strategy);

            return pass.authenticate("jwt", { session: false })
        },
        signOut: () => {
            // set strategy
            const strategy = getSignOutStrategy();
            pass.use(strategy);

            return pass.authenticate("jwt", { session: false })
        }
    }
}

function getAuthStrategy() {
    return new passJwt.Strategy({
        jwtFromRequest: passJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: envConfig.JWT.SECRET_KEY
    }, authStrategyAsync);
}

function getSignOutStrategy() {
    return new passJwt.Strategy({
        jwtFromRequest: passJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: envConfig.JWT.SECRET_KEY
    }, signOutStrategyAsync);
}

export default auth()