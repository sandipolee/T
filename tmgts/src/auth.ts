import NextAuth, { CredentialsSignin } from "next-auth";
import Credential from "next-auth/providers/credentials";
import { Admin } from "./models/admin";
import dbConnect from "./lib/DBconnect";
import bcrypt, { hash } from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credential({
      name: "Credential",
      credentials: {
        username: {
          label: "username",
          type: "String",
        },
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },

      authorize: async (credentials) => {
        const username = credentials.username as string;
        const password = credentials.password as string;

        dbConnect();
        // const hashedpassword = hash("sandip12345", 10);

        // Admin.create({
        //   username: "olee123",
        //   name: "sandip olee",
        //   email: "starksandip62@gmail.com",
        //   password:hashedpassword,
        //   mobileNum: "9841095380",
        //   gender: "male",
        //   isMasterAdmin: true,
        // });

        const userdata = await Admin.findOne({ username })

        const user = await Admin.findOne({ username }).select("password");
        if (!user)
          throw new CredentialsSignin({ cause: `invalid user ${user}` });
        if (!user.password)
          throw new CredentialsSignin({
            cause: "username and password is not valid",
          });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)
          throw new CredentialsSignin({ cause: "password  is  not mached " });
        else return userdata;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // if (user) {
      //   token._id = user._id?.toString(); // Convert ObjectId to string
      //   token.isVerified = user.isMasterAdmin;
      //   token.isAcceptingMessages = user.isAcceptingMessages;
      //   token.username = user.username;
      // }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        // session.user._id = token._id;
        // session.user.isVerified = token.isVerified;
        // session.user.isAcceptingMessages = token.isAcceptingMessages;
        // session.user.username = token.username;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
});
