import Head from 'next/head';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Layout({ children }) {
    const { data: session } = useSession();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (session) {
            axios.get("/api/group/list")
                .then((response) => {
                    setGroups(response.data.message);
                })
                .catch((error) => {
                    console.log("error", error);
                })
        }
    }, [session]);

    function RenderGroups() {
        if (groups.length == 0)
            return (<div>No Note Groups Yet...</div>)
        
        return groups.map((group, index) => {
            return (
                <div key={group.id}>{group.name}</div>
            );
        })
    }

    return (
        <>
            <Head>
                <title>Notes App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <header data-theme="winter" className="flex flex-col w-1/6">
                <Link href="/" className="flex flex-row text-2xl font-bold p-1 justify-center">
                    <div className="bi-tools mr-2" />
                    <div>Notes App</div>
                </Link>
                <nav className="flex flex-col">
                    {session && (<Link onClick={signOut} href="#">Sign Out</Link>)}
                    {!session && (
                        <>
                            <Link onClick={signIn} href="#">Sign In</Link>
                            <Link href="/auth/signup">Sign Up</Link>
                        </>
                    )}
                </nav>
                {session && (
                    <>
                        <div className="text-sm">Signed in as: {session.user.email}</div>
                        {RenderGroups()}
                    </>
                )}
            </header>
            <main data-theme="winter" className="bg-gradient-to-r from-white to-gray-400 flex-grow">
                {children}
            </main>
        </>
    );
}