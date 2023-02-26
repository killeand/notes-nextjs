import { prisma } from "@/scripts/Prisma";
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { ulid } from "ulid";

export default async function handler(req, res) {
    if (req.method != "PUT" || req.headers['content-type'] != "application/json") {
        res.status(400).json({ response: "error", message: "Improper request" });
        return;
    }

    if (!_.has(req.body, 'username') || !_.has(req.body, 'password')) {
        res.status(400).json({ response: "error", message: "Improper request" });
        return;
    }

    let usercount = -1;
    try {
        usercount = await prisma.user.count({ where: { email: req.body.username } });
    }
    catch (error) {
        res.status(500).json({ response: "error", message: "Could not contact the database" });
        return;
    }

    if (usercount > 0) {
        res.status(400).json({ response: "error", message: "Username in use" });
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    let pass = bcrypt.hashSync(req.body.password, salt);

    try {
        await prisma.user.createMany({
            data: [
                {
                    id: ulid(),
                    email: req.body.username,
                    password: pass,
                    salt: salt,
                    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
                }
            ]
        });
    }
    catch (error) {
        res.status(500).json({ response: "error", message: error.message });
        return;
    }
    
    res.status(200).json({ response: "success", message: "All good dawg" });
}