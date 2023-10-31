import {ClerkProvider, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";

import "./globals.css";
import {Dosis} from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import React from "react";
import Navbar from "@/app/_components/navbar";

import {faBlog, faDollar, faServer, faTools} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Username from "@/app/_components/username";

const inter = Dosis({subsets: ["latin"]});

const navigation = [
    {name: 'Dashboard', href: '/dashboard', current: true, icon: <FontAwesomeIcon icon={faServer}/>},
    {name: 'Tools', href: '/tools', current: false, icon: <FontAwesomeIcon icon={faTools}/>},
    {name: 'Blog', href: '/blog', current: false, icon: <FontAwesomeIcon icon={faBlog}/>},
    {name: 'Marketplace', href: '/marketplace', current: false, icon: <FontAwesomeIcon icon={faDollar}/>},
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
    // @ts-ignore
    // @ts-ignore

    // @ts-ignore

    return (
        <html lang="en">
        <ClerkProvider
            appearance={{
                variables: {colorPrimary: "#000000"},
                elements: {
                    membersPageInviteButton:
                        "bg-black border border-black border-solid hover:bg-white hover:text-black",
                    card: "bg-[#BBEEEAA]",
                },
            }}
        >
            <body className={`${inter.className} min-h-screen flex flex-col bg-cover bg-white`}>
            <Navbar>
                <SignedIn>
                    <span className="mr-4 flex flex-col text-right">
                      <Username className="text-sm font-bold text-gray-800"></Username>
                      <span className="text-sm font-bold text-green-400 tracking-wider">Logged in</span>
                    </span>
                    <span className="ml-2">
                      <UserButton afterSignOutUrl="/"/>
                    </span>


                </SignedIn>
                <SignedOut>
                    <Link href="/sign-in" className="flex">
                    <span className="mr-4 flex flex-col text-right">
                      <span className="text-sm font-semibold text-gray-900">Guest</span>
                      <span className="text-[10px] font-bold uppercase text-amber-400">Not logged in</span>
                    </span>
                        <img src="https://minotar.net/avatar/MHF_Question/32" height={32} width={32}/>
                    </Link>
                </SignedOut>
            </Navbar>
            <main className="grow">

                {children}
            </main>


            <footer className="flex items-center h-20 gap-1 px-8 font-medium border-t md:px-20">
                <span className="mr-4 uppercase mt-3 font-extrabold tracking-widest">
                    Framework
                    <div className="flex gap-2">
                        <h1 className="text-xs tracking-tight bg-orange-400 w-fit px-2 rounded-full ">
                            v1.302
                        </h1>
                        <h1 className="text-xs tracking-tight bg-red-600 w-fit px-2 rounded-full text-white">
                            UNSTABLE
                        </h1>
                    </div>
                    <span
                        className="text-xs font-normal tracking-tight text-gray-200">Page loaded in <b>104ms</b></span>
                </span>
                <span className="text-xs">
                    A Solution provided by
                    <h1 className="-mt-1 font-bold text-lg">Mystoria Studios</h1>
                </span>

                <div className="flex-row flex ml-auto gap-x-8">
                    {navigation.map((item) => (
                        <Link
                            href={item.href}
                            className="flex flex-col text-center">
                            {item.icon}
                            {item.name}
                        </Link>
                    ))
                    }
                </div>
            </footer>
            </body>
        </ClerkProvider>

        <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js"/>
        <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js"/>
        </html>
    );
}
