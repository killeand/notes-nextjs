import { prisma } from "@/scripts/Prisma";
import { getToken } from 'next-auth/jwt';
import _ from 'lodash';

export default async function handler(req, res) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });
    
    if (req.method != "DELETE" || !token) {
        res.status(400).json({ response: "error", message: "Improper request" });
        return;
    }

    if (!_.has(req.body, "id")) {
        res.status(400).json({ response: "error", message: "Improper request" });
        return;
    }

    let response = null;

    try {
        response = await prisma.NoteGroup.deleteMany({
            where: {
                id: req.body.id,
                AND: {
                    userid: token.sub
                }
            }
        });
        res.status(200).json({ response: "success", message: response });
        return;
    }
    catch (error) {
        res.status(500).json({ response: "error", message: error.message });
        return;
    }
}