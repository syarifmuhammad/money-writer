import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from '@/app/_lib/axiosConfig'

export const authOptions = {
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
    callbacks: {
        async jwt({ token, user, account }) {
            if (account?.provider === "credentials") {
                token.id = user.id;
                token.accessToken = user.token;
            }

            return token;

        },
        async session({ session, token, user }) {
            session.user.id = token.id
            session.user.accessToken = token.accessToken
            return session

        },
    },
    session: {
        jwt: true,
    },
    pages: {
        signIn: '/login',
        newUser: '/register' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }