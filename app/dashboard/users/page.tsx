"use client"

import {auth, clerkClient} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import React from 'react';

interface UserDetailsProps {
    user: any; // Replace 'any' with the actual type of the user
}

export default function UsersPage() {
    const [users, setUsers] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchUsers = async () => {
            const userList = await clerkClient.users.getUserList();
            setUsers(userList);
        };

        fetchUsers();
    }, []);

    return (
        <div className="px-6 md:px-12">
            <h1 className="text-3xl font-semibold">
                Users
            </h1>
            {users.map((user) => (
                <span>user.username</span>
            ))}
        </div>
    );
}