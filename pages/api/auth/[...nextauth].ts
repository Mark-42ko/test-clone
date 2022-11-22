import { compare } from "bcryptjs";
import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import accounts from "../../../lib/models/accounts";
import mongooseInit from "../../../lib/mongo_init";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "E-mail", type: "email", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password", placeholder: "********" }
            },
            async authorize(credentials, req) { 
                mongooseInit();
                const one = await accounts.findOne({ email: credentials!.email });
                if (!one || !(await compare(credentials!.password, one.password))) {
                    return null;
                }
                return { email: one.email, name: "클론테스트", id: one._id } as User;
            }
        }),
        GoogleProvider({
            clientId: "564585516138-v7ep4gchgu96uinru560bnpdhn5je4rp.apps.googleusercontent.com",
            clientSecret: "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",
        })
    ]
};

export default NextAuth(authOptions);