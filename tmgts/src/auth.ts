import NextAuth, { CredentialsSignin } from "next-auth";
import Credential from "next-auth/providers/credentials";
import { Admin } from "./models/admin";
import dbConnect from "./lib/DBconnect";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credential({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { username, password } = credentials;

        await dbConnect();

        // Find the user by username
        const user = await Admin.findOne({ username }).select("+password");
        if (!user) throw new CredentialsSignin({ cause: "Invalid user" });

        // Verify password
        const isPasswordCorrect = await bcrypt.compare(password as string, user.password);
        if (!isPasswordCorrect)
          throw new CredentialsSignin({ cause: "Password is incorrect" });

        // Return the user data
        return {
          _id: user._id,
          name: user.name,
          username: user.username,
          isMasterAdmin: user.isMasterAdmin,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // If the user is logging in, add the user data to the token
      if (user) {
        token.name=user.name;
        token._id = user._id;
        token.username = user.username;
        token.isMasterAdmin = user.isMasterAdmin; // Add isMasterAdmin to the token
      }
      return token;
    },
    async session({ session, token }) {

      if (token) {
        session.user.name = token.name as string;
        session.user._id = token._id as string;
        session.user.username = token.username as string;
        session.user.isMasterAdmin = token.isMasterAdmin as boolean;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Use JWT strategy for sessions
  },
  pages: {
    signIn: "/login", // Redirect to the login page on sign-in
  },
});
