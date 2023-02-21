import Head from 'next/head';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function Layout({children}) {
    return (
        <>
            <Head>
                <title>Notes App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <header>
                <div>Logo</div>
                <nav>
                    <a onClick={signIn}>Sign In</a>
                </nav>
            </header>
            <main className="bg-red-400">
                {children}
            </main>
        </>
    );
}