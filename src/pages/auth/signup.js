import { useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Signup() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(null);

    function HandleSignup() {
        setError(null);

        if (_.isEmpty(username) || _.isEmpty(password) || _.isEmpty(password2)) {
            setError("Stop being an idiot and fill the form out right...");
            return;
        }

        if (password != password2) {
            setError(`${password} != ${password2}`);
            return;
        }

        axios.put("/api/auth/signup", { username: username, password: password })
            .then((response) => {
                router.push("/");
            })
            .catch((error) => {
                if (error.response)
                    setError(error.response.data.message);
                else
                    console.log(error);
            });
    }

    return (
        <div className="h-full flex flex-col flex-grow items-center justify-center">
            <div className="bg-white border-2 border-black rounded-2xl p-3 flex flex-col space-y-2 w-1/3">
                <h1>Sign Up</h1>
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
                <div className="flex flex-row items-center">
                    <label htmlFor="password2" className="w-1/4 mr-1">Password Again</label>
                    <input type="password" id="password2" name="password2" className="w-3/4 border border-black rounded-md px-1 py-0.5" value={password2} onChange={(e)=>setPassword2(e.target.value)} />
                </div>
                <button className="btn btn-primary btn-sm w-full" onClick={HandleSignup}>Sign Up</button>
            </div>
        </div>
    );
}