"use client"

import {auth, clerkClient, useUser} from "@clerk/nextjs";
import useSWR from "swr";
import React from "react";

const fetcher = async (...args: [string, RequestInit?]) => await fetch(...args).then(async res => {
    const response = await res.json()
    console.log(response)
    return response
})


export default function DashboardPage() {
    const user = useUser()


    const route = `https://api.nopox.xyz/api/nodes/na-node-country`
    console.log(route)

    const {data, error, isValidating} = useSWR(route, fetcher)

    if (error) {
        return <p>{error.toString()}</p>
    }

    return (
        <div className="px-6 md:px-12">
            {user && (
                <>
                    <h1 className="text-3xl font-semibold">
                        Node Setup
                    </h1>

                    <br/>

                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Notice! This system is in alpha and may not function as expected.</span>
                    </div>


                    <form className="my-4 flex-row gap-10 w-1/2" method="post"
                          action="https://api.nopox.xyz:8080/api/nodes/post">
                        <div className={"flex flex-col gap-y-4"}>
                            <span className={"flex flex-col gap-1"}>
                                Node Key:
                                <input type="text" placeholder="Node key" value={"na-node-country"} id="key" name="key" className="input input-bordered w-full max-w-xs text-gray-100" disabled />
                            </span>

                            <span className={"flex flex-col gap-1"}>
                                Node Port:
                                <input type="number" placeholder="Enter a port" id="port" name="port" className="input input-bordered input-error w-full max-w-xs" />
                            </span>

                            <span className={"flex flex-col gap-1"}>
                                Kubernetes API Key:
                                <input type="text" placeholder="Enter the kubernetes api key for the node"  id="kubernetes" name="kubernetes" className="input input-bordered input-error w-full max-w-md" />
                            </span>
                            <span className={"flex flex-col gap-1"}>
                                Node Database:
                                <div className="stats grid-cols-2 shadow w-full">

                                <div className="stat bg-success w-full">
                                    <div className="stat-title text-white">Use Organization Hive</div>
                                    <div className="stat-value text-gray-50">RECOMMENDED</div>
                                    <div className="stat-desc text-gray-50">Cloud hosted always accessible</div>
                                </div>

                                <div className="stat bg-neutral-800 hover:bg-red-600 delay-150 duration-150 w-full">
                                    <div className="stat-title text-white">Use External Databases</div>
                                    <div className="stat-value text-gray-50">RISKY</div>
                                    <div className="stat-desc text-gray-50">Use at your own risk.</div>
                                </div>
                            </div>
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
