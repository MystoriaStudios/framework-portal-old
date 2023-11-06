"use client";

import {useOrganization} from "@clerk/nextjs";
import React from "react";
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


    const {data, error, isValidating} = useSWR(`https://api.nopox.xyz/api/nodes/${id}`, fetcher, { refreshInterval: 5000 })

    if (!isValidating && data[0].state == "SETUP") {
    //    router.push(`/dashboard/nodes/${id}/setup`)
        return <></>
    }

    const route = `http://${data ? data[0].href : ""}:8086/deployment/templates`
    console.log(route)

    const {data: templates} = useSWR(route, fetcher, { refreshInterval: 5000 })

    if (error) {
        return <p>{error.toString()}</p>
    }

    return (
        <div className="mt-12">
            {isLoaded && !isValidating && templates && templates.length > 0 ? (
                <div className="pb-6">
                    <div className="grid grid-cols-3 grid-flow-row gap-8">
                        {
                            // @ts-ignore
                            templates.map((template: any) => {
                                return (
                                    <Link
                                        key={template.templateKey}
                                        href={template.templateKey}
                                        className="card flex justify-between gap-x-6 my-1 w-full py-3 dark:bg-neutral-950 dark:text-white">
                                        <div className="p-4">
                                            <h1 className="font-bold text-2xl">{template.templateKey}</h1>

                                            <br/>
                                            <div className="flex font-medium gap-x-2">
                                                <h1>Origin:</h1>
                                                <span>{template.serverExecutableOrigin.split("/")[2]}</span>
                                                #
                                                <span>{template.serverExecutableOrigin.split("/")[template.serverExecutableOrigin.split("/").length - 1]}</span>
                                            </div>
                                            <div className="flex font-medium gap-x-2">
                                                <h1>Docker Image:</h1>
                                                <span>{template.dockerImage}</span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })
                        }

                    </div>
                </div>
            ) : (
                <div className="text-gray-50 px-8 pb-5 text-2xl text-center transition-all delay-300">
                    There are no templates
                </div>
            )}
        </div>
    );
}

const fetcher = async (...args: [string, RequestInit?]) => await fetch(...args).then(async res => {
    return await res.json()
})