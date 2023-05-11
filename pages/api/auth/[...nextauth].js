import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import User from "@/models/UserModel";
import db from "@/utils/db";

db.connectDb();
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    // OAuth authentication providers...
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials || {};
        const user = await User.findOne({ email }).select("+password");

        if (user) {
          return SignInUser({ password, user });
        } else {
          throw new Error("This email does not exist.");
        }
      },
    }),

    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      let user = await User.findById(token.sub);
      session.user.id = token.sub || user._id.toString();
      session.user.role = user.role || "user";
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET_KEY,
});

const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please enter your password.");
  }

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new Error("Email or password is wrong!");
  }

  user.password = undefined;
  return user;
};
