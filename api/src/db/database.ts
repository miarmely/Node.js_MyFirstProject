import mongoose from "mongoose"
import envConfig from "../config/dotenv"

let instance: Database;
let mongoConnection: mongoose.Mongoose | null;

// singleton class
export class Database {
    constructor() {
        // initialize variables only first time
        if (instance === undefined) {
            instance = this;
            mongoConnection = null;
        }

        return instance;
    }

    getMongoConnection() { return mongoConnection; }

    async connectAsync(connectionString: string) {
        console.log("db is connecting...");

        // connect to db
        mongoConnection = await mongoose.connect(connectionString);

        console.log("db is connected.");
    }
}