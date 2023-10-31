import {auth, clerkClient} from "@clerk/nextjs";
import {redirect} from "next/navigation";

export default async function DashboardPage() {
    const {userId} = auth();

    if (!userId) {
        redirect("/");
    }

    const user = await clerkClient.users.getUser(userId);

    return (
        <div className="px-6 md:px-12">
            {user && (
                <>
                    <h1 className="text-3xl font-semibold">
                        Nodes
                    </h1>

                </>
            )}
        </div>
    );
}
