import {auth, clerkClient} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import React from "react";

export default async function BlogCreatePage() {
    const {userId} = auth();

    if (!userId) {
        redirect("/");
    }

    const user = await clerkClient.users.getUser(userId);

    // @ts-ignore
    if (user.publicMetadata["role"] < 4) {

        return null
    }

    return (
        <div className="px-8 py-12 sm:py-16 md:px-20">
            {user && (
                <div className="flex-col flex px-72">
                    <div className="flex-col flex">
                        <h1 className="text-3xl font-semibold">
                            👋 Hi, {user.firstName || `Stranger`}
                        </h1>
                        <span>Create a new blog post below!</span>
                    </div>

                    <form className="mt-12 flex-row gap-10" method="post"
                          action="https://api.nopox.xyz/api/blog/post">
                        <div className={"flex flex-col gap-y-4"}>
                            <span className={"flex flex-col gap-1"}>
                                Slug
                                <input type="text" id="key" name="key" className="dark:bg-neutral-800 input input-bordered w-full max-w-xs text-neutral-100" />
                            </span>
                            <span className={"flex flex-col gap-1"}>
                                Title
                                <input type="text" id="title" name="title" className="dark:bg-neutral-800 input input-bordered w-full max-w-xs text-neutral-100" />
                            </span>
                            <span className={"flex flex-col gap-1"}>
                                Body
                                <input type="textarea" id="content" name="content" className="dark:bg-neutral-800 input input-bordered w-full max-w-xs text-neutral-100" />
                            </span>
                            <input
                                // @ts-ignore
                                type="hidden" value={user?.firstName || ""} id="author" name="author"/>
                            <button role="submit"
                                    className="btn text-blue-500 border-blue-500 w-1/3 animate-pulse">
                                Create Blog Posts
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
