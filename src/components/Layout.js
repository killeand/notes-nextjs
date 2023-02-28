import Head from 'next/head';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { axiosClient } from '@/scripts/Axios';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import _ from 'lodash';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
    const { data: session } = useSession();
    const qc = useQueryClient();
    const [newgroup, setNewgroup] = useState("");
    const router = useRouter();

    const groups = useQuery(["notegroup"], () => {
        return axiosClient.get("/api/group/list").then((response) => response.data);
    }, { enabled: (!_.isNil(session)) });

    const addgroup = useMutation((data) => {
        return axiosClient.put("/api/group/create", data).then((response) => response.data);
    }, {
        onSuccess: () => qc.invalidateQueries(['notegroup'])
    });

    const delgroup = useMutation((data) => {
        return axiosClient.delete("/api/group/delete", { data: data }).then((response) => response.data);
    }, {
        onSuccess: () => qc.invalidateQueries(['notegroup'])
    });

    function HandleAddGroup() {
        if (!_.isEmpty(newgroup)) {
            addgroup.mutate({ name: newgroup });
            setNewgroup("");
        }
    }

    function HandleDelGroup(id) {
        delgroup.mutate({ id: id });
        router.push("/");
    }

    function RenderGroups() {
        if (groups.isLoading)
            return (<div>Loading...</div>);
        
        if (groups.isSuccess && groups.data.message.length == 0)
            return (<div>No Groups Yet...</div>);
        
        return groups.data.message.map((group, index) => {
            return (
                <div key={group.id} className="flex flex-row space-x-2">
                    <Link href={`/note/${group.id}`} className="btn btn-primary btn-sm">{group.name}</Link>
                    <button className="btn btn-error btn-sm bi-trash" onClick={()=>HandleDelGroup(group.id)} />
                </div>
            );
        });
    }

    return (
        <>
            <Head>
                <title>Notes App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <header data-theme="winter" className="flex flex-col w-1/6 space-y-1">
                <Link href="/" className="flex flex-row text-2xl font-bold p-1 justify-center">
                    <div className="bi-tools mr-2" />
                    <div>Notes App</div>
                </Link>
                <nav className="flex flex-col">
                    {session && (
                        <>
                            <div className="text-xs text-center font-bold">signed in as: {session.user.email}</div>
                            <Link onClick={()=>signOut({callbackUrl:"/"})} href="#">Sign Out</Link>
                        </>
                    )}
                    {!session && (
                        <>
                            <Link href="/auth/signin">Sign In</Link>
                            <Link href="/auth/signup">Sign Up</Link>
                        </>
                    )}
                </nav>
                {session && (
                    <>  
                        <div className="text-center text-xl font-bold border-b">Note Groups</div>
                        <nav className="flex flex-col mx-3 space-y-1">
                            {RenderGroups()}
                        </nav>
                        <div className="flex flex-row mx-3 items-center border border-black rounded-xl">
                            <input type="text" placeholder="Add New Group" className="w-full h-full rounded-l-xl px-2" value={newgroup} onChange={(e) => setNewgroup(e.target.value)} />
                            <button className="btn btn-primary btn-sm rounded-l-none" onClick={HandleAddGroup}>Add Group</button>
                        </div>
                    </>
                )}
            </header>
            <main data-theme="winter" className="bg-gradient-to-r from-white to-gray-400 flex-grow">
                {children}
            </main>
        </>
    );
}