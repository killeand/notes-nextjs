import { useState } from 'react';
import Layout from '@/components/Layout';
import _ from 'lodash';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Signin() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    function HandleSignin() {
        setError(null);

        if (_.isEmpty(username) || _.isEmpty(password)) {
            setError("Stop being an idiot and fill the form out right...");
            return;
        }

        signIn("credentials", {
                redirect: false,
                username: username,
                password: password
            })
            .then((response) => {
                // error: null, status: 200, ok: true, url: blahh
                // error: "CredentialsSignin", status: 401, ok: false, url: null
                if (response.error) {
                    setError("Invalid username/password combination");
                    return;
                }
                else {
                    router.push("/");
                    return;
                }
            })
            .catch((error) => {
                setError("An unspecified error has ocurred. Please try again.");
                return;
            })
    }

    return (
        <Layout>
            <div className="h-full flex flex-col flex-grow items-center justify-center">
                <div className="bg-white border-2 border-black rounded-2xl p-3 flex flex-col space-y-2 w-1/3">
                    <h1>Sign In</h1>
                    {error && (
                        <div className="alert alert-error shadow-md p-1 bi-x-circle items-center justify-start">
                            <div>{error}</div>
                        </div>
                    )}
                    <div className="flex flex-row items-center">
                        <label htmlFor="username" className="w-1/4 mr-1">Username</label>
                        <input type="text" id="username" name="username" className="w-3/4 border border-black rounded-md px-1 py-0.5" placeholder="email@domain.com" value={username} onChange={(e)=>setUsername(e.target.value)} />
                    </div>
                    <div className="flex flex-row items-center">
                        <label htmlFor="password" className="w-1/4 mr-1">Password</label>
                        <input type="password" id="password" name="password" className="w-3/4 border border-black rounded-md px-1 py-0.5" value={password} onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn-primary btn-sm w-full" onClick={HandleSignin}>Sign In</button>
                </div>
            </div>
        </Layout>
    );
}