import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function Authed(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: "/"
            }
        }
    }

    return { props: {} }
}