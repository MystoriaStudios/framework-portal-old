import {ClerkProvider, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";

import "./globals.css";
import {Dosis} from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import React from "react";
import Navbar from "@/app/_components/navbar";

import {dark} from "@clerk/themes";
import useDarkMode from "@/app/utils/useDarkMode";

const inter = Dosis({subsets: ["latin"]});



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

    // @ts-ignore
    return (
        <html lang="en" className="transition-colors delay-100 duration-200 ease-in-out block max-w-[100vw]">

        <meta
            property="og:title"
            content="Framework - The all in one minecraft"
        />
        <meta
            property="og:description"
            content="All-in-one server deployment and creation environment, secure, and works on both your desktop and phone. Stop paying for overpriced machines and join the cloud. Simplify your life."
        />
        <meta
            property='og:image'
            content='https://imgs.search.brave.com/QA-ofQEF-eW6XEH42EiGzTAjNPmoXPyIyJmgKBencb0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8y/LzIzL05vcnRoZXJu/XzMzMV8xMDFfbGVh/dmluZ19CZW5fUmh5/ZGRpbmcuanBn'
        />
        <meta
            name="twitter:card"
            content="summary"
        />
        <meta
            name="twitter:site"
            content="https://framework-portal.vercel.app/"
        />
        <meta
            name="twitter:creator"
            content="@MystoriaStudios"
        />

        <ClerkProvider
            appearance={{
                baseTheme: dark,
                variables: {colorPrimary: "#000000"},
                elements: {
                    membersPageInviteButton:
                        "bg-black border border-black border-solid hover:bg-white hover:text-black",
                    card: "bg-[#BBEEEAA]",
                },
            }}
        >
            <body
                className={`${inter.className} min-h-screen flex flex-col bg-cover bg-neutral-100 dark:bg-neutral-900 dark:text-white`}>
            <Navbar>
                <SignedIn>
                    <span className="ml-2">
                      <UserButton afterSignOutUrl="/"/>
                    </span>


                </SignedIn>
                <SignedOut>
                    <Link href="/sign-in" className="flex">
                    <span className="mr-4 flex flex-col text-right">
                      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">Oh noo :(</span>
                      <span className="text-[10px] font-bold uppercase text-red-400">Not logged in</span>
                    </span>
                        <img src="https://minotar.net/avatar/MHF_Question/32" height={32} width={32}/>
                    </Link>
                </SignedOut>


            </Navbar>
            <main className="grow">
                {children}
            </main>


            <footer className="footer p-10 dark:bg-neutral-950 text-base-content px-32 lg:px-96">
                <aside>
                    <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
                    <p className="mt-2">Mystoria Studios Ltd.<br/>Providing reliable cloud systems.</p>
                </aside>
                <nav>
                    <header className="footer-title">Services</header>
                    <a className="link link-hover">Framework (this)</a>
                    <a className="link link-hover">Social Media Management</a>
                    <a className="link link-hover">Web Tools 3</a>
                    <a className="link link-hover">Minigame Development Kit</a>
                </nav>
                <nav>
                    <header className="footer-title">Company</header>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Careers</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <header className="footer-title">Legal</header>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                    <a className="link link-hover">Tax policy</a>
                </nav>
            </footer>
            </body>
        </ClerkProvider>


        <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js"/>
        <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js"/>
        </html>
    );
}
