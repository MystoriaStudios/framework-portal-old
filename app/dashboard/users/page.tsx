"use client"

import {auth, clerkClient} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import React from 'react';

interface UserDetailsProps {
    user: any; // Replace 'any' with the actual type of the user
}

export function UserDetails({ user }: UserDetailsProps) {
    // Component implementation
    return (
        <div>
            {/* Display user details here */}
            <p>{user.name}</p>
        </div>
    );
}
export default function UsersPage() {
    const {userId} = auth();

    if (!userId) {
        redirect("/");
    }

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
                <UserDetails key={user.id} user={user} />
            ))}
        </div>
    );
}