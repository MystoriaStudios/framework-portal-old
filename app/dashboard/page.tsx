import {auth, clerkClient} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {OrgDetails, UserDetails, NodeDetails} from "./details";
import Link from "next/link";

export default async function DashboardPage() {
    const {userId} = auth();

    if (!userId) {
        redirect("/");
    }

    const user = await clerkClient.users.getUser(userId);

    return (
        <div className="px-8 py-12 sm:py-16 md:px-20">
            {user && (
                <>
                    <h1 className="text-3xl font-semibold">
                        👋 Hi, {user.firstName || `Stranger`}
                    </h1>
                    <span>Welcome to your dashboard!</span>
                    <div className="grid gap-4 mt-8 lg:grid-cols-3">
                        <UserDetails/>
                        <OrgDetails/>
                        <NodeDetails/>
                    </div>
                </>
            )}
        </div>
    );
}
