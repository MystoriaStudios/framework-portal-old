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
        <div className="w-[70%] mx-[17.5%] bg-red-400 block">
            <div className={"flex"}>
                <img className={"-mt-32 w-full"}
                     src="https://imgs.search.brave.com/QA-ofQEF-eW6XEH42EiGzTAjNPmoXPyIyJmgKBencb0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzIzL05vcnRoZXJu/XzMzMV8xMDFfbGVh/dmluZ19CZW5fUmh5/ZGRpbmcuanBn"
                     alt="car!"/>
            </div>


            <div className="-mt-72 z-100 absolute bg-neutral-50 dark:bg-neutral-900 w-[70%] p-8 h-96">
                <form className="mt-12 flex-row gap-10" method="post"
                      action="https://api.nopox.xyz/api/blog/post">

                    <div className="flex flex-row">
                        <h1 className="text-3xl font-semibold mb-8">
                        <span className={"flex flex-col gap-1"}>
                                Title
                                <input type="text" id="title" name="title"
                                       className="dark:bg-neutral-800 input input-bordered w-full max-w-xs text-neutral-100"/>
                                <input type="text" id="key" placeholder={"Enter a slug."} name="key"
                                       className="dark:bg-neutral-800 input input-bordered w-full max-w-xs text-neutral-100"/>
                            </span>
                            <input
                                // @ts-ignore
                                type="hidden" value={user?.firstName || ""} id="author" name="author"/>
                        </h1>
                        <button
                            className="btn rounded-none rounded-br-xl rounded-tl-xl text-sky-400 border-sky-400 border-1 dark:bg-neutral-800 ml-auto">Share
                            Post
                        </button>
                    </div>

                    <p>
                    <span className={"flex flex-col gap-1"}>
                                Body
                                <textarea id="content" name="content"
                                          className="dark:bg-neutral-800 input input-bordered w-full h-32 max-w-full text-neutral-100"/>
                            </span>
                    </p>
                </form>
            </div>
        </div>

    );
}
