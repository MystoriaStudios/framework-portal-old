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

export function OrgDetails() {
    const {isLoaded, organization} = useOrganization();

    // @ts-ignore
    return (
        <div className="mt-12">
            <div className="flex justify-between items-center ">
                <i className="fab fa-behance text-xl text-gray-400"></i>
            </div>
            <div className="-mt-4 flex-row flex">
                <Image
                    className="h-24 mt-8 w-24 text-blue-500 rounded"
                    src={organization?.imageUrl || ""}
                    alt={`Logo for ${organization?.name || ""}`}
                    width={128}
                    height={128}
                />
                <div className="ml-4 my-auto">
                    <div className="text-2xl text-gray-900 font-medium leading-8 mt-5">{organization?.name || "unknown"}</div>
                    <div className="text-sm text-gray-500">Organization</div>

                    <div className="flex-row flex">
                        <div className="py-2">
                            <dt className="text-sm font-semibold mb-1">Members</dt>
                            <dd className="mt-1 text-sm text-gray-800 sm:mt-0 sm:col-span-2">
                                {organization?.membersCount || 0}
                            </dd>
                        </div>
                        <div className="px-4 py-2">
                            <dt className="text-sm font-semibold mb-1">
                                Pending invitations
                            </dt>
                            <dd className="mt-1 text-sm text-gray-800 sm:mt-0 sm:col-span-2">
                                {organization?.pendingInvitationsCount || 0}
                            </dd>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {isLoaded && organization ? (
                    <div className="max-h-96">
                        {JSON.stringify(organization)}
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

const fetcher = async (...args) => await fetch(...args).then(async res => {
    const response = await res.json()
    console.log(response)
    return response
})

export function NodeDetails() {
    const {isLoaded, organization} = useOrganization();

    const route = `http://localhost:7777/api/nodes/${organization?.id}`
    console.log(route)

    const {data, error, isValidating} = useSWR(route, fetcher)
    const [jsonOutput, setJsonOutput] = useState(false);

    if (error) {
        return <p>{error.toString()}</p>
    }

    // @ts-ignore
    return (
        <div className="p-4 relative  bg-gray-50 border border-gray-100 shadow-lg  rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14  absolute top-4 right-3 text-blue-500"
                 viewBox="0 0 20 20" fill="currentColor">
                <path
                    d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
            </svg>
            <div className="flex justify-between items-center ">
                <i className="fab fa-behance text-xl text-gray-400"></i>
            </div>
            <div className="ml-5 -mt-4">
                <div className="text-2xl text-gray-900 font-medium leading-8 mt-5">{data?.length}</div>
                <div className="text-sm text-gray-500">Nodes</div>
            </div>
            <div className="mt-4">
                {isLoaded ? (
                    data ? (
                        jsonOutput ? (
                            <div className="overflow-scroll max-h-96 pb-6">
                                <JSONOutput json={data}/>
                            </div>
                        ) : (
                            <div className="pb-6 max-h-96">
                                <ul className="flex flex-col gap-y-4 overflow-scroll-y">
                                    {
                                        // @ts-ignore
                                        data.map((node: any) => {
                                            return (
                                                <a
                                                    key={node.identifier}
                                                    href={node.href}
                                                    className='font-semibold tracking-wide w-full mx-auto text-5xl border-black flex'
                                                >
                                        <span className="flex px-12">
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
                                            <span
                                                className='font-semibold text-sm my-auto ml-5 tracking-wide w-full mx-auto border-black'>
                                                {
                                                    node.name
                                                }
                                            </span>
                                        </span>
                                                </a>
                                            );
                                        })}
                                </ul>
                            </div>
                        )
                    ) : (
                        <div className="text-gray-700 px-8 pb-5 text-sm">
                            There are no nodes found on this organization or
                            <br/>
                            Create or switch to an organization to see its details.
                        </div>
                    )
                ) : (
                    <div className="text-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        Loading node data...
                    </div>
                )}

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
