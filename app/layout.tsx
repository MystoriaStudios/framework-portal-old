import {ClerkProvider, SignedIn, SignedOut, UserButton,} from "@clerk/nextjs";
import "./globals.css";
import {Inter} from "next/font/google";
import {dark} from "@clerk/themes"
import Link from "next/link";
import Script from "next/script";
import React from "react";
import Navbar from "@/app/_components/navbar";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
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
            <body className={`${inter.className} min-h-screen flex flex-col`}>
            <Navbar>
                <SignedIn>
                <span className="mr-4 flex flex-col text-right">
                  <span className="text-sm font-semibold text-gray-900">Namee0</span>
                  <span className="text-[10px] font-bold uppercase text-green-400 tracking-wider">Logged in</span>
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
            <main className="grow">{children}</main>
            s

            <footer className="flex items-center h-20 gap-1 px-8 font-medium border-t md:px-20">
                test
            </footer>
            </body>
        </ClerkProvider>

        <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js"/>
        <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js"/>
        </html>
    );
}
