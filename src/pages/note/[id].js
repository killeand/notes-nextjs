
import Layout from "@/components/Layout";
import _ from 'lodash';
import withAuth from '@/scripts/withAuth';

export default function Note({ id }) {
    return (
        <Layout>
            <div>{id}</div>
        </Layout>
    );
}

export const getServerSideProps = withAuth(() => { console.log("inner"); return { props: {} } })

// export async function getServerSideProps(context) {
//     if (!context.params.id) {
//         return { redirect: { destination: "/" } }
//     }

//     if (!context.params.id.match(/[0-7][0-9A-HJKMNP-TV-Z]{25}/)) {
//         return { redirect: { destination: "/" } }
//     }

//     return { props: { id: context.params.id } };
// }