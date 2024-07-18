export const config = {
    PORT: process.env.PORT == undefined ?
        3000
        : +process.env.PORT,

    CONNECTION_STRING: process.env.CONNECTION_STRING == undefined ?
        "mongodb://localhost:27017/Ajansspor"
        : process.env.CONNECTION_STRING,

    LOG_LEVEL: process.env.LOG_LEVEL == undefined ?
        "debug"
        : process.env.LOG_LEVEL,

    JWT: {
        SECRET_KEY: process.env.JWT_SECRET_KEY == undefined ?
            "QWEASDasd1231231DASDASF'!312erqweascascasf%+&+(+%&Y'+!^G23asf"
            : process.env.JWT_SECRET_KEY,

        EXPIRES_TIME_IN_SEC: process.env.JWT_EXPIRES_TIME_IN_HOURS == undefined ?
            24 * 60 * 60  // 1 day
            : +process.env.JWT_EXPIRES_TIME_IN_HOURS * 60 * 60,
    },

    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS == undefined ?
        10
        : +process.env.BCRYPT_SALT_ROUNDS
}

export default config;