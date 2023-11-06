"use client"

import {useUser} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import Link from "next/link";
import useSWR from "swr";

const fetcher = async (...args: [string, RequestInit?]) => await fetch(...args).then(async res => {
    const response = await res.json()
    console.log(response)
    return response
})
export default function BlogPage() {
    const route = `https://api.nopox.xyz/api/blog/posts`

    const {data, error, isValidating} = useSWR(route, fetcher, {refreshInterval: 5000})

    if (data && data[0] !== undefined && data[0].state == "SETUP") {
        redirect(`/dashboard/nodes/${data[0].identifier}/setup`)
    }

    const user = useUser()

    // @ts-ignore
    return (
        <div className="px-8 py-12 sm:py-16 md:px-20">
            {user.user && (
                <div className="px-72">
                    <div className="flex-row flex">
                        <div className="flex-col flex">
                            <h1 className="text-3xl font-semibold">
                                👋 Hi, {user.user.firstName || `Stranger`}
                            </h1>
                            <span>Welcome to our blog space!</span>
                        </div>
                        {
                            // @ts-ignore
                            user.user.publicMetadata["role"] >= 4 ? (
                                <Link href="/blog/create"
                                      className="ml-auto btn text-green-400 border-green-600 opacity-80 dark:bg-neutral-800 text-xl rounded-none rounded-tr-lg rounded-bl-lg">
                                    Create Post
                                </Link>
                            ) : (<></>)
                        }
                    </div>


                    <div className="grid grid-rows-4 grid-cols-3 gap-12 p-4">
                        {data && data.length > 0 ? (
                            // @ts-ignore
                            data.map((post) => (
                                <Link key={post.key} href={`/blog/${post.key}`}
                                      className="card w-96 light:glass dark:bg-neutral-800 drop-shadow-lg">
                                    <figure><img
                                        src="https://imgs.search.brave.com/QA-ofQEF-eW6XEH42EiGzTAjNPmoXPyIyJmgKBencb0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzIzL05vcnRoZXJu/XzMzMV8xMDFfbGVh/dmluZ19CZW5fUmh5/ZGRpbmcuanBn"
                                        alt="car!"/></figure>
                                    <div className="card-body">
                                        <h2 className="card-title dark:text-neutral-50">{post.title}</h2>
                                        <p className="dark:text-neutral-200">{post.content}</p>

                                        <div className="card-actions gap-x-0 justify-end -mb-4 pt-8">
                                            <button
                                                className="btn rounded-none rounded-tl-xl text-sky-400 border-sky-400 border-1 dark:bg-neutral-800">Share
                                                Post
                                            </button>
                                            <button
                                                className="btn rounded-none rounded-br-xl text-amber-400 border-amber-400 border-1 dark:bg-neutral-800">View
                                                post!
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>
                                Loading blog posts..
                            </div>
                        )
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
