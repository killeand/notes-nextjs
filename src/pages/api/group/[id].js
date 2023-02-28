import { prisma } from "@/scripts/Prisma";
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req, secret });

    console.log(req.query, req.method, token);
    
    if (req.method != "GET" || !token) {
        res.status(400).json({ response: "error", message: "Improper request" });
        return;
    }

    let groups = null;

    try {
        groups = await prisma.NoteGroup.findMany({ where: { userid: token.sub } });
        res.status(200).json({ response: "success", message: groups });
        return;
    }
    catch (error) {
        res.status(500).json({ response: "error", message: error.message });
        return;
    }
}