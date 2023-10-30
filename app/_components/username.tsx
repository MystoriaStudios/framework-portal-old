import {auth, clerkClient} from "@clerk/nextjs";
import {redirect} from "next/navigation";

// @ts-ignore
export default async function Username({children}) {
    const {userId} = auth();

    if (!userId) {
        redirect("/");
    }

    const user = await clerkClient.users.getUser(userId);

    return user.username || `Stranger`
}
