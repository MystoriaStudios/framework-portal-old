"use client"

import {useUser} from "@clerk/nextjs";
import Link from "next/link";
import useSWR from "swr";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudDownload, faHeart} from "@fortawesome/free-solid-svg-icons";

const fetcher = async (...args: [string, RequestInit?]) => await fetch(...args).then(async res => {
    const response = await res.json()
    console.log(response)
    return response
})
export default function BlogPage() {
    const route = `https://api.nopox.xyz/api/blog/posts`

    const {data, error, isValidating} = useSWR(route, fetcher, {refreshInterval: 5000})

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
                            <span>Welcome to our marketplace!</span>
                        </div>
                        {
                            // @ts-ignore
                            user.user.publicMetadata["role"] >= 4 ? (
                                <div className="ml-auto">
                                    <Link href="/marketplace/create"
                                          className="btn text-green-400 border-green-600 opacity-80 dark:bg-neutral-800 rounded-none rounded-bl-xl">
                                        Submit Resource
                                    </Link>
                                    <Link href="/blog/create"
                                          className="btn text-amber-400 border-amber-600 opacity-80 dark:bg-neutral-800 rounded-none">
                                        Your Profile
                                    </Link>
                                    <Link href="/marketplace/my-resources"
                                          className="btn text-blue-400 border-blue-600 opacity-80 dark:bg-neutral-800 rounded-none rounded-tr-xl">
                                        Your Resources
                                    </Link>
                                </div>
                            ) : (<></>)
                        }
                    </div>


                    <div className="flex flex-col gap-4 p-4">
                        {data && data.length > 0 ? (
                            // @ts-ignore
                            data.map((post) => (
                                <Link key={post.key} href={`/blog/${post.key}`}
                                      className="card light:glass dark:bg-neutral-800 drop-shadow-lg">
                                    <div className={"p-1"}>
                                        <div className={"flex flex-row gap-x-4"}>
                                            <div className={"h-fit -mb-4 p-1"}>
                                                <img height={256} width={256} className="my-auto"
                                                     src="https://imgs.search.brave.com/QA-ofQEF-eW6XEH42EiGzTAjNPmoXPyIyJmgKBencb0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzIzL05vcnRoZXJu/XzMzMV8xMDFfbGVh/dmluZ19CZW5fUmh5/ZGRpbmcuanBn"
                                                     alt="car!"/>
                                            </div>

                                            <div className={"w-[30vw] mt-3"}>
                                                <h2 className="card-title dark:text-neutral-50">{post.title} <span
                                                    className={"text-sm dark:text-neutral-500"}>by {post.author}</span>
                                                </h2>
                                                <p className="dark:text-neutral-200">{post.content.substring(0, 55)}...</p>

                                                <h2 className="dark:text-neutral-200 mt-12.
                                                .
                                                ">Works on Paper, Minestom, Framework</h2>
                                            </div>


                                            <div className="flex flex-col ml-auto gap-x-0 justify-end p-2 -mr-1">
                                                <span className={"flex flex-row gap-x-1 dark:text-neutral-700"}>
                                                    <FontAwesomeIcon className={"my-auto"}
                                                                     icon={faCloudDownload}></FontAwesomeIcon>
                                                    <h1 className={"dark:text-neutral-500 font-extrabold tracking-wider"}>100</h1>
                                                    downloads
                                                </span>
                                                <span className={"flex flex-row gap-x-1 dark:text-neutral-700"}>
                                                    <FontAwesomeIcon className={"my-auto"}
                                                                     icon={faHeart}></FontAwesomeIcon>
                                                    <h1 className={"dark:text-neutral-500 font-extrabold tracking-wider"}>100</h1>
                                                    followers
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>
                                Loading marketplace..
                            </div>
                        )
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
