import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "@utils/database";
import User from "@models/user";

{/** Documentation of next-auth: https://next-auth.js.org/configuration/initialization */}
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })
    
            // to check which user is online
            session.user.id = sessionUser._id.toString()
    
            return session
        },
    
        async signIn({ profile }) {
            try {
                //serverless -> Lambda function -> opens up only when gets called and make a connection to database(need to make db first)
                await connectToDB()
    
                //check if user already exists -> if not create a new one
                const userExists = await User.findOne({
                    email: profile.email
                })
    
                //if not create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
    
                return true;
            } catch (err) {
                console.log(err);
                return false
            }
        }
    }
})

export { handler as GET, handler as POST};