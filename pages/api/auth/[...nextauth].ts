import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import dbConnect from "../../../lib/dbConnect";
import User from "../../../models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      async profile(profile) {
        await dbConnect();
        const name = profile.name || profile.login;
        const oldUser = await User.findOne({ name: name });
        const userProfile = {
          name: profile.name || profile.login,
          email: profile.email ? profile.email : null,
          avatar: profile.avatar_url,
          role: "user",
        };

        if (!oldUser) {
          const newUser = new User({
            ...userProfile,
            provider: "github",
          });
          await newUser.save();
        } else {
          userProfile.role = oldUser.role;
        }
        return { ...userProfile, id: profile.id };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session }) {
      await dbConnect();
      const user = await User.findOne({ email: session.user?.email });
      if (user) {
        session.user = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        } as any;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/404",
  },
};

export default NextAuth(authOptions);
