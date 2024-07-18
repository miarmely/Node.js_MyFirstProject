import envConfig from "../config/dotenv"
import { Database } from "../db/database"

export async function listenPortAsync() {
    // connect to db
    await new Database().connectAsync(envConfig.CONNECTION_STRING);
}