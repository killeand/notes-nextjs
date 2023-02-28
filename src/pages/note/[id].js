import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { axiosClient } from "@/scripts/Axios";
import { useQuery } from 'react-query';
import _ from 'lodash';

export default function Note({ id }) {
    return (
        <div>{id}</div>
    );
}

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return { redirect: { destination: "/" } }
    }

    if (!context.params.id) {
        return { redirect: { destination: "/" } }
    }

    if (!context.params.id.match(/[0-7][0-9A-HJKMNP-TV-Z]{25}/)) {
        return { redirect: { destination: "/" } }
    }

    return { props: { id: context.params.id } };
}