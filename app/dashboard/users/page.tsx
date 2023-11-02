"use client"

import {auth, useUser} from "@clerk/nextjs"
import {redirect} from "next/navigation";
import React, {useEffect} from 'react';

interface UserDetailsProps {
    user: any; // Replace 'any' with the actual type of the user
}

import { clerkClient } from "@clerk/nextjs"
export default function UsersPage() {
    const [users, setUsers] = React.useState<any[]>([]);

    const {user, isLoaded} = useUser()

    React.useEffect(() => {
        const fetchUsers = async () => {
            const userList = await clerkClient.organizations.getOrganizationMembershipList({
                // @ts-ignore
                organizationId: user?.organizationMemberships?.find((it) => it)?.organization.id
            });
            setUsers(userList);
        };

        fetchUsers();
    }, []);

    return (
        <div className="px-6 md:px-12">
            <h1 className="text-3xl font-semibold">
                Users
            </h1>
            {
                isLoaded ? (JSON.stringify(users)) : ("")
            }
            {users.map((user) => (
                <span>user.username</span>
            ))}
        </div>
    );
}