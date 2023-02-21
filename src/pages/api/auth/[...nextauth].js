import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import _ from 'lodash';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text", placeholder: "email@domain.com" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials, req) {
                if (_.isEmpty(credentials.username) || _.isEmpty(credentials.password))
                    return null;
                
                let prisma = new PrismaClient();
                
                try {
                    let userdata = await prisma.user.findMany({
                        where: { email: credentials.username }
                    });

                    console.log(userdata);
                }
                catch (e) { console.error(e) }

                return null;
            }
        }),
    ],
});