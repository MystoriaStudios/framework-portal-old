"use client";

import {useOrganization, useUser} from "@clerk/nextjs";
import classNames from "classnames";
import React, {useEffect, useState} from "react";
import {CopyIcon} from "../icons";
import Image from "next/image";
import "./prism.css";
import useSWR from 'swr'

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
        <h2 className="whitespace-nowrap overflow-auto">{value}</h2>
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
                        <div className="flex flex-col rounded-[1.5rem] bg-white shadow-md">
                            <div className="block sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 3xl:max-w-3xl w-full">
                                <div className="flex gap-x-12 flex-col lg:flex-row">
                                    <div className="bg-amber-400 flex flex-col text-center rounded-tl-[1.5rem] rounded-br-[1.5rem] pb-1 pt-2 px-16 font-bold tracking-widest text-white">
                                        <span>
                                            ORGANIZATION
                                        </span>
                                        <span className="text-4xl -mt-2">
                                            {organization.name}
                                        </span>
                                    </div>
                                    <div className="flex width-full gap-16 grid-cols-5 mt-2">
                                        <InfoCard title="IDENTIFIER" value={organization.id} />
                                        <InfoCard title="MEMBERS" value={organization?.membersCount || 0} />
                                        <InfoCard title="PENDING INVITATIONS" value={organization?.pendingInvitationsCount || 0} />
                                        <InfoCard title="BILLING" value="Not Required" />
                                        <InfoCard title="NODES" value={0} />
                                    </div>
                                </div>
                            </div>

                            <NodeDetails />
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
                                            className="flex justify-between gap-x-6 py-5"
                                            key={node.identifier}>

                                             <span className="flex gap-x-6">
                                                 <span
                                                     className='font-semibold text-sm my-auto ml-5 tracking-wide w-full mx-auto border-black'>
                                                    {
                                                        node.name
                                                    }
                                                </span>
                                                {node.state === "ONLINE" ? (
                                                    <span
                                                        className="bg-green-400 mx-auto my-auto rounded-full w-fit text-sm border-green-600 px-2">
                                                        Online
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="bg-red-400 mx-auto my-auto rounded-full w-fit text-sm border-red-600 px-2">
                                                        Offline
                                                    </span>
                                                )

                                                }
                                            </span>
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
                    "bg-gray-100": !props.checked,
                    "bg-gray-50 text-gray-500 cursor-not-allowed": props.disabled,
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
                    "bg-gray-100": props.checked,
                    "bg-gray-50 text-gray-500 cursor-not-allowed": props.disabled,
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
                    "absolute z-10 bg-gray-900 text-white rounded p-2 text-xs transition-all ease-in-out translate-x-60 shadow-sm shadow-gray-500":
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
