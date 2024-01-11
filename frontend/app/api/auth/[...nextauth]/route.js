import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from '@/app/_lib/axiosConfig'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                return axios.post("/login", credentials).then(res => {
                    return res.data
                }).catch(err => {
                    console.log(err)
                    return null
                })
            },
        })
    ],
    session: { jwt: true },
    callbacks: {
        jwt({ token, user, account }) {
            if (account?.provider === "credentials") {
                // token.id = user.id;
                token.user = {
                    accessToken: user.token,
                    user_id: user.id
                }
            }

            return token;

        },
        session({ session, token }) {
            session.user = {
                accessToken: token.user.accessToken,
                user_id: token.user.user_id
            }
            return session

        },
    },
    pages: {
        signIn: '/login',
        newUser: '/register' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }