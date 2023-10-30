'use client'
import React from 'react'
import {Disclosure} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import Image from "next/image";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {
    faBookBookmark,
    faDollar,
    faCube,
    faBlog,
    faSearch,
    faServer,
    faTools
} from '@fortawesome/free-solid-svg-icons'

// @ts-ignore
export default function Navbar({children}) {
    return (
        <Disclosure as="nav"
                    className="pt-8 pb-4 bg-white shadow-sm border-b-2 border-gray-200">
            {({open}) => (
                <>
                    <div className="mx-auto pr-52">
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
                            <div className="text-black ml-12 text-2xl flex-col font-bold tracking-wider">
                                <div>
                                    Framew

                                <FontAwesomeIcon icon={faCube} className="mx-0.5" />

                                rk
                                </div>
                                <div className="text-xs">
                                    The all in one cloud solution.
                                </div>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start mx-auto">
                                <div className="mx-auto">
                                    <div className="relative mt-2 rounded-full shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-black sm:text-sm pl-80">
                                                <FontAwesomeIcon icon={faSearch} className="-ml-0.5" />
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            name="search"
                                            id="search"
                                            className="block w-96 rounded-full bg-opacity-10 border-opacity-20 bg-gray-200 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                                            placeholder="sᴇᴀʀᴄʜ . . ."
                                        />
                                    </div>
                                </div>
                                {}

                            </div>
                            <div
                                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {children}
                            </div>
                        </div>
                    </div>
                </>
            )}

        </Disclosure>
    )
}