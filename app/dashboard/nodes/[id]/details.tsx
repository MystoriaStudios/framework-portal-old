"use client";

import {useOrganization} from "@clerk/nextjs";
import classNames from "classnames";
import React, {useEffect, useState} from "react";
import useSWR from 'swr'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs, faCube, faDashboard, faPodcast} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import moment from 'moment';
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faDocker} from "@fortawesome/free-brands-svg-icons";
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


    const {data, error, isValidating} = useSWR(`https://api.nopox.xyz/api/nodes/${id}`, fetcher, { refreshInterval: 5000 })

/*    if (!isValidating && data[0].state == "SETUP") {
        router.push(`/dashboard/nodes/${id}/setup`)
    }*/

    const route = `http://${data ? data[0].href : ""}:8086/peak`
    console.log(route)

    const {data: node} = useSWR(route, fetcher, { refreshInterval: 5000 })

    console.log(node)

    if (error) {
        return <p>{error.toString()}</p>
    }

    return (
        <div className="mt-12">
            <div className="mt-4">
                {!isValidating && data[0] !== undefined ? (
                    <div className="max-h-96">
                        <div className="flex flex-row pb-8">
                            <div className="flex flex-row gap-x-4 justify-evenly w-full mx-auto">

                                <div className="stat rounded-2xl bg-amber-400">
                                    <div className="stat-title text-white">Used Memory</div>
                                    <div className="stat-value text-neutral-50">{(node?.usedMemory) / 10240000 || 0}GB</div>
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
                                            Node
                                        </span>
                                        <span className="text-4xl w-44 -mt-2">
                                            {data[0].name}
                                        </span>
                                    </div>
                                    <div className="flex width-full gap-16 grid-cols-5 mt-2">
                                        <InfoCard title="IDENTIFIER" value={data[0].identifier.split("-")[0]}/>
                                        <InfoCard title="ADDRESS" value={data[0].href}/>
                                        <InfoCard title="CONTAINERS" value={"0"}/>
                                        <InfoCard title="TEMPLATES" value={"13"}/>
                                        <InfoCard title="MODULES" value={"6"}/>
                                        <InfoCard title="STATE" value={data[0].state}/>

                                        <div className="relative">
                                            <span className="bg-gray-600 w-3 h-3 absolute -right-[4rem] top-3 rounded-full">
                                            </span>

                                            <span className="bg-amber-400 w-3 h-3 absolute -right-[5rem] top-3 rounded-full">
                                            </span>

                                            <span className="bg-red-600 w-3 h-3 absolute -right-[6rem] top-3 rounded-full">
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {data[0] !== undefined ? (
                                <div>
                                    <div className="flex">
                                        <div className="alert alert-success m-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span>Your docker installation is up to date!</span>
                                        </div>
                                    </div>

                                    <div className="mockup-code center bg-neutral-800 md:mt-8 m-4 text-primary-content text-left w-[96%] mx-[2%] drop-shadow-2xl">
                                        <pre data-prefix="$" className="text-warning"><code>
                                            Welcome to Framework Node version aa99f2
                                        </code></pre>
                                        <pre data-prefix=">" className="text-success"><code>
                                            Setup in 2.042 seconds <Link href="https://mystoria.dev" target="_blank" rel="noreferrer noopener" className="hover:underline">https://mystoria.dev</Link>
                                        </code></pre>
                                        <ul>

                                        </ul>

                                        <form className="my-4 flex-row gap-10 w-1/2" method="post"
                                              action={`http://${data[0].href}:8086/setup/${data[0].identifier}`}>
                                            <input list="data" autoComplete="off" placeholder="$   Type help to view a list of commands" id="key" name="key" className="ml-2 dark:bg-neutral-800 input border-none hover:border-none w-full text-neutral-100" />
                                            <datalist id="data">
                                                {[
                                                    "help",
                                                    "template",
                                                    "container"
                                                ].map((item, key) =>
                                                    <option key={key} value={item} />
                                                )}
                                            </datalist>
                                        </form>
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

import { ResponsiveCalendar } from '@nivo/calendar'
import {BiAlarmExclamation, BiCheck, BiCommand, BiSleepy, BiWrench} from "react-icons/bi";

const fetcher = async (...args: [string, RequestInit?]) => await fetch(...args).then(async res => {
    const response = await res.json()
    console.log(response)
    return response
})