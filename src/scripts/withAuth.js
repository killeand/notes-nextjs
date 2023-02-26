export default function withAuth ({ ...allvars }) {
    console.log(allvars);

    return () => { console.log("bleh"); return { props: {} } };
}