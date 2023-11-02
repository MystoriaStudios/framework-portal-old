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

    const route = `https://api.nopox.xyz/api/nodes/${id}`
    console.log(route)

    const {data, error, isValidating} = useSWR(route, fetcher, { refreshInterval: 5000 })

    if (data && data[0] !== undefined && data[0].state == "SETUP") {
        router.push(`/dashboard/nodes/${id}/setup`)
    }
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
                                    <div className="stat-title text-white">Total Traffic Volume</div>
                                    <div className="stat-value text-neutral-50">89,400</div>
                                    <div className="stat-desc text-neutral-50">21% more than last month</div>
                                </div>
                                <div className="stat rounded-2xl bg-neutral-400 dark:bg-neutral-800">
                                    <div className="stat-title text-white">Hours Used</div>
                                    <div className="stat-value text-neutral-50">1,427</div>
                                    <div className="stat-desc text-neutral-50">53% more than last month</div>
                                </div>
                                <div className="stat rounded-2xl bg-red-600">
                                    <div className="stat-title text-white">Co2 Reports</div>
                                    <div className="stat-value text-neutral-50">1,427,000kg p/sqi</div>
                                    <div className="stat-desc text-neutral-50">53% more than last month</div>
                                </div>
                                <div className="stat rounded-2xl bg-neutral-400 dark:bg-neutral-800">
                                    <div className="stat-title text-white">Tickets</div>
                                    <div className="stat-value text-neutral-50">4</div>
                                    <div className="stat-desc text-neutral-50">400% more than last month</div>
                                </div>
                                <div className="stat rounded-2xl bg-neutral-400 dark:bg-neutral-800">
                                    <div className="stat-title text-white">Individual Users</div>
                                    <div className="stat-value text-neutral-50">119</div>
                                    <div className="stat-desc text-neutral-50">80% more than last month</div>
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
                                        <InfoCard title="IDENTIFIER" value={data[0].identifier}/>
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

                                    <div className="flex justify-between gap-x-6 mx-4 py-5 font-bold tracking-widest text-2xl">
                                        Allocated Primary Domain
                                    </div>

                                    <div className="p-4">
                                        <input type="text" placeholder="Update primary domain" value={
                                            "tesst.xys"
                                        } className="input input-bordered bg-neutral-50 dark:bg-neutral-900 input-warning w-full max-w-xs" />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex justify-between gap-x-6 mx-4 py-5 font-bold tracking-widest text-2xl">
                                        Allocate a Primary Domain
                                    </div>

                                    <div className="p-4">
                                        <input type="text" placeholder="Set your primary domain" className="input input-bordered input-warning w-full max-w-xs" />
                                    </div>
                                </div>
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

const fetcher = async (...args: [string, RequestInit?]) => await fetch(...args).then(async res => {
    const response = await res.json()
    console.log(response)
    return response
})