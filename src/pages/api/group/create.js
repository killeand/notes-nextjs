import { prisma } from "@/scripts/Prisma";
import { getToken } from 'next-auth/jwt';
import _ from 'lodash';
import { ulid } from "ulid";

export default async function handler(req, res) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });
    
    if (req.method != "PUT" || !token) {
        res.status(400).json({ response: "error", message: "Improper request" });
        return;
    }

    if (!_.has(req.body, "name")) {
        res.status(400).json({ response: "error", message: "Improper request" });
        return;
    }

    let response = null;

    try {
        response = await prisma.NoteGroup.create({ data: { id: ulid(), userid: token.sub, name: req.body.name } })
        res.status(200).json({ response: "success", message: response });
        return;
    }
    catch (error) {
        res.status(500).json({ response: "error", message: error.message });
        return;
    }
}