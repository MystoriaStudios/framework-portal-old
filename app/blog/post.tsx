import useSWR from 'swr'

const fetcher = async (...args: [string, RequestInit?]) => await fetch(...args).then(async res => {
    const response = await res.json()
    console.log(response)
    return response
})

export function Post(key: String) {
    const route = `http://65.108.1.20:7777/api/blog/post/${key}`
    console.log(route)

    const {data, error, isValidating} = useSWR(route, fetcher)

    if (error) {
        return <p>{error.toString()}</p>
    }

    // @ts-ignore
    return (
        <div className="p-4 relative  bg-gray-50 border border-gray-100 shadow-lg  rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14  absolute top-4 right-3 text-blue-500"
                 viewBox="0 0 20 20" fill="currentColor">
                <path
                    d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
            </svg>
            <div className="flex justify-between items-center ">
                <i className="fab fa-behance text-xl text-gray-400"></i>
            </div>
            <div className="mt-4">
                {isValidating ? (
                    <div className="pb-6 max-h-96">
                        Loading post {key}..
                    </div>
                ) : (
                    <div className="text-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        {data}
                    </div>
                )}

            </div>
        </div>
    );
}