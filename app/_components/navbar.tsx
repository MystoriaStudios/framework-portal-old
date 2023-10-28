'use client'
import React from 'react'
import {Disclosure} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import Image from "next/image";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCube, faSearch } from '@fortawesome/free-solid-svg-icons'
import {Input} from "postcss";

const navigation = [
    {name: 'Dashboard', href: '/dashboard', current: true},
    {name: 'Team', href: '/team', current: false},
    {name: 'Stats', href: '/stats', current: false},
    {name: 'Blog', href: '/blog', current: false},
]

// @ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// @ts-ignore
export default function Navbar({children}) {
    return (
        <Disclosure as="nav"
                    className="pt-8 pb-4">
            {({open}) => (
                <>
                    <div className="mx-auto px-52">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="text-black font-bold tracking-wider">
                                Framew

                                <FontAwesomeIcon icon={faCube} className="mx-0.5" />

                                rk
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start mx-auto">
                                <div className="mx-auto">
                                    <div className="relative mt-2 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-violet-700 sm:text-sm">
                                                <FontAwesomeIcon icon={faSearch} className="-ml-0.5" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Search..."
                                        />
                                    </div>
                                </div>
                                {/*<div className="block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current ? 'text-black' : 'text-gray-300 hover:text-black',
                                                    'px-3 py-2 text-sm font-semibold tracking-wide hover:border-b-2 border-b-white'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>*/}

                            </div>
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {children}
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-black' : 'text-gray-300 hover:bg-gray-700 hover:text-black',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}