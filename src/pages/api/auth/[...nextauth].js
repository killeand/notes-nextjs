import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/scripts/Prisma";
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
                
                let user = null;
                
                try {
                    user = await prisma.user.findMany({
                        where: { email: credentials.username }
                    });
                }
                catch (e) { return null; }

                if (_.isEmpty(user)) return null;

                if (bcrypt.compareSync(credentials.password, user[0].password)) {
                    return { id: user[0].id, email: user[0].email };
                }
                else return null;
            }
        }),
    ]
});