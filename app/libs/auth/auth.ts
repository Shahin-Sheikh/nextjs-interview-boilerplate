import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from '../../libs/PrismaClient/prisma'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "name@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) { // if there is no credentials
          return null
        }
        try {
          const userData = await prisma.users.findUnique({ where: { email: credentials.email } });

          if (!userData) { // if the user data isnt exist
            throw new Error('User data not found!')
          }

          const comparedPassword = await bcrypt.compare(credentials?.password, userData.password)
          if (!comparedPassword) { // if the password doesnt match
            throw new Error('Invalid email or password, please try again')
          }

          return {
            // the properties name are based on nextauth rules
            // so if we want to add more properties we can use session callback
            name: userData.username,
            email: userData.email,
            id: userData.id
          }
        } catch (error: any) {
          throw new Error(error)
        }
      }
    })
  ],
  callbacks: {
    // nextauth automatically decodes and encodes jwt token
    async jwt({ token, user }) {
      // if the user logs in again, the 'token' will contain the token from the previous login and 'user' will be empty
      // so the if statement will be executed and the function returns the token itself
      if (!user) {
        return token
      };

      // for the first time login, the 'token' will be empty but the 'user' contains data from logged in user
      // so the if statement will not be executed and this function returns user data that automatically will be encoded into jwt token
      return { // using the spread operator to include the previous token properties
        ...token, // for the first time login, the token will be null
        id: user.id // adding id from user to token as token
      }
    },
    // everytime jwt token updates or re-generates, the session callback will also be executed
    async session({ session, token }) {
      return { // the return value will be added to user session
        ...session,
        user: {
          ...session.user,
          id: token.id // takes the id from the token
        }
      }
    }
  },
  session: {
    strategy: 'jwt',
    // jwt session duration in seconds (30 days), the token will expire after the max age
    // then nextauth will automatically regenerates the token
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: { // custom page routes
    signIn: '/auth/signin',
    // signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
}

