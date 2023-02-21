import { createContext, useState, useEffect } from "react";
import { ParseJWT } from "@/scripts/Utilities";

const UserContext = createContext(null);

export function UserProvider(props) {
    const [user, setUser] = useState({});

    useEffect(() => {
        let token = localStorage.getItem("notestoken");

        if (token) {
            token = ParseJWT(token);
        }

        if (token) {
            setUser({
                uid: token.sub.uid,
                email: token.sub.email
            });
        }
    }, []);

    return <UserContext.Provider value={{ user, setUser }} {...props} />
}

export default UserContext;