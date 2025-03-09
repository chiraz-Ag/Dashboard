"use client"; 
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

const Login = () => {
    const { data: session } = useSession();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // Évite le rendu côté serveur

    return (
        <>
            {session ? (
                <Button variant="contained" color="error" onClick={() => signOut()}>
                    Sign out
                </Button>
            ) : (
                <>
                    <h2>Please log in</h2>
                    <br />
                    <Button variant="contained" color="success" onClick={() => signIn()}>
                        Sign in
                    </Button>
                </>
            )}
        </>
    );
};

export default Login;
