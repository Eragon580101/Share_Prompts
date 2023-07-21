import User from "@models/user";
import { connectToDatabase } from "@utils/database";

export const getUserId = async (email: string) => {
    try {
        await connectToDatabase("getUserId")
        console.log('email', email)
        // get user id from email
        const user = await User.findOne({ email })
        return user._id
    } catch (error) {
        console.log(error)
        return null
    }
}