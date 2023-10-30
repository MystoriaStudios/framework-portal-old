import {auth, clerkClient} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {NodeDetails, OrgDetails} from "./details";

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

                    <div className="flex flex-row w-7/8">
                        <div className="w-7/12">
                            <OrgDetails />
                        </div>
                        <div className="w-72 ml-12 bg-gray-50 rounded">
                            <div className="text-center font-bold text-2xl bg-sky-400 text-white border-sky-600 rounded shadow-md">
                                Notification Bar
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
