import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../../lib/api";
import { Users } from "lucide-react";
import { Input } from "@/components/Ui/input";
import usePersonStore from "@/lib/Utils/zustandStore";

interface APIError {
    errorMessage: string;
    data: null;
    statusCode: number;
    errors: never[] | string[];
    success: boolean;
}

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<APIError | null>(null);
    const updatePerson = usePersonStore((state) => state.updatePerson);
    const isUserLoggedIn = usePersonStore((state) => state._id);

    useEffect(() => {
        if (isUserLoggedIn) {
            navigate("/");
        }
    }, [isUserLoggedIn, navigate]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiError(null);
        setIsLoading(true);

        try {
            const userData = await login(email, password);
            if (!userData.data) {
                throw new Error("User Data Not Found");
            }
            {
                const { _id, firstName, lastName, avatar } = userData.data;

                if (!_id || !lastName || !avatar) {
                    throw new Error("Required Fields are Missing");
                }

                updatePerson(
                    _id,
                    firstName,
                    lastName,
                    userData?.data?.email,
                    avatar,
                );
            }

            if (userData.data) {
                navigate("/");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiErrorResponse = error.response?.data as APIError;
                setApiError(apiErrorResponse);
            } else {
                console.error("Unexpected error:", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center p-6 md:p-2 mb-16">
            <section className="flex  mx-auto max-w-screen-xl bg-gray-100 dark:bg-background border mt-2 shadow-2xl rounded-xl  flex-row ">
                <div className="  flex flex-col items-center  h-fit md:h-auto lg:py-">
                    <div className="w-full md:w-[80vw] p-8  md:mt-0 sm:max-w-md xl:p-0">
                        <div className=" sm:px-8 ">
                            <h1 className="text-xl flex items-center gap-2 my-4 font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                                <Users /> Login
                            </h1>
                            <div className="h-80">
                                <form
                                    className="space-y-4 md:space-y-2 my-10"
                                    onSubmit={handleLogin}
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Your email
                                        </label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="p-2.5 shadow-md"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Password
                                        </label>
                                        <Input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="••••••••"
                                            className="p-2.5 shadow-md"
                                            required
                                        />
                                    </div>
                                    {apiError && (
                                        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                            {`Error ${apiError.statusCode}: ${apiError.errorMessage}`}
                                            {apiError.errors.length > 0 && (
                                                <ul>
                                                    {apiError.errors.map((err, index) => (
                                                        <li key={index}>{err}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start"></div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full  bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-border dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    >
                                        {isLoading ? (
                                            <div className="text-center">
                                                <div role="status">
                                                    <svg
                                                        aria-hidden="true"
                                                        className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400 dark:fill-cyan-400"
                                                        viewBox="0 0 100 101"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                            fill="currentColor"
                                                        />
                                                        <path
                                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                            fill="currentFill"
                                                        />
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (
                                            "Sign in"
                                        )}
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet?{" "}
                                        <a
                                            href="/register"
                                            className="px-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
                                        >
                                            Sign up
                                        </a>
                                    </p>
                                    <br />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative  hidden  md:block w-[30vw]  overflow-hidden py-8  h-full md:h-auto lg:py-4 ">
                    <img
                        src="https://res.cloudinary.com/dzxynskmo/image/upload/v1715160614/Petopia/jsjnyg0lmn5aqt1mxjd3.jpg"
                        loading="lazy"
                        alt="Photo by petopia"
                        className="absolute inset-0 rotate-2 h-full w-full p-6 object-cover object-top"
                    />
                </div>
            </section>
        </div>
    );
};

export default Login;
