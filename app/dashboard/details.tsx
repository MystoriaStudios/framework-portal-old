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
import moment from 'moment';
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faDiscord, faDocker, faSnapchat, faTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";

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
                                            ORGANIZATION
                                        </span>
                                        <span className="text-4xl -mt-2">
                                            {organization.name}
                                        </span>
                                    </div>
                                    <div className="flex width-full gap-16 grid-cols-5 mt-2">
                                        <InfoCard title="IDENTIFIER" value={organization.id.replace("org_", "")}/>
                                        <InfoCard title="MEMBERS" value={(organization?.membersCount || 0) + "/5"}/>
                                        <InfoCard title="PENDING INVITATIONS"
                                                  value={organization?.pendingInvitationsCount || 0}/>
                                        <InfoCard title="BILLING" value="Not Required"/>
                                        <InfoCard title="NODES" value={"1/3"}/>

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

                            {organization ? (
                                <div>
                                    <div className={"flex flex-row"}>
                                        <div className={"flex flex-col"}>
                                            <div className="flex justify-between gap-x-6 mx-4 py-5 font-bold tracking-widest text-2xl">
                                                Network Display Name
                                            </div>
                                            <div className="p-4">
                                                <input type="text" placeholder="Enter a primary display name" value={
                                                    organization.publicMetadata["network_displayName"] || ""
                                                } className="input input-bordered bg-neutral-50 dark:bg-neutral-900 input-warning w-full max-w-xs" />
                                            </div>
                                        </div>



                                        <div className={"flex flex-col"}>
                                            <div className="flex justify-between gap-x-6 mx-4 py-5 font-bold tracking-widest text-2xl">
                                                Allocated Primary Domain
                                            </div>
                                            <div className="p-4">
                                                <input type="text" placeholder="Update primary domain" value={
                                                    "nopox.xyz"
                                                } className="input input-bordered bg-neutral-50 dark:bg-neutral-900 input-warning w-full max-w-xs" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between gap-x-6 mx-4 py-5 font-bold tracking-widest text-2xl">
                                        Network Social Media Configuration
                                    </div>
                                    <div className="p-4">
                                        <div className={"flex flex-col gap-y-2"}>
                                            <div className={"flex flex-row"}>
                                                <FontAwesomeIcon className={"text-3xl p-2 mr-2 text-sky-400"} icon={faTwitter}></FontAwesomeIcon>
                                                <input type="text" placeholder="Enter twitter handle" className="input input-bordered bg-neutral-50 dark:bg-neutral-900 border-sky-400 w-full max-w-xs" />
                                                <span className={"my-auto text-sky-400 text-bold tracking-wider ml-4"}>
                                                    bound to "nopox.xyz/twitter"
                                                </span>
                                            </div>
                                            <div className={"flex flex-row"}>
                                                <FontAwesomeIcon className={"text-3xl p-1.5 py-2 mr-2 text-amber-400"} icon={faSnapchat}></FontAwesomeIcon>
                                                <input type="text" placeholder="Enter snapchat tag" className="input input-bordered bg-neutral-50 dark:bg-neutral-900 border-amber-400 w-full max-w-xs" />
                                                <span className={"my-auto text-amber-400 text-bold tracking-wider ml-4"}>
                                                    bound to "nopox.xyz/snapchat"
                                                </span>
                                            </div>
                                            <div className={"flex flex-row"}>
                                                <FontAwesomeIcon className={"text-3xl p-1 py-2 mr-2 text-[#5865F2]"} icon={faDiscord}></FontAwesomeIcon>
                                                <input type="text" placeholder="Enter discord Guild ID" className="input input-bordered bg-neutral-50 dark:bg-neutral-900 border-[#5865F2] w-full max-w-lg" />
                                                <span className={"my-auto text-[#5865F2] text-bold tracking-wider ml-4"}>
                                                    bound to "nopox.xyz/discord"
                                                </span>
                                            </div>
                                            <div className={"flex flex-row"}>
                                                <FontAwesomeIcon className={"text-3xl p-1 py-2 mr-2 text-red-600"} icon={faYoutube}></FontAwesomeIcon>
                                                <input type="text" placeholder="Enter youtube channel ID" className="input input-bordered bg-neutral-50 dark:bg-neutral-900 border-red-600 w-full max-w-lg" />
                                                <span className={"my-auto text-red-600 text-bold tracking-wider ml-4"}>
                                                    bound to "nopox.xyz/youtube"
                                                </span>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ) : (
                                "No organization found."
                            )
                            }

                            <NodeDetails/>
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

    const {data, error, isValidating} = useSWR(route, fetcher, { refreshInterval: 5000 })

    if (error) {
        return <p>{error.toString()}</p>
    }

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

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
                                    return (
                                        <li
                                            key={node.identifier}>
                                            <Link href={node.state === "OFFLINE" ? "/dashboard" : `/dashboard/nodes/${node.identifier}`} className="flex justify-between gap-x-6 my-1 w-full py-3 border-t-2 border-neutral-400 dark:border-neutral-900">

                                                 <span className="flex gap-x-6 ml-6" >
                                                    {node.state === "ONLINE" ? (
                                                        <span
                                                            className="text-green-400 mx-auto w-fit text-lg border-green-600 btn font-extrabold animate-pulse">
                                                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                                                        </span>
                                                    ) : (node.state === "BOOTING" ? (
                                                        <span
                                                            className="text-amber-400 mx-auto my-auto w-fit text-lg border-amber-600 btn font-extrabold animate-pulse">
                                                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                                                        </span>
                                                    ) : (node.state === "SETUP" ? (
                                                            <span
                                                                className="text-blue-400 mx-auto my-auto w-fit text-lg border-blue-600 btn font-extrabold animate-pulse">
                                                            <FontAwesomeIcon icon={faCogs}></FontAwesomeIcon>
                                                        </span>
                                                        ) : (
                                                            <span
                                                                className="text-red-400 mx-auto my-auto w-fit text-lg border-red-600 btn font-extrabold animate-pulse">
                                                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                                                        </span>
                                                        )
                                                    ))}
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
                                                            node.state == "OFFLINE" ? "offline since" : "updated"
                                                        } {
                                                        date < 2000 ? "just now" : (date > (60 * 1000) ? (date / 60000).toString().split(".")[0] + " mins" : (date / 1000).toString().split(".")[0] + " seconds")
                                                        } {
                                                            date > 2000 ? "ago" : ""
                                                    }
                                                    </span>
                                                </span>
                                                <div className="mr-8 flex flex-row">

                                                    <div className="join mr-6">
                                                        { node.state === "ONLINE" ?
                                                            <>
                                                                <Link href={`/dashboard/nodes/${node.name}/containers`}
                                                                      className="flex flex-col p-2 px-4 text-neutral-400 dark:bg-neutral-800 btn join-item font-bold">
                                                                    <FontAwesomeIcon icon={faDocker}/>
                                                                    <span className="-mt-2">
                                                                     Containers
                                                                 </span>
                                                                </Link>
                                                                <Link href={`/dashboard/nodes/${node.name}`}
                                                                      className="flex flex-col p-2 px-4 text-neutral-400 dark:bg-neutral-800 btn join-item font-bold">
                                                                    <FontAwesomeIcon icon={faDashboard}/>
                                                                    <span className="-mt-2">
                                                                 Details
                                                             </span>
                                                                </Link>
                                                                <Link href={`/dashboard/nodes/${node.name}/modules`}
                                                                      className="flex flex-col p-2 px-4 text-neutral-400 dark:bg-neutral-800 btn join-item font-bold">
                                                                    <FontAwesomeIcon icon={faCube}/>
                                                                    <span className="-mt-2">
                                                                 Modules
                                                             </span>
                                                                </Link>
                                                            </> : <></>
                                                        }
                                                        {node.state === "SETUP" ? (
                                                            <Link href={`/dashboard/nodes/${node.identifier}/setup`}
                                                                  className="animate-pulse flex flex-col p-2 px-4 text-blue-400 dark:bg-neutral-800 btn join-item font-bold">
                                                                <FontAwesomeIcon icon={faCogs}/>
                                                                <span className="-mt-2">
                                                                     Setup
                                                                </span>
                                                            </Link>
                                                        ) : (<></>)}
                                                    </div>

                                                    <span className="flex flex-col text-right px-2 w-72">
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
                        There are no nodes found on this organization you can follow our node setup guide <Link className="text-amber-400" href={"/"}>here</Link>
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
