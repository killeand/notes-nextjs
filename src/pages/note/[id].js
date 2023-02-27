import { getServerSession } from "next-auth";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import axios from "axios";
import _ from 'lodash';

export default function Note({ id }) {
    return (
        <div>{id}</div>
    );
}

export async function getServerSideProps(context) {
    let g = await axios.get(`/api/group/${context.params.id}`)
    console.log(g);

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