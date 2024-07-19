import mongoose from "mongoose";

const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isDeleted: { type: Boolean, default: false, required: true }
},
    {
        versionKey: false,
        timestamps: true
    });

class User extends mongoose.Model {
}

schema.loadClass(User);
export default mongoose.model("users", schema);