"use client"
import React from 'react'
import {Disclosure} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'

import {faBlog, faCube, faDollar, faSearch, faServer} from '@fortawesome/free-solid-svg-icons'
import useDarkMode from "@/app/utils/useDarkMode";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const navigation = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        current: true,
        icon: <FontAwesomeIcon className="text-blue-400" icon={faServer}/>
    },
    {name: 'Blog', href: '/blog', current: false, icon: <FontAwesomeIcon className="text-amber-400" icon={faBlog}/>},
    {
        name: 'Marketplace',
        href: '/marketplace',
        current: false,
        icon: <FontAwesomeIcon className="text-success" icon={faDollar}/>
    },
]

// @ts-ignore
export default function Navbar({children}) {
    const [colorTheme, setTheme] = useDarkMode();

    return (
        <Disclosure as="nav"
                    className="pt-8 z-50 pb-4 bg-neutral-50 shadow-sm border-b-2 border-neutral-200 dark:border-black dark:bg-neutral-950">
            {({open}) => (
                <>
                    <div className="mx-auto pr-52">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="ml-12 text-2xl flex-col font-bold tracking-wider min-w-max">
                                <Link href="/" className="text-amber-400">
                                    Framew

                                    <FontAwesomeIcon icon={faCube} className="mx-0.5 text-amber-500"/>

                                    rk
                                </Link>
                                <div className="text-xs">
                                    The all in one cloud solution.
                                </div>
                            </div>
                            <div
                                className="hidden xl:flex flex-1 items-center justify-center sm:items-stretch sm:justify-start mx-auto">
                                <div className="ml-12">
                                    <div className="relative mt-2 rounded-full shadow-sm">
                                        <div
                                            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-neutral-600 sm:text-sm">
                                                <FontAwesomeIcon icon={faSearch} className="-ml-0.5"/>
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="search"
                                            id="search"
                                            className="block w-[50vh] rounded-full bg-transparent border-0 py-1.5 pl-7 pr-20 text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-lg sm:leading-6"
                                            placeholder="    Search for something."
                                        />
                                    </div>
                                </div>
                                {}

                            </div>
                            <div className="flex flex-row gap-x-1 px-3 py-2 mr-4 rounded-full">
                                {navigation.map((nav) => (
                                    <Link href={nav.href}
                                          className="mx-2 p-1 flex flex-row uppercase font-bold tracking-widest text-neutral-400 dark:text-neutral-300">
                                        {nav.name}
                                    </Link>
                                ))
                                }
                            </div>
                            {colorTheme === "light" ? (
                                <div
                                    className="flex flex-row gap-x-4 bg-neutral-100 bg-opacity-10 px-3 py-2 rounded-tl-2xl rounded-br-2xl">
                                    <svg
                                        // @ts-ignore
                                        onClick={() => setTheme("light")}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 stroke-amber-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                        />
                                    </svg>
                                </div>
                            ) : (
                                <div
                                    className="flex flex-row gap-x-4 bg-neutral-400 bg-opacity-10 px-3 py-2 rounded-tr-2xl rounded-bl-2xl">
                                    <svg
                                        // @ts-ignore
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 stroke-amber-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                    <svg
                                        // @ts-ignore
                                        onClick={() => setTheme("dark")}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 stroke-neutral-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                        />
                                    </svg>
                                </div>
                            )}
                            <div
                                className="absolute inset-y-0 xl:mr-3 right-0 flex items-center xl:pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {children}
                            </div>
                        </div>
                    </div>
                </>
            )}

        </Disclosure>
    )
}