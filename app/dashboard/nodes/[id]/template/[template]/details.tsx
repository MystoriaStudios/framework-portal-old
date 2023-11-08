"use client";

import {useOrganization} from "@clerk/nextjs";
import React, {useState} from "react";
import useSWR from 'swr'
import Link from "next/link";
import {useParams, useRouter} from "next/navigation";

declare global {
    interface Window {
        Prism: any;
    }
}

interface InfoCardProps {
    title: string;
    value: string | number;
}

const InfoCard = ({title, value}: InfoCardProps) => (
    <div className="text-black text-center border-transparent px-2 py-1 w-full">
        <h1 className="text-amber-400 font-bold tracking-wider whitespace-nowrap">{title}</h1>
        <h2 className="whitespace-nowrap overflow-auto dark:text-white">{value}</h2>
    </div>
);

export function TemplateDetails() {
    const router = useRouter()
    const {isLoaded, organization} = useOrganization();
    const params = useParams();
    const id = params.id;


    const {data, error, isValidating} = useSWR(`https://api.nopox.xyz/api/nodes/${id}`, fetcher)

    if (!isValidating && data[0].state == "SETUP") {
        //    router.push(`/dashboard/nodes/${id}/setup`)
        return <></>
    }

    const templateKey = params.template

    const route = `${data ? data[0].href : ""}deployment/template/${templateKey}`
    console.log(route)

    const {data: template} = useSWR(route, fetcher)

    if (error) {
        return <p>{error.toString()}</p>
    }

    return (
        <div className="">
            {isLoaded && !isValidating && template ? (
                <div className="pb-6">
                    <h1 className="text-3xl font-semibold mb-12">
                        Editing template {template.templateKey}
                    </h1>


                    <Link href={`${data[0].href}deployment/call/${template.templateKey}`}
                          className="btn text-green-500 border-green-500 w-1/3 animate-pulse">
                        Deploy Template
                    </Link>

                    <form className="my-4 flex-row gap-10" method="post"
                          action={`${data[0].href}deployment/template/${template.templateKey}`}>
                        <div className={"flex flex-col gap-y-4"}>
                            <span className="flex flex-row gap-x-4">
                                <span className={"flex flex-col gap-1 w-full max-w-xs"}>
                                Template Key:
                                <input type="text" placeholder="Node key" value={template.templateKey} id="key"
                                       name="key"
                                       className="dark:bg-neutral-800 input input-bordered w-full max-w-xs text-neutral-100"
                                       disabled/>
                            </span>
                                <span className={"flex flex-col gap-1 w-full max-w-xs"}>
                                Environment Type:
                                <select className="dark:bg-neutral-800 select w-full max-w-xs">
                                    <option selected>Paper</option>
                                </select>
                            </span>
                            </span>
                            <span className={"flex flex-col gap-1"}>
                                Origin:
                                <input type="text" placeholder="Origin" defaultValue={template.serverExecutableOrigin}
                                       id="serverExecutableOrigin" name="serverExecutableOrigin"
                                       className="dark:bg-neutral-800 input input-bordered w-full max-w-2xl text-neutral-100"/>
                            </span>
                            <span className={"flex flex-col gap-1"}>
                                Startup Command:
                                <textarea placeholder="Origin" defaultValue={template.startupCommand} id="startupCommand"
                                          name="startupCommand"
                                          className="dark:bg-neutral-800 input input-bordered w-full max-w-2xl h-56 text-neutral-100"/>
                            </span>
                            <span className={"flex flex-col gap-1"}>
                                Docker Image:
                                <input type="text" placeholder="Origin" defaultValue={template.dockerImage} id="dockerImage"
                                       name="dockerImage"
                                       className="dark:bg-neutral-800 input input-bordered w-full max-w-2xl text-neutral-100"/>
                            </span>
                            <button role="submit"
                                    className="btn text-blue-500 border-blue-500 w-1/3 animate-pulse">
                                Save Template Changes
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="text-gray-50 px-8 pb-5 text-2xl text-center transition-all delay-300">
                    There is no template with this key
                </div>
            )}
        </div>
    );
}

const fetcher = async (...args: [string, RequestInit?]) => await fetch(...args).then(async res => {
    return await res.json()
})