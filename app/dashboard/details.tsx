"use client";

import {useOrganization} from "@clerk/nextjs";
import classNames from "classnames";
import React, {useEffect, useState} from "react";
import {CopyIcon} from "../icons";
import "./prism.css";
import useSWR from 'swr'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs, faCube, faDashboard, faPodcast} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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

    // @ts-ignore
    return (
        <div className="mt-12">
            <div className="mt-4">
                {isLoaded && organization ? (
                    <div className="max-h-96">
                        <div className="flex flex-col rounded-[1.5rem] bg-white dark:bg-neutral-800 shadow-md">
                            <div
                                className="block sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl w-full">
                                <div className="flex gap-x-12 flex-col lg:flex-row">
                                    <div
                                        className="bg-amber-400 flex flex-col text-center rounded-tl-[1.5rem] rounded-br-[1.5rem] pb-1 pt-2 px-16 font-bold tracking-widest text-white">
                                        <span>
                                            ORGANIZATION
                                        </span>
                                        <span className="text-4xl -mt-2">
                                            {organization.name}
                                        </span>
                                    </div>
                                    <div className="flex width-full gap-16 grid-cols-5 mt-2">
                                        <InfoCard title="IDENTIFIER" value={organization.id}/>
                                        <InfoCard title="MEMBERS" value={(organization?.membersCount || 0) + "/5"}/>
                                        <InfoCard title="PENDING INVITATIONS"
                                                  value={organization?.pendingInvitationsCount || 0}/>
                                        <InfoCard title="BILLING" value="Not Required"/>
                                        <InfoCard title="NODES" value={"1/3"}/>
                                    </div>
                                </div>
                            </div>

                            <NodeDetails/>
                        </div>
                    </div>
                ) : (
                    <div className="text-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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

    const route = `http://2.tcp.eu.ngrok.io:18621/api/nodes/${organization?.id}`
    console.log(route)

    const {data, error, isValidating} = useSWR(route, fetcher)

    if (error) {
        return <p>{error.toString()}</p>
    }

    // @ts-ignore
    return (
        <div>
            <div className="mt-4">
                {isLoaded && data ? (
                    <div className="pb-6 max-h-96">
                        <div className="flex justify-between gap-x-6 mx-4 py-5 font-bold tracking-widest text-2xl">
                            Nodes
                        </div>
                        <ul role="list" className="divide-y divide-gray-100">
                            {
                                // @ts-ignore
                                data.map((node: any) => {
                                    return (
                                        <li
                                            className="flex justify-between gap-x-6 py-5 w-full"
                                            key={node.identifier}>

                                             <span className="flex gap-x-6 ml-6">
                                                {node.state === "ONLINE" ? (
                                                    <span className="bg-green-400 mx-auto my-auto rounded-full w-fit text-sm border-green-600 px-4 py-1 font-extrabold">
                                                        Online
                                                    </span>
                                                ) : (node.state === "BOOTING" ? (
                                                    <span className="bg-amber-400 mx-auto my-auto rounded-full w-fit text-sm border-amber-600 px-4 py-1 font-extrabold">
                                                        Booting
                                                    </span>
                                                ) : (node.state === "SETUP" ? (
                                                    <span className="bg-blue-400 mx-auto my-auto rounded-full w-fit text-sm border-blue-600 px-4 py-1 font-extrabold animate-pulse">
                                                        Setup
                                                    </span>
                                                ) : (
                                                    <span className="bg-red-400 mx-auto my-auto rounded-full w-fit text-sm border-red-600 px-4 py-1 font-extrabold animate-pulse">
                                                        Offline
                                                    </span>
                                                    )
                                                ))}
                                            </span>
                                            <span
                                                className='font-extrabold text-sm my-auto ml-2 tracking-widest w-full mx-auto border-black'>
                                                    {
                                                        node.name
                                                    }
                                                </span>
                                            <div className="mr-16 flex flex-row">
                                                <span className="my-auto w-56">
                                                    updated {
                                                    node.pushed_at
                                                } snapshot
                                                </span>

                                                <div className="flex flex-row gap-x-1 ml-4">
                                                    <Link href={`/dashboard/nodes/${node.name}/pods`} className="flex flex-col p-2 text-gray-400 font-bold">
                                                        <FontAwesomeIcon icon={faPodcast}/>
                                                        <span className="-mt-2">
                                                             Pods
                                                         </span>
                                                    </Link>
                                                    <Link href={`/dashboard/nodes/${node.name}`}  className="flex flex-col p-2 text-gray-400 font-bold">
                                                        <FontAwesomeIcon icon={faDashboard}/>
                                                        <span className="-mt-2">
                                                             Details
                                                         </span>
                                                    </Link>
                                                    <Link href={`/dashboard/nodes/${node.name}/modules`}  className="flex flex-col p-2 text-gray-400 font-bold">
                                                        <FontAwesomeIcon icon={faCube}/>
                                                        <span className="-mt-2">
                                                             Modules
                                                         </span>
                                                    </Link>
                                                    { node.state === "SETUP" ? (
                                                        <Link href={`/dashboard/nodes/${node.name}/setup`}  className="animate-pulse flex flex-col p-2 text-blue-400 font-bold">
                                                            <FontAwesomeIcon icon={faCogs}/>
                                                            <span className="-mt-2">
                                                                 Setup
                                                            </span>
                                                        </Link>
                                                    ) : (<></>) }
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                ) : (
                    <div className="text-gray-700 px-8 pb-5 text-sm">
                        There are no nodes found on this organization or
                        <br/>
                        Create or switch to an organization to see its details.
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
                    "rounded-l-lg py-2 px-4 border-solid border border-gray-300 transition text-sm font-semibold":
                        true,
                    "bg-neutral-100": !props.checked,
                    "bg-neutral-50 text-gray-500 cursor-not-allowed": props.disabled,
                })}
            >
                List
            </button>
            <button
                disabled={props.disabled}
                onClick={props.onChange}
                className={classNames({
                    "rounded-r-lg py-2 px-4 border-solid border border-gray-300 -ml-[1px] transition text-sm font-semibold":
                        true,
                    "bg-neutral-100": props.checked,
                    "bg-neutral-50 text-gray-500 cursor-not-allowed": props.disabled,
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
                    "absolute z-10 bg-neutral-900 text-white rounded p-2 text-xs transition-all ease-in-out translate-x-60 shadow-sm shadow-gray-500":
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
