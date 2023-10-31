"use client"

import {auth, clerkClient} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {useEffect, useState} from 'react';

interface UsernameProps {
    className?: string;
}

export default async function Username({className}: UsernameProps) {
    const [username, setUsername] = useState('Stranger');

    const {userId} = auth();

    if (!userId) {
        redirect("/");
    }

    const user = await clerkClient.users.getUser(userId);
    setUsername(user.username || "Stranger")

    return <div className={className}>{username}</div>;
}