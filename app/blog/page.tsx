import {auth, clerkClient} from "@clerk/nextjs";
import {redirect} from "next/navigation";
import {Post} from "./post";
import Link from "next/link";
import useSWR from "swr";

export default async function BlogPage() {
    const route = `http://localhost:7777/api/blog/posts`

    let posts : any[] = []
    await fetch(route).then(async it => {
        posts = await it.json()
    })

    const {userId} = auth();

    if (!userId) {
        redirect("/");
    }

    const user = await clerkClient.users.getUser(userId);

    // @ts-ignore
    return (
        <div className="px-8 py-12 sm:py-16 md:px-20">
            {user && (
                <div>
                    <div className="flex-row flex">
                        <div className="flex-col flex">
                            <h1 className="text-3xl font-semibold">
                                👋 Hi, {user.firstName || `Stranger`}
                            </h1>
                            <span>Welcome to our blog space!</span>
                        </div>
                        {
                            // @ts-ignore
                            user.publicMetadata["role"] >= 4 ? (
                                <Link href="/blog/create" className="ml-auto h-8 px-3 rounded flex bg-green-400 border-green-600 opacity-80 text-white font-bold text-xl">
                                    Create Post
                                </Link>
                            ) : (<></>)
                        }
                    </div>


                    <div className="flex-col gap-y-8">
                        {posts ? (
                            posts.map((post) : any => (
                                <Link key={post.key} href={`/blog/post/${post.key}`} className="flex-col rounded my-4 shadow-lg bg-gray-100 text-black">
                                    <h1 className="font-bold text-2xl">{post.title}</h1>
                                    <h2 className="font-normal text-sm">Written by, {post.author}</h2>
                                    <hr/>

                                    <p>${post.content}</p>
                                </Link>
                            ))
                        ) : (
                            <div>
                                Loading blog posts..
                            </div>
                        )
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
