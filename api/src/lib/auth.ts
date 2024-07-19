import pass, { authenticate } from "passport"
import passJwt from "passport-jwt"
import envConfig from "../config/dotenv"
import { strategyAsync } from "./handlers/auth"

function auth() {
    // create strategy
    const strategy = new passJwt.Strategy({
        secretOrKey: envConfig.JWT.SECRET_KEY,
        jwtFromRequest: passJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
    }, strategyAsync);

    pass.use(strategy);

    return {
        initialize: () => pass.initialize(),
        authenticate: () => pass.authenticate("jwt", { session: false }),
    }
}


export default auth()