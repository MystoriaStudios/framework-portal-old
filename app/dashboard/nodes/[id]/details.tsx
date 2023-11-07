"use client";

import {useOrganization} from "@clerk/nextjs";
import React from "react";
import useSWR from 'swr'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard, faClock, faCogs, faCube, faGlobe, faWifi, faX} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {faDocker, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {useParams, useRouter} from "next/navigation";
import {faHeart} from "@fortawesome/free-regular-svg-icons";

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

    const route = `http://${data ? data[0].href : ""}:8086/peak`
    console.log(route)

    const {data: node} = useSWR(route, fetcher, {refreshInterval: 5000})

    console.log(node)

    if (error) {
        return <p>{error.toString()}</p>
    }

    return (
        <div className="mt-12">
            <div className="mt-4">
                {!isValidating && data[0] !== undefined ? (
                    <div>
                        <div className="flex flex-row pb-8">
                            <div className="flex flex-row gap-x-4 justify-evenly w-full mx-auto">

                                <div className="stat rounded-2xl bg-amber-400">
                                    <div className="stat-title text-white">Used Memory</div>
                                    <div className="stat-value text-neutral-50">{(node?.usedMemory) / 10240000 || 0}GB
                                    </div>
                                </div>
                                <div className="stat rounded-2xl bg-neutral-400 dark:bg-neutral-800">
                                    <div className="stat-title text-white">Assigned Memory</div>
                                    <div className="stat-value text-neutral-50">{node?.assignedMemory || "None"}</div>
                                </div>
                                <div className="stat rounded-2xl bg-neutral-400 dark:bg-neutral-800">
                                    <div className="stat-title text-white">Assignable Cores</div>
                                    <div className="stat-value text-neutral-50">{node?.availableCores || 1}</div>
                                </div>
                            </div>
                        </div>

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
                                            {data[0].name}
                                        </span>
                                    </div>
                                    <div className="flex width-full gap-16 grid-cols-5 mt-2">
                                        <InfoCard title="IDENTIFIER" value={data[0].identifier.split("-")[0]}/>
                                        <InfoCard title="ADDRESS" value={data[0].href}/>
                                        <InfoCard title="CONTAINERS" value={data[0].containers || 0}/>
                                        <InfoCard title="TEMPLATES" value={data[0].templates || 0}/>
                                        <InfoCard title="MODULES" value={data[0].modules || 0}/>
                                        <InfoCard title="STATE" value={data[0].state}/>

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

                            {data[0] !== undefined ? (
                                <div>
                                    <div className="flex">
                                        <div className="alert alert-success m-4">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 className="stroke-current shrink-0 h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                            <span>Your docker installation is up to date!</span>
                                        </div>
                                    </div>

                                    <div
                                        className="mockup-code center bg-neutral-800 md:mt-8 m-4 text-primary-content text-left w-[96%] mx-[2%] drop-shadow-2xl">
                                        <pre data-prefix="$" className="text-warning"><code>
                                            Welcome to Framework Node version aa99f2
                                        </code></pre>
                                        <pre data-prefix=">" className="text-success"><code>
                                            Setup in 2.042 seconds <Link href="https://mystoria.dev" target="_blank"
                                                                         rel="noreferrer noopener"
                                                                         className="hover:underline">https://mystoria.dev</Link>
                                        </code></pre>
                                        <ul>

                                        </ul>

                                        <div className="flex flex-row">
                                            <form className="my-4 flex-row gap-10 w-1/2" method="post"
                                                  action={`http://${data[0].href}:8086/setup/${data[0].identifier}`}>
                                                <input list="data" autoComplete="off"
                                                       placeholder="$   Type help to view a list of commands" id="key"
                                                       name="key"
                                                       className="ml-2 dark:bg-neutral-800 input border-none hover:border-none w-full text-neutral-100"/>
                                                <datalist id="data">
                                                    {[
                                                        "help",
                                                        "template",
                                                        "container"
                                                    ].map((item, key) =>
                                                        <option key={key} value={item}/>
                                                    )}
                                                </datalist>
                                            </form>
                                            <div
                                                className="join mr-6 rounded-none rounded-bl-2xl rounded-tr-2xl ml-auto">
                                                {data[0].state === "ONLINE" ?
                                                    <>
                                                        <Link href={`/dashboard/nodes/${data[0].identifier}/container`}
                                                              className="flex flex-col p-2 px-4 dark:bg-neutral-800 btn join-item font-bold border-1 border-blue-400 text-blue-400">
                                                            <FontAwesomeIcon icon={faDocker}/>
                                                            <span className="-mt-2 hidden xl:block">
                                                                Containers
                                                            </span>
                                                        </Link>
                                                        <Link href={`/dashboard/nodes/${data[0].identifier}/modules`}
                                                              className="flex flex-col p-2 px-4 dark:bg-neutral-800 btn join-item font-bold border-1 border-red-400 text-red-400">
                                                            <FontAwesomeIcon icon={faCube}/>
                                                            <span className="-mt-2 hidden xl:block">
                                                                Modules
                                                            </span>
                                                        </Link>
                                                        <Link href={`/dashboard/nodes/${data[0].identifier}/template`}
                                                              className="flex flex-col p-2 px-4 dark:bg-neutral-800 btn join-item font-bold border-1 border-amber-400 text-amber-400">
                                                            <FontAwesomeIcon icon={faClipboard}/>
                                                            <span className="-mt-2 hidden xl:block">
                                                                Templates
                                                            </span>
                                                        </Link>
                                                    </> : <></>
                                                }
                                                {data[0].state === "SETUP" ? (
                                                    <>
                                                        <Link href={`/dashboard/nodes/${data[0].identifier}/setup`}
                                                              className="animate-pulse flex flex-col p-2 px-4 text-red-400 dark:bg-neutral-800 btn join-item font-bold">
                                                            <FontAwesomeIcon icon={faYoutube}/>
                                                            <span className="-mt-2 hidden xl:block">
                                                                 Watch tutorial
                                                            </span>
                                                        </Link>
                                                        <Link href={`/dashboard/nodes/${data[0].identifier}/setup`}
                                                              className="animate-pulse flex flex-col p-2 px-4 text-blue-400 dark:bg-neutral-800 btn join-item font-bold">
                                                            <FontAwesomeIcon icon={faCogs}/>
                                                            <span className="-mt-2 hidden xl:block">
                                                                 Setup
                                                            </span>
                                                        </Link>
                                                    </>
                                                ) : (<></>)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                "Loading"
                            )
                            }
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

export function AllocationDetails() {
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

    const route = `http://${data ? data[0].href : ""}:8086/allocations`
    console.log(route)

    const {data: allocations} = useSWR(route, fetcher, {refreshInterval: 5000})

    console.log(allocations)

    if (error) {
        return <p>{error.toString()}</p>
    }

    return (
        <div className="mt-12">
            <div className="mt-4">
                <form className="my-4 flex-row gap-10" method="post"
                      action={route}>
                    <div className={"flex flex-col gap-y-4"}>
                            <span className="flex flex-row gap-x-4">
                                <span className={"flex flex-col gap-1 w-full max-w-xs"}>
                                    Bind Address:
                                    <input type="text" placeholder="0.0.0.0" id="hostname"
                                           name="hostname"
                                           className="dark:bg-neutral-800 input input-bordered w-full max-w-xs text-neutral-100"
                                    />
                                </span>
                                <span className={"flex flex-col gap-1 w-full max-w-xs"}>
                                    Port:
                                    <input type="number" placeholder="25565" id="port"
                                           name="port"
                                           className="dark:bg-neutral-800 input input-bordered w-full max-w-xs text-neutral-100"
                                    />
                                </span>
                            </span>
                        <button role="submit"
                                className="btn text-blue-500 border-blue-500 w-1/3 animate-pulse">
                            Submit Allocation
                        </button>
                    </div>
                </form>
                {!isValidating && allocations !== undefined ? (
                    <div className="grid grid-cols-7">
                        {
                            // @ts-ignore
                            allocations.map((allocation: any) => {
                                return (
                                    <div
                                        key={allocation.port}
                                        className="transition-all delay-150 duration-200"
                                    >
                                        <div
                                            className="flex justify-between gap-x-6 my-1 w-full py-3 border-neutral-400 dark:border-neutral-900">

                                                 <span className="flex gap-x-6 ml-6">
                                                     {
                                                         allocation.state == "IN_USE" ? (
                                                             <span className="text-green-400 mx-auto w-fit text-lg border-green-600 btn font-extrabold animate-pulse">
                                                                <FontAwesomeIcon icon={faGlobe}></FontAwesomeIcon>
                                                            </span>
                                                         ) : (
                                                             <span className="text-amber-400 mx-auto w-fit text-lg border-amber-600 btn font-extrabold animate-pulse">
                                                                <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                                                            </span>
                                                         )
                                                     }
                                                </span>

                                            <span
                                                className='text-mds my-auto flex flex-col ml-2 tracking-widest mr-auto border-black'>
                                                        <span className="font-extrabold">
                                                            {
                                                                allocation.bindAddress
                                                            }
                                                        </span>
                                                    <span className="-mt-1 text-sm w-56 dark:text-neutral-300">
                                                        { allocation.port }
                                                    </span>
                                                </span>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                ) : (
                    <div className="text-neutral-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        Loading node allocation data...
                    </div>
                )
                }
            </div>
        </div>
    );
}

const fetcher = async (...args: [string, RequestInit?]) => await fetch(...args).then(async res => {
    const response = await res.json()
    console.log(response)
    return response
})