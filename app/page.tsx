import Link from "next/link";
import "./home.css";
import React from "react";
import {BiAlarmExclamation, BiCheck, BiCommand, BiSleepy, BiWrench} from "react-icons/bi";

export default function Home() {
    return (
        <main className="mx-24 p-12 pt-4">
            <div className="text-bold text-center mt-26">
                <div
                    className="mockup-code center mx-auto bg-neutral-800 md:mt-8 mb-4 text-primary-content text-left max-w-[32rem] w-full drop-shadow-2xl">
                    <pre data-prefix="$" className="text-warning"><code>
                        Welcome to Mystoria Cloud Solution
                    </code></pre>
                    <pre data-prefix=">" className="text-warning"><code>
                        <BiSleepy className="inline-block text-2xl"/> We're building something amazing for you [21%]
                    </code></pre>
                    <pre data-prefix=">" className="text-neutral-400"><code>
                        <BiCommand className="inline-block text-2xl"/> Testing out what we've done... [46%]
                    </code></pre>
                    <pre data-prefix=">" className="text-error"><code>
                        <BiAlarmExclamation className="inline-block text-2xl"/> Oops! We found a mistake! [72%]
                    </code></pre>
                    <pre data-prefix=">" className="text-fuchsia-500"><code>
                        <BiWrench className="inline-block text-2xl"/> Just a sec, polishing up our work [95%]
                    </code></pre>
                    <pre data-prefix=">" className="text-success"><code>
                        <BiCheck className="inline-block text-2xl"/> Success! An incredible design has been made.
                    </code></pre>
                    <pre data-prefix=">" className="text-success"><code>
                        Check it out: <Link href="https://mystoria.dev" target="_blank" rel="noreferrer noopener"
                                            className="hover:underline">https://mystoria.dev</Link>
                    </code></pre>
                </div>
                <br/>

                <br/>
                <div className={"flex-row flex justify-center space-x-2.5"}>
                    <div
                        className={"b-2 border-red-400 text-red-400 btn shadow-sm dark:text-amber-50 font-bold px-4 py-1 w-fit rounded"}>
                        In Development
                    </div>
                    <Link
                        href={"https://discord.gg/Xy4ytrNUkx"}
                        className={"b-2 border-[#5865F2] text-[#5865F2] btn shadow-sm dark:text-amber-50 font-bold px-4 py-1 w-fit rounded"}>
                        Discord
                    </Link>
                </div>
            </div>
        </main>
    );
}