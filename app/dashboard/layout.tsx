import {OrganizationSwitcher} from "@clerk/nextjs";
import React from "react";

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
        <main className="grow">
            <div className="flex">
                {true &&
                    <div
                        className="block w-64 bg-neutral-50 border-r-2 border-gray-100 dark:bg-neutral-950 dark:border-black">
                        <div
                            className="flex flex-col text-center pb-12 h-[90vh] border-r-2 border-gray-300 dark:border-black">
                            <div
                                className="w-full border-b-2 flex justify-center py-6 bg-neutral-100 dark:bg-neutral-900 dark:border-black border-gray-300">
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
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className='px-3 pr-12 font-semibold rounded-none tracking-wide w-full mx-auto my-1.5 text-2xl border-black'
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    <span className="flex">
                                        <span className={classNames(
                                            item.current ? "text-amber-400" : "text-gray-800 dark:text-gray-700",
                                            "w-28 mt-1"
                                        )}>
                                            {
                                                item.icon
                                            }
                                        </span>
                                        <span className={classNames(
                                            item.current ? 'border-b-4 text-black dark:text-white' : 'text-gray-800 dark:text-gray-700 hover:text-black',
                                            'px-1 py-1 mt-1 font-bold text-sm my-auto ml-5 tracking-widest w-full mx-auto border-amber-400'
                                        )}>
                                            {
                                                item.name
                                            }
                                        </span>
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                }
                <div className="block w-full p-16 border-b-4 border-black">
                    {children}
                </div>
            </div>
        </main>
    );
}
