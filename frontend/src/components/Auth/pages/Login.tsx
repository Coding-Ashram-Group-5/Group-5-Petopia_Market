import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../../lib/api";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import loadingMP4 from "@/assets/loading.mp4"
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
    const [email, setEmail] = useState(() => sessionStorage.getItem("loginEmail") || "");
    const [password, setPassword] = useState("");
    const [apiError, setApiError] = useState<APIError | null>(null);
    const [isLoading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const updatePerson = usePersonStore((state) => state.updatePerson);
    const isUserLoggedIn = usePersonStore((state) => state._id);

    useEffect(() => {
        if (isUserLoggedIn) {
            navigate("/");
        }
    }, [isUserLoggedIn, navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiError(null);
        setLoading(true);

        try {
            // Simulate loading
            await new Promise((resolve) => setTimeout(resolve, 3000));

            const userData = await login(email, password);
            setLoading(false);

            const { _id, firstName, lastName, avatar } = userData.data;

            if (!_id || !lastName || !avatar) {
                throw new Error("Required Fields are Missing");
            }

            updatePerson(_id, firstName, lastName, userData.data.email, avatar);

            sessionStorage.removeItem("loginEmail");

            navigate(-1);
        } catch (error) {
            setLoading(false);

            if (axios.isAxiosError(error)) {
                const apiErrorResponse = error.response?.data as APIError;
                setApiError(apiErrorResponse);
            } else {
                console.error("Unexpected error:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        sessionStorage.setItem("loginEmail", email);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailPattern.test(email));
    }, [email]);

    return (
        <div className="relative sm:h-full w-full select-none">
            {isLoading && (
                <div className="absolute left-0 bottom-0 bg-white h-full w-full inset-0 opacity-75 z-50 flex items-center justify-center">
                    <video autoPlay loop className="object-cover">
                        <source src={loadingMP4} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
            <form
                className="flex flex-col items-center justify-center p-12 h-full text-center"
                onSubmit={handleLogin}
            >
                <h1 className="font-bold m-0 sm:text-xl">Sign In</h1>
                <div className="relative w-full my-2">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 appearance-none dark:text-white focus:outline-none focus:ring-0 peer ${isValidEmail
                                ? "border-green-500 focus:border-green-500 dark:border-[#4CAF50] dark:focus:border-[#4CAF50]"
                                : "border-red-500 focus:border-red-500 dark:border-[#FF5A5A] dark:focus:border-[#FF5A5A]"
                            }`}
                        placeholder=" "
                        autoComplete="on"
                        required
                    />
                    <label
                        htmlFor="email"
                        className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white dark:bg-gray-950 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text pointer-events-none ${isValidEmail
                                ? "text-green-500 dark:text-[#8BC34A]"
                                : "text-red-500 dark:text-[#FF8888]"
                            }`}
                    >
                        Email
                    </label>
                </div>
                <div className="relative w-full my-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="floating_password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_password"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white dark:bg-gray-950 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text pointer-events-none"
                    >
                        Password
                    </label>
                    {/* Eye icon for password visibility toggle */}
                    <div className="absolute inset-y-0 right-2 flex items-center">
                        {showPassword ? (
                            <PiEye
                                className="text-gray-500 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            />
                        ) : (
                            <PiEyeClosed
                                className="text-gray-500 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            />
                        )}
                    </div>
                </div>
                <a href="#" className="text-gray-700 dark:text-gray-300 text-sm my-4 no-underline">
                    Forgot your password?
                </a>
                <button
                    type="submit"
                    className="w-full rounded-full border border-red-600 bg-red-600 text-white text-xs font-bold p-3 px-11 uppercase tracking-wide transition-transform duration-80 ease-in transform active:scale-95 focus:outline-none"
                >
                    Sign In
                </button>
                {apiError && (
                    <div className="mt-2 p-2 w-full bg-red-100 border border-red-400 text-red-700 rounded-md">
                        {`${apiError.errorMessage}`}
                        {apiError.errors.length > 0 && (
                            <ul>
                                {apiError.errors.map((err, index) => (
                                    <li key={index}>{err}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </form>
        </div>
    );
};

export default Login;
