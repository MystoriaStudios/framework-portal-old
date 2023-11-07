"use client";

import {useOrganization} from "@clerk/nextjs";
import React from "react";
import useSWR from 'swr'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloud, faCogs, faCube, faDashboard} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faDocker, faYoutube} from "@fortawesome/free-brands-svg-icons";
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

export function NodeDetails() {
    const router = useRouter()
    const {isLoaded, organization} = useOrganization();
    const params = useParams();
    const id = params.id;


    const {
        data,
        error,
        isValidating
    } = useSWR(`https://api.nopox.xyz/api/nodes/${id}`, fetcher, {refreshInterval: 5000})

    /*    if (!isValidating && data[0].state == "SETUP") {
            router.push(`/dashboard/nodes/${id}/setup`)
        }*/

    const route = `http://${data ? data[0].href : ""}:8086/deployment/containers`
    console.log(route)

    const {data: containers} = useSWR(route, fetcher, {refreshInterval: 5000})

    console.log(containers)

    if (error) {
        return <p>{error.toString()}</p>
    }

    return (
        <div className="mt-12">
            <div className="mt-4">
                {!isValidating && containers !== undefined ? (
                    <div>
                        <div className="flex flex-col rounded-[1.5rem] bg-white dark:bg-neutral-800 shadow-md">
                            <div
                                className="block sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl w-full">
                                <div className="flex gap-x-12 flex-col lg:flex-row">
                                    <div
                                        className="bg-amber-400 flex flex-col text-center rounded-tl-[1.5rem] rounded-br-[1.5rem] pb-1 pt-2 px-16 font-bold tracking-widest text-white">
                                        <span>
                                            NODE
                                        </span>
                                        <span className="text-3xl w-48 -mt-2">
                                            {data[0].name || "unknown"}
                                        </span>
                                    </div>
                                    <div className="flex width-full gap-16 grid-cols-5 mt-2">
                                        {data.length && data.length > 0 ? (
                                            <>
                                                <InfoCard title="IDENTIFIER" value={data[0].identifier.split("-")[0]}/>
                                                <InfoCard title="ADDRESS" value={data[0].href}/>
                                                <InfoCard title="CONTAINERS" value={data[0].containers || 0}/>
                                                <InfoCard title="TEMPLATES" value={data[0].templates || 0}/>
                                                <InfoCard title="MODULES" value={data[0].modules || 0}/>
                                                <InfoCard title="STATE" value={data[0].state}/>
                                            </>
                                        ) : <></>
                                        }

                                        <div className="relative">
                                            <span
                                                className="bg-gray-600 w-3 h-3 absolute -right-[4rem] top-3 rounded-full">
                                            </span>

                                            <span
                                                className="bg-amber-400 w-3 h-3 absolute -right-[5rem] top-3 rounded-full">
                                            </span>

                                            <span
                                                className="bg-red-600 w-3 h-3 absolute -right-[6rem] top-3 rounded-full">
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isLoaded && data && !isValidating && containers.length > 0 ? (
                                <div className="pb-6">
                                    <ul role="list" className="divide-y divide-neutral-900">
                                        {
                                            // @ts-ignore
                                            containers.sort((first: any, second: any) => {
                                                return (first.state == "SETUP" ? -10 : first.state == "OFFLINE" ? 199 : 0) - (second.state == "SETUP" ? -10 : second.state == "OFFLINE" ? 199 : 0)
                                            }).map((container: any) => {
                                                const date = Date.now() - Date.now()
                                                if (date > 60 * (60 * 1000)) return null
                                                return (
                                                    <li key={container.pod}>
                                                        <Link
                                                            href={container?.heartbeat?.state == "OFFLINE" || container.heartbeat == null ? "container" : `container/${
                                                                container.template.idScheme.replace("%containerId%", container.allocation.port)
                                                            }`}
                                                            className="flex justify-between gap-x-6 my-1 w-full py-3 border-neutral-400 dark:border-neutral-900">
                                                             <span className="flex gap-x-6 ml-6">
                                                                {container?.heartbeat?.state == "RUNNING" ? (
                                                                    <span
                                                                        className="text-green-400 mx-auto w-fit text-lg border-green-600 btn font-extrabold animate-pulse">
                                                                        <FontAwesomeIcon
                                                                            icon={faHeart}></FontAwesomeIcon>
                                                                    </span>
                                                                ) : (container?.heartbeat?.state == "STARTING" ? (
                                                                    <span
                                                                        className="text-amber-400 mx-auto my-auto w-fit text-lg border-amber-600 btn font-extrabold animate-pulse">
                                                                        <FontAwesomeIcon
                                                                            icon={faHeart}></FontAwesomeIcon>
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        className="text-red-400 mx-auto my-auto w-fit text-lg border-red-600 btn font-extrabold animate-pulse">
                                                                    <FontAwesomeIcon
                                                                        icon={faHeart}></FontAwesomeIcon>
                                                                </span>
                                                                ))}
                                                            </span>

                                                            <span
                                                                className='text-mds my-auto flex flex-col ml-2 tracking-widest mr-auto border-black'>
                                                                <span className="font-extrabold">
                                                                    {
                                                                        container.template.idScheme.replace("%containerId%", container.allocation.port)
                                                                    }
                                                                </span>
                                                                <span
                                                                    className="-mt-1 text-sm w-56 dark:text-neutral-300">
                                                                    {
                                                                        container.state == "OFFLINE" ? "offline since" : "updated"
                                                                    } {
                                                                    date < 2000 ? "just now" : (date > (60 * 1000) ? (date / 60000).toString().split(".")[0] + " mins" : (date / 1000).toString().split(".")[0] + " seconds")
                                                                } {
                                                                    date > 2000 ? "ago" : ""
                                                                }
                                                                </span>
                                                            </span>

                                                            <div
                                                                className="join mr-6 rounded-none text-3xl font-extrabold uppercase mb-2 mt-1 rounded-bl-2xl rounded-tr-2xl">
                                                                TPS: {container.heartbeat?.tps || 20}
                                                            </div>

                                                            <div
                                                                className="join mr-6 rounded-none text-3xl font-extrabold uppercase mb-2 mt-1 rounded-bl-2xl rounded-tr-2xl">
                                                                Clients: {container.heartbeat?.playersConnected || 0}
                                                            </div>


                                                            <div
                                                                className="join mr-6 rounded-none rounded-bl-2xl rounded-tr-2xl">
                                                                {container.state === "ONLINE" ?
                                                                    <>
                                                                        <Link
                                                                            href={`/dashboard/nodes/${container.identifier}/container`}
                                                                            className="flex flex-col p-2 px-4 dark:bg-neutral-800 btn join-item font-bold border-1 border-blue-400 text-blue-400">
                                                                            <FontAwesomeIcon icon={faDocker}/>
                                                                            <span className="-mt-2">
                                                                     Console
                                                                 </span>
                                                                        </Link>
                                                                        <Link
                                                                            href={`/dashboard/nodes/${container.identifier}`}
                                                                            className="flex flex-col p-2 px-4 dark:bg-neutral-800 btn join-item font-bold border-1 border-amber-400 text-amber-400">
                                                                            <FontAwesomeIcon icon={faDashboard}/>
                                                                            <span className="-mt-2">
                                                                 Actions
                                                             </span>
                                                                        </Link>
                                                                        <Link href={`${container.pod}/template`}
                                                                              className="flex flex-col p-2 px-4 dark:bg-neutral-800 btn join-item font-bold border-1 border-red-400 text-red-400">
                                                                            <FontAwesomeIcon icon={faCube}/>
                                                                            <span className="-mt-2">
                                                                 Template
                                                             </span>
                                                                        </Link>
                                                                    </> : <></>
                                                                }
                                                                {container.state === "SETUP" ? (
                                                                    <>
                                                                        <Link href={`${container.pod}/setup`}
                                                                              className="animate-pulse flex flex-col p-2 px-4 text-red-400 dark:bg-neutral-800 btn join-item font-bold">
                                                                            <FontAwesomeIcon icon={faYoutube}/>
                                                                            <span className="-mt-2">
                                                                             Watch tutorial
                                                                        </span>
                                                                        </Link>
                                                                        <Link href={`${container.pod}/setup`}
                                                                              className="animate-pulse flex flex-col p-2 px-4 text-blue-400 dark:bg-neutral-800 btn join-item font-bold">
                                                                            <FontAwesomeIcon icon={faCogs}/>
                                                                            <span className="-mt-2">
                                                                             Setup
                                                                        </span>
                                                                        </Link>
                                                                    </>
                                                                ) : (<></>)}
                                                            </div>

                                                            <span className="flex flex-col text-right px-2 w-96">
                                                                <span
                                                                    className="text-xs dark:text-neutral-700 font-bold">
                                                                    #{container.container.id}
                                                                </span>

                                                                <span
                                                                    className="text-xs dark:text-neutral-700 font-bold">
                                                                    Version #{container.version || "master"}
                                                                </span>

                                                                <span
                                                                    className="text-xs dark:text-neutral-700 font-bold">
                                                                    Host @{container.href || "master"}
                                                                </span>
                                                            </span>

                                                        </Link>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            ) : (
                                <div className="text-gray-50 px-8 text-2xl text-center transition-all delay-300 py-32">
                                    There are no containers running at the moment
                                    start a template <Link className="text-amber-400" href={"template"}>here</Link>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="text-neutral-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        Loading node data...
                    </div>
                )}
            </div>
        </div>
    );
}

const fetcher = async (...args: [string, RequestInit?]) => await fetch(...args).then(async res => {
    const response = await res.json()
    console.log(response)
    return response
})