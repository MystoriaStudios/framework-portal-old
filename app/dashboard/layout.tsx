import {OrganizationSwitcher} from "@clerk/nextjs";
import React from "react";
import Link from "next/link"

import {faBookBookmark, faChartArea, faComputer, faServer, faClipboard, faTools, faUsers} from '@fortawesome/free-solid-svg-icons'
import {faHive} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const navigation = [
    {name: 'Dashboard', href: '/dashboard', current: true, icon: <FontAwesomeIcon icon={faServer}/>},
    {name: 'Users', href: '/dashboard/users', current: false, icon: <FontAwesomeIcon icon={faUsers}/>},
    {name: 'API', href: '/dashboard/api', current: false, icon: <FontAwesomeIcon icon={faComputer}/>},
    {name: 'Forms', href: '/dashboard/forms', current: false, icon: <FontAwesomeIcon icon={faClipboard}/>},
    {name: 'Templates', href: '/dashboard/templates', current: false, icon: <FontAwesomeIcon icon={faBookBookmark}/>},
    {name: 'Analytics', href: '/dashboard/stats', current: false, icon: <FontAwesomeIcon icon={faChartArea}/>},
    {name: 'Web Tools 3', href: '/dashboard/tools', current: false, icon: <FontAwesomeIcon icon={faTools}/>},
    {name: 'Database Hive', href: '/dashboard/hive', current: false, icon: <FontAwesomeIcon icon={faHive}/>},
]


// @ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    // @ts-ignore
    return (
            <div className="flex-col xl:flex-row flex min-h-fit w-full max-w-full">
                {<div
                    className="w-64 bg-neutral-100 dark:bg-neutral-950 min-h-fit max-w-full">
                    <div
                        className="flex flex-row xl:flex-col text-center pb-12 dark:bg-neutral-900 xl:dark:bg-transparent mx-auto">
                        <div
                            className="w-full border-b-2 flex justify-center py-6 bg-neutral-100 dark:bg-neutral-900 dark:border-black border-neutral-300">
                            <div className="hidden sm:block">
                                <OrganizationSwitcher afterCreateOrganizationUrl="/dashboard"/>
                            </div>
                            <div className="block sm:hidden">
                                <OrganizationSwitcher
                                    afterCreateOrganizationUrl="/dashboard"
                                    appearance={{
                                        elements: {
                                            organizationSwitcherTriggerIcon: `hidden`,
                                            organizationPreviewTextContainer: `hidden`,
                                            organizationSwitcherTrigger: `pr-0`,
                                        },
                                    }}
                                />
                            </div>
                        </div>
                        {

                            navigation.map((item) => (

                            <Link
                                key={item.name}
                                href={item.href}
                                className='px-3 pr-12 font-semibold rounded-none tracking-wide w-24 xl:w-full my-1.5 text-2xl border-black'
                                aria-current={item.current ? 'page' : undefined}
                            >
                                    <span className="flex my-auto xl:my-none">
                                        <span className={classNames(
                                            item.current ? "text-amber-400" : "text-neutral-800 dark:text-neutral-700",
                                            "w-28 mt-1"
                                        )}>
                                            {
                                                item.icon
                                            }
                                        </span>
                                        <span className={classNames(
                                            item.current ? 'border-b-4 text-black dark:text-white' : 'text-neutral-800 dark:text-neutral-700 hover:text-black',
                                            'px-1 py-1 mt-1 font-bold text-sm my-auto ml-5 tracking-widest w-full xl:mx-auto border-amber-400 hidden xl:block'
                                        )}>
                                            {
                                                item.name
                                            }
                                        </span>
                                    </span>
                            </Link>
                        ))}
                    </div>
                </div>
                }
                <div className="block w-full bg-neutral-100 dark:bg-neutral-950 h-fit pb-32 max-w-7xl xl:max-w-[80vw] 2xl:max-w-[90vw]">
                    <div className="bg-neutral-50 lg:p-16 min-h-[80vh] dark:bg-neutral-900 border-b-4 border-l-4 rounded-bl-3xl dark:border-black max-w-full">
                        {children}
                    </div>
                </div>
            </div>
    );
}
