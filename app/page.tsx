import Link from "next/link";
import {DownArrow, RightArrow} from "./icons";
import "./home.css";
import React from "react";

export default function Home() {
    return (
        <main className="mx-52">
            <div className="text-black text-bold text-center mt-26">
                <br/>
                <br/>
                <br/>
                <h1>You have found your way to the Mystoria Studios neew portal how fancy are you.</h1>
                <br/>
                <p>
                    Quick intro tyhis isn't done ofc but if ur here u probably assumed that mk.
                    dont break this thing plss ty vm.
                    uhh we do cool things check the github fr fr
                </p>
                <br/>

                <br/>
                <div className={"flex-row flex justify-center space-x-2.5"}>
                    <div className={"bg-red-400 text-amber-50 font-bold px-4 py-1 w-fit rounded"}>
                        In Development
                    </div>
                    <Link
                        href={"https://discord.gg/TAv6N6RKQk"}
                        className={"bg-[#5865F2] text-amber-50 font-bold px-4 py-1 w-fit rounded"}>
                        Discord
                    </Link>
                </div>
            </div>
        </main>
    );
}
