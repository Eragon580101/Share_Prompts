import { Schema, model, models } from "mongoose";

interface IUser {
    email: {
        type: StringConstructor;
        required: [boolean, string];
        unique: [boolean, string];
    };
    username: string;
    image: string;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    image: {
        type: String,
    }
})

const User = models.User || model<IUser>("User", UserSchema);
export default User;