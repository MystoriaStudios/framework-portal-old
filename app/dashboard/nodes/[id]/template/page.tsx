import {auth, clerkClient} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {TemplateDetails} from "@/app/dashboard/nodes/[id]/template/details";

export default async function TemplatesPage() {
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
                        Templates
                    </h1>

                    <TemplateDetails></TemplateDetails>
                </>
            )}
        </div>
    );
}
