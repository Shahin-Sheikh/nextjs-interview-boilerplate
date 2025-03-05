import { Api } from "@/features/api";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { toast } from "sonner";

export const AuthOptions: NextAuthOptions = {
  // Auth providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        // required for normal login
        email_or_phone: {
          label: "Please enter your phone number or Email",
          type: "text",
        },
        password: { label: "Password", type: "text" },
      },

      // This function is called at server side only
      async authorize(credentials) {
        const API_URL = `${process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_API_URL}${Api.Login}`;

        const res = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(credentials),
        });

        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        throw new Error(user?.message || "Authorization failed");
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  // Custom auth pages
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },

  // Enable JWT session
  session: {
    strategy: "jwt",
  },

  // Provide user data in the session
  callbacks: {
    async jwt({ token, user, account }) {
      // For google sign in
      if (user && account?.provider === "google") {
        try {
          const API_URL = `${process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_API_URL}${Api.GoogleLogin}`;
          const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
              provider: account.provider,
              providerToken: account.access_token,
              source: "web",
            }),
          });
          const data = await res.json();

          return {
            ...data,
          };
        } catch (error) {
          toast.error(error as string);
        }
      }

      // initial sign in
      // add user data in the token
      if (user && account?.provider !== "google") {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user = {
          code: token.code,
          success: token.success,
          message: token.message,
          data: token.data,
        };
        session.access_token = token.access_token;
      }
      return session;
    },
  },
};
