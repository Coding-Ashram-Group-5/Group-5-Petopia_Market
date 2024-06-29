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
            console.error("Login error:", error); if (axios.isAxiosError(error)) {
                const apiErrorResponse = error.response?.data as APIError;
                setApiError(apiErrorResponse);
            } else {
                console.error("Unexpected error:", error);
            }
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
                                        Sign in
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet?{" "}
                                        <a
                                            href="/register"
                                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
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
