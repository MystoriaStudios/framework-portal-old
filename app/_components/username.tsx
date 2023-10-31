"use client"

import {auth, clerkClient} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import { useState, useEffect } from 'react';

interface UsernameProps {
    className?: string;
}

export default function Username({ className }: UsernameProps) {
    const [username, setUsername] = useState('Stranger');

    useEffect(() => {
        const fetchUsername = async () => {
            const {userId} = auth();

            if (!userId) {
                redirect("/");
            }

            const user = await clerkClient.users.getUser(userId);
            setUsername(user.username || 'Stranger');
        };

        fetchUsername();
    }, []);

    return <div className={className}>{username}</div>;
}