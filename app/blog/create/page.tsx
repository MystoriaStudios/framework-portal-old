import {auth, clerkClient} from "@clerk/nextjs";
import {redirect} from "next/navigation";

export default async function BlogCreatePage() {
    const {userId} = auth();

    if (!userId) {
        redirect("/");
    }

    const user = await clerkClient.users.getUser(userId);

    // @ts-ignore
    if (user.publicMetadata["role"] < 4) {

        return null
    }

    return (
        <div className="px-8 py-12 sm:py-16 md:px-20">
            {user && (
                <div className="flex-col flex px-72">
                    <div className="flex-col flex">
                        <h1 className="text-3xl font-semibold">
                            👋 Hi, {user.firstName || `Stranger`}
                        </h1>
                        <span>Create a new blog post below!</span>
                    </div>

                    <form className="mt-12 flex-row gap-10" method="post"
                          action="https://api.nopox.xyz/api/blog/post">
                        <input placeholder="Enter a key (slug)" type="text" id="key" name="key"
                               className="block w-96 rounded-full bg-opacity-10 border-opacity-20 bg-neutral-200 border-0 py-1.5 pl-7 pr-20 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                        <br/>
                        <input placeholder="Enter a title" type="text" id="title" name="title"
                               className="block w-96 rounded-full bg-opacity-10 border-opacity-20 bg-neutral-200 border-0 py-1.5 pl-7 pr-20 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                        <br/>
                        <input placeholder="Enter some content" type="textarea" id="content" name="content"
                               className="block w-96 rounded-full bg-opacity-10 border-opacity-20 bg-neutral-200 border-0 py-1.5 pl-7 pr-20 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                        <br/>
                        <input // @ts-ignore
                            value={user.firstName} type="text" id="author" name="author"
                            className="block w-96 rounded-full bg-opacity-10 border-opacity-20 bg-neutral-200 border-0 py-1.5 pl-7 pr-20 text-neutral-900 ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                        />
                        <br/>
                        <button role="submit"
                                className="h-8 px-3 rounded flex bg-green-400 border-green-600 opacity-80 text-white font-bold text-xl">
                            Create Post
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
