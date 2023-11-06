"use client"

import {useUser} from "@clerk/nextjs";
import useSWR from "swr";
import React from "react";
import {useParams} from "next/navigation";

const fetcher = async (...args: [string, RequestInit?]) => await fetch(...args).then(async res => {
    const response = await res.json()
    console.log(response)
    return response
})


export default function DashboardPage() {
    const params = useParams();
    const id = params.id;
    const user = useUser()


    const route = `https://api.nopox.xyz/api/nodes/${id}`
    console.log(route)

    const {data, error, isValidating} = useSWR(route, fetcher)

    if (error) {
        return <p>{error.toString()}</p>
    }

    return (
        <div className="px-6 md:px-12">
            {user && data && (
                <>
                    <h1 className="text-3xl font-semibold">
                        Node Setup
                    </h1>

                    <br/>

                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>Notice! This system is in alpha and may not function as expected.</span>
                    </div>

                    <form className="my-4 flex-row gap-10 w-1/2" method="post"
                          action={`http://${data[0].href}:8086/setup/${data[0].identifier}`}>
                        <div className={"flex flex-col gap-y-4"}>
                            <span className={"flex flex-col gap-1"}>
                                Node Key:
                                <input type="text" placeholder="Node key" value={data[0].name} id="key" name="key"
                                       className="dark:bg-neutral-800 input input-bordered w-full max-w-xs text-neutral-100"
                                       disabled/>
                            </span>
                            <button role="submit"
                                    className="btn text-blue-500 border-blue-500 w-1/3 animate-pulse">
                                Complete Node Setup
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}
