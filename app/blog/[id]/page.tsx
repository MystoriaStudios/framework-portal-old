"use client"

import {useUser} from "@clerk/nextjs";
import useSWR from "swr";
import React from "react";
import {useParams} from "next/navigation";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

const fetcher = async (...args: [string, RequestInit?]) => await fetch(...args).then(async res => {
    const response = await res.json()
    console.log(response)
    return response
})


export default function PostPage() {
    const params = useParams();
    const id = params.id;
    const user = useUser()


    const route = `https://api.nopox.xyz/api/blog/post/${id}`
    console.log(route)

    const {data, error, isValidating} = useSWR(route, fetcher)

    if (error) {
        return <p>{error.toString()}</p>
    }

    return (
        <div className="w-[70%] mx-[17.5%] bg-red-400">
            {user && data && (
                <>
                    <div className={"flex"}>
                        <img className={"-mt-32 w-full"}
                             src="https://imgs.search.brave.com/QA-ofQEF-eW6XEH42EiGzTAjNPmoXPyIyJmgKBencb0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzIzL05vcnRoZXJu/XzMzMV8xMDFfbGVh/dmluZ19CZW5fUmh5/ZGRpbmcuanBn"
                             alt="car!"/>
                    </div>


                    <div
                        className="-mt-72 z-100 absolute bg-neutral-50 dark:bg-neutral-900 w-[70%] p-8 h-72 h-fit max-h-fit">

                        <div className="flex flex-row">
                            <h1 className="text-3xl font-semibold mb-8">
                                {data[0].title} <span className="text-xl">written by {data[0].author}</span>
                            </h1>
                            <button
                                className="btn rounded-none rounded-br-xl rounded-tl-xl text-sky-400 border-sky-400 border-1 dark:bg-neutral-800 ml-auto">Share
                                Post
                            </button>
                        </div>

                        <Markdown remarkPlugins={[remarkGfm]}>{decodeURI(data[0].content)}</Markdown>
                    </div>
                </>
            )}
        </div>
    );
}
