"use client";

import {useOrganization} from "@clerk/nextjs";
import classNames from "classnames";
import React, {useEffect, useState} from "react";
import {CopyIcon} from "../icons";
import "./prism.css";
import useSWR from 'swr'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClipboard, faCogs, faCube, faX} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faDocker, faYoutube} from "@fortawesome/free-brands-svg-icons";

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

export function OrgDetails() {
    const {isLoaded, organization} = useOrganization();

    return (
        <div className="mt-12">
            <div className="mt-4">
                {isLoaded && organization ? (
                    <div>
                        <div className="flex flex-row pb-8">
                            <div className="flex flex-row gap-x-4 justify-evenly w-full mx-auto">

                                <div className="stat rounded-bl-2xl rounded-tr-2xl bg-amber-400">
                                    <div className="stat-title text-white">Total Traffic Volume</div>
                                    <div className="stat-value text-neutral-50">89,400</div>
                                    <div className="stat-desc text-neutral-50">21% more than last month</div>
                                </div>
                                <div className="stat rounded-2xl bg-neutral-400 dark:bg-neutral-800">
                                    <div className="stat-title text-white">Hours Used</div>
                                    <div className="stat-value text-neutral-50">1,427</div>
                                    <div className="stat-desc text-neutral-50">53% more than last month</div>
                                </div>
                                <div className="stat bg-red-600 rounded-br-2xl rounded-tl-2xl hidden xl:block">
                                    <div className="stat-title text-white">Co2 Reports</div>
                                    <div className="stat-value text-neutral-50">1,427,000kg p/sqi</div>
                                    <div className="stat-desc text-neutral-50">53% more than last month</div>
                                </div>
                                <div className="stat rounded-2xl bg-neutral-400 dark:bg-neutral-800  hidden 2xl:block">
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
                                className="block">
                                <div className="flex gap-x-12 flex-col lg:flex-row">
                                    <div
                                        className="bg-amber-400 flex w-full flex-col text-center rounded-tl-[1.5rem] rounded-tr-[1.5rem] lg:rounded-tr-none lg:rounded-br-[1.5rem] pb-1 pt-2 px-16 font-bold tracking-widest text-white">
                                        <span>
                                            ORGANIZATION
                                        </span>
                                        <span className="text-4xl -mt-2">
                                            {organization.name}
                                        </span>
                                    </div>
                                    <div className="w-full block">

                                        <div className="flex  w-full gap-16 mt-2 pr-8">
                                            <InfoCard title="IDENTIFIER" value={organization.id.replace("org_", "")}/>
                                            <InfoCard title="MEMBERS" value={(organization?.membersCount || 0) + "/5"}/>
                                            <span className={"hidden md:block"}>
                                            <InfoCard title="BILLING" value="Not Required"/>
                                        </span>
                                            <span className={"hidden 2xl:block"}>
                                            <InfoCard title="PENDING INVITATIONS"
                                                      value={organization?.pendingInvitationsCount || 0}/>
                                        </span>
                                            <span className={"hidden 2xl:block"}>
                                            <InfoCard title="NODES" value={"1/3"}/>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <NodeDetails/>

                            {organization ? (
                                <div className="mx-auto">
                                    <div className={"flex flex-row"}>
                                        <div className={"flex flex-col"}>
                                            <div
                                                className="flex justify-between gap-x-6 mx-4 py-5 font-bold tracking-widest text-2xl">
                                                Network Display Name
                                            </div>
                                            <div className="p-4">
                                                <input // @ts-ignore
                                                    type="text" placeholder="Enter a primary display name" value={
                                                    organization.publicMetadata["network_displayName"] || ""
                                                }
                                                    className="input input-bordered bg-neutral-50 dark:bg-neutral-900 input-warning w-full max-w-xs"/>
                                            </div>
                                        </div>


                                        <div className={"flex flex-col"}>
                                            <div
                                                className="flex justify-between gap-x-6 mx-4 py-5 font-bold tracking-widest text-2xl">
                                                Allocated Primary Domain
                                            </div>
                                            <div className="p-4">
                                                <input type="text" placeholder="Update primary domain" value={
                                                    "nopox.xyz"
                                                }
                                                       className="input input-bordered bg-neutral-50 dark:bg-neutral-900 input-warning w-full max-w-xs"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                "No organization found."
                            )
                            }
                        </div>
                    </div>
                ) : (
                    <div className="text-neutral-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        Loading organization data...
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

export function NodeDetails() {

    const {isLoaded, organization} = useOrganization();

    const route = `https://api.nopox.xyz/api/nodes/${organization?.id}`
    console.log(route)

    const {data, error, isValidating} = useSWR(route, fetcher, {
        revalidateIfStale: true,
        revalidateOnFocus: true,
        refreshInterval: 30000
    })

    if (error) {
        return <p>{error.toString()}</p>
    }

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1500);

        return () => clearInterval(interval);
    }, []);
    // @ts-ignore
    return (
        <div>
            <div className="mt-4 transition-all delay-300 transition">
                {isLoaded && data && !isValidating && data.length > 0 ? (
                    <div className="pb-6">
                        <div className="flex justify-between gap-x-6 mx-4 py-5 font-bold tracking-widest text-2xl">
                            Nodes
                        </div>
                        <ul role="list" className="divide-y divide-neutral-900">
                            {
                                // @ts-ignore
                                data.sort((first: any, second: any) => {
                                    return (first.state == "SETUP" ? -10 : first.state == "OFFLINE" ? 199 : 0) - (second.state == "SETUP" ? -10 : second.state == "OFFLINE" ? 199 : 0)
                                }).map((node: any) => {
                                    const date = Date.now() - node.pushedAt
                                    if (date > 60 * (60 * 1000)) return null
                                    const state = node.state != "OFFLINE" && date > 60 * 1000 ? "CRASHED" : node.state

                                    return (
                                        <li
                                            key={node.identifier}
                                            className="transition-all delay-150 duration-200"
                                        >
                                            <Link
                                                href={state === "OFFLINE" ? "/dashboard" : `/dashboard/nodes/${node.identifier}`}
                                                className="flex justify-between gap-x-6 my-1 w-full py-3 border-neutral-400 dark:border-neutral-900">

                                                 <span className="flex gap-x-6 ml-6">
                                                    {state === "ONLINE" ? (
                                                        <span
                                                            className="text-green-400 mx-auto w-fit text-lg border-green-600 btn font-extrabold animate-pulse">
                                                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                                                        </span>
                                                    ) : (state === "BOOTING" ? (
                                                        <span
                                                            className="text-amber-400 mx-auto my-auto w-fit text-lg border-amber-600 btn font-extrabold animate-pulse">
                                                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                                                        </span>
                                                    ) : (state === "SETUP" ? (
                                                        <span
                                                            className="text-blue-400 mx-auto my-auto w-fit text-lg border-blue-600 btn font-extrabold animate-pulse">
                                                            <FontAwesomeIcon icon={faCogs}></FontAwesomeIcon>
                                                        </span>
                                                    ) : (state === "CRASHED" ? (
                                                        <span
                                                            className="text-red-700 mx-auto my-auto w-fit text-lg border-red-900 btn font-extrabold animate-pulse">
                                                            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className="text-red-400 mx-auto my-auto w-fit text-lg border-red-600 btn font-extrabold animate-pulse">
                                                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                                                        </span>
                                                    ))))}
                                                </span>

                                                <span
                                                    className='text-mds my-auto flex flex-col ml-2 tracking-widest mr-auto border-black'>
                                                        <span className="font-extrabold">
                                                            {
                                                                node.name
                                                            }
                                                        </span>
                                                    <span className="-mt-1 text-sm w-56 dark:text-neutral-300">
                                                        {
                                                            state == "OFFLINE" ? "offline since" : state == "CRASHED" ? "crashed" : "updated"
                                                        } {
                                                        date < 2000 ? "just now" : (date > (60 * 1000) ? (date / 60000).toString().split(".")[0] + "m" : (date / 1000).toString().split(".")[0] + "s")
                                                    } {
                                                        date > 2000 ? "ago" : ""
                                                    }
                                                    </span>
                                                </span>
                                                <div className="mr-8 flex flex-row">

                                                    <div
                                                        className="join mr-6 rounded-none rounded-bl-2xl rounded-tr-2xl">
                                                        {state === "ONLINE" ?
                                                            <>
                                                                <Link
                                                                    href={`/dashboard/nodes/${node.identifier}/container`}
                                                                    className="flex flex-col p-2 px-4 dark:bg-neutral-800 btn join-item font-bold border-1 border-blue-400 text-blue-400">
                                                                    <FontAwesomeIcon icon={faDocker}/>
                                                                    <span className="-mt-2 hidden xl:block">
                                                                        Containers
                                                                    </span>
                                                                </Link>
                                                                <Link
                                                                    href={`/dashboard/nodes/${node.identifier}/modules`}
                                                                    className="flex flex-col p-2 px-4 dark:bg-neutral-800 btn join-item font-bold border-1 border-red-400 text-red-400">
                                                                    <FontAwesomeIcon icon={faCube}/>
                                                                    <span className="-mt-2 hidden xl:block">
                                                                        Modules
                                                                    </span>
                                                                </Link>
                                                                <Link
                                                                    href={`/dashboard/nodes/${node.identifier}/template`}
                                                                    className="flex flex-col p-2 px-4 dark:bg-neutral-800 btn join-item font-bold border-1 border-amber-400 text-amber-400">
                                                                    <FontAwesomeIcon icon={faClipboard}/>
                                                                    <span className="-mt-2 hidden xl:block">
                                                                        Templates
                                                                    </span>
                                                                </Link>
                                                            </> : <></>
                                                        }
                                                        {state === "SETUP" ? (
                                                            <>
                                                                <Link href={`/dashboard/nodes/${node.identifier}/setup`}
                                                                      className="animate-pulse flex flex-col p-2 px-4 text-red-400 dark:bg-neutral-800 btn join-item font-bold">
                                                                    <FontAwesomeIcon icon={faYoutube}/>
                                                                    <span className="-mt-2 hidden xl:block">
                                                                             Watch tutorial
                                                                        </span>
                                                                </Link>
                                                                <Link href={`/dashboard/nodes/${node.identifier}/setup`}
                                                                      className="animate-pulse flex flex-col p-2 px-4 text-blue-400 dark:bg-neutral-800 btn join-item font-bold">
                                                                    <FontAwesomeIcon icon={faCogs}/>
                                                                    <span className="-mt-2 hidden xl:block">
                                                                             Setup
                                                                        </span>
                                                                </Link>
                                                            </>
                                                        ) : (<></>)}
                                                    </div>

                                                    <span className="hidden xl:flex flex-col text-right px-2 w-72">
                                                        <span className="text-xs dark:text-neutral-700 font-bold">
                                                            Node #{node.identifier}
                                                        </span>

                                                        <span className="text-xs dark:text-neutral-700 font-bold">
                                                            Version #{node.version || "master"}
                                                        </span>

                                                        <span className="text-xs dark:text-neutral-700 font-bold">
                                                            Host @{node.href || "master"}
                                                        </span>
                                                    </span>
                                                </div>

                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                ) : (
                    <div className="text-gray-50 px-8 pb-5 text-2xl text-center transition-all delay-300">
                        There are no nodes found on this organization you can follow our node setup guide <Link
                        className="text-amber-400" href={"/"}>here</Link>
                    </div>
                )
                }

            </div>
        </div>
    );
}


function Toggle(props: {
    checked: boolean;
    onChange: () => void;
    disabled: boolean;
}) {
    return (
        <div className="flex items-center justify-end flex-1">
            <button
                disabled={props.disabled}
                onClick={props.onChange}
                className={classNames({
                    "rounded-l-lg py-2 px-4 border-solid border border-neutral-300 transition text-sm font-semibold":
                        true,
                    "bg-neutral-100": !props.checked,
                    "bg-neutral-50 text-neutral-500 cursor-not-allowed": props.disabled,
                })}
            >
                List
            </button>
            <button
                disabled={props.disabled}
                onClick={props.onChange}
                className={classNames({
                    "rounded-r-lg py-2 px-4 border-solid border border-neutral-300 -ml-[1px] transition text-sm font-semibold":
                        true,
                    "bg-neutral-100": props.checked,
                    "bg-neutral-50 text-neutral-500 cursor-not-allowed": props.disabled,
                })}
            >
                JSON
            </button>
        </div>
    );
}

function CopyButton(props: { text: string }) {
    const [tooltipShown, setTooltipShown] = useState(false);

    useEffect(() => {
        if (tooltipShown) {
            const timeout = setTimeout(() => setTooltipShown(false), 2000);
            return () => clearTimeout(timeout);
        }
    }, [tooltipShown]);

    return (
        <>
            <button
                onClick={() => {
                    if (navigator.clipboard) navigator.clipboard.writeText(props.text);
                    setTooltipShown(true);
                }}
            >
                <CopyIcon/>
            </button>

            <div
                className={classNames({
                    "absolute z-10 bg-neutral-900 text-white rounded p-2 text-xs transition-all ease-in-out translate-x-60 shadow-sm shadow-neutral-500":
                        true,
                    "translate-y-10 opacity-0": !tooltipShown,
                    "translate-y-6": tooltipShown,
                })}
            >
                Copied!
            </div>
        </>
    );
}

function JSONOutput(props: { json: any }) {
    useEffect(() => {
        if (window.Prism) {
            console.log(`highlighting`);
            window.Prism.highlightAll();
        }
    }, []);

    return (
        <pre className="px-8 sm:px-6 text-black text-sm">
      <code className="language-json">
        {JSON.stringify(props.json, null, 2)}
      </code>
    </pre>
    );
}
