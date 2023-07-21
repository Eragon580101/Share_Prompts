import NextAuth, { DefaultSession, DefaultUser, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import { connectToDatabase } from '@utils/database';
import User from '@models/user';

const nextAuthOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

            // Value returned from this is used by user in SignIn callback
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    given_name: profile.given_name,
                }
            }
        })
    ],
    callbacks: {
        async signIn({ user }) {
            try {
                await connectToDatabase('signIn')
                console.log('signing in', user)
                // check if user exists
                const userExists = await User.findOne({ email: user?.email })
                // if not, create user
                if (!userExists) {
                    await User.create({
                        email: user?.email,
                        username: user?.name?.replace(" ", "_").toLowerCase(),
                        image: user?.image
                    })
                }
                return true
            } catch (e) {
                console.log(e)
                return false
            }

        }
    }

}

const handler = NextAuth(nextAuthOptions)
console.log(handler)

export { handler as GET, handler as POST }