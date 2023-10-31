import {OrganizationSwitcher} from "@clerk/nextjs";
import React from "react";

import {faBookBookmark, faChartArea, faPodcast, faServer, faTools} from '@fortawesome/free-solid-svg-icons'
import {faHive} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const navigation = [
    {name: 'Dashboard', href: '/dashboard', current: true, icon: <FontAwesomeIcon icon={faServer}/>},
    {name: 'Templates', href: '/templates', current: false, icon: <FontAwesomeIcon icon={faBookBookmark}/>},
    {name: 'Analytics', href: '/stats', current: false, icon: <FontAwesomeIcon icon={faChartArea}/>},
    {name: 'Pods', href: '/pods', current: false, icon: <FontAwesomeIcon icon={faPodcast}/>},
    {name: 'Tools', href: '/tools', current: false, icon: <FontAwesomeIcon icon={faTools}/>},
    {name: 'Database Hive', href: '/hive', current: false, icon: <FontAwesomeIcon icon={faHive}/>},
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
                    <div className="block w-64 bg-white border-r-2 border-gray-100">
                        <div className="flex flex-col text-center pb-12 h-[80vh]">
                            <div className="w-full border-b-2 flex justify-center py-6 bg-gray-100 border-gray-300">
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
                                    className='px-3 pr-12 font-semibold tracking-wide w-full mx-auto my-3.5 text-2xl border-black'
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    <span className="flex">
                                        <span className="w-28 text-gray-800">
                                            {
                                                item.icon
                                            }
                                        </span>
                                        <span className={classNames(
                                            item.current ? 'border-b-4 text-black' : 'text-gray-800 hover:text-black',
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
                <div className="block w-full m-16">
                    {children}
                </div>
            </div>
        </main>
    );
}
