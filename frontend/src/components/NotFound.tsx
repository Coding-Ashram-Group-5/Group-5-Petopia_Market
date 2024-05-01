import { Link } from "react-router-dom"
function NotFound() {
    return <div>
        <div className=" bg-background py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                <div className="grid gap-8 sm:grid-cols-2">
                    <div className="flex flex-col items-center justify-center sm:items-start md:py-24 lg:py-32">
                        <p className="mb-4 text-sm font-semibold uppercase text-red-500 md:text-base">Error 404</p>
                        <h1 className="mb-2 text-center text-2xl font-bold text-black dark:text-white sm:text-left md:text-3xl">Page not found</h1>

                        <p className="mb-8 text-center text-gray-500 sm:text-left md:text-lg">The page you’re looking for doesn’t exist.</p>

                        <Link to={'/'} className="inline-block rounded-lg bg-red-200 px-8 py-3 text-center text-sm font-semibold text-red-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">Go home</Link>
                    </div>
                    <div className="relative h-80 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-auto">
                        <img src="https://images.pexels.com/photos/8646150/pexels-photo-8646150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" loading="lazy" alt="Photo by @heydevn" class="absolute inset-0 h-full w-full object-cover object-center" />
                    </div>
                </div>
            </div>
        </div>
\
    </div>
}

export default NotFound