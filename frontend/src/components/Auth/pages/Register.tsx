import { useState, useEffect } from "react";
import axios from "axios";
import { register } from "../../../lib/api";
import { useNavigate } from "react-router-dom";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import loadingGif from "@/assets/loading2.gif"
import usePersonStore from "@/lib/Utils/zustandStore";

interface APIError {
    errorMessage: string;
    data: null;
    statusCode: number;
    errors: never[] | string[];
    success: boolean;
}

interface RegisterForm {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<APIError | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [formData, setFormData] = useState<RegisterForm>({
        firstName: sessionStorage.getItem("registerFirstName") || "",
        lastName: sessionStorage.getItem("registerLastName") || "",
        email: sessionStorage.getItem("registerEmail") || "",
        password: "",
        confirmPassword: "",
    });

    const { firstName, lastName, email, password, confirmPassword } = formData;
    const updatePerson = usePersonStore((store) => store.updatePerson);
    const isUserLoggedIn = usePersonStore((state) => state._id);

    useEffect(() => {
        if (isUserLoggedIn) {
            navigate("/");
        }
    }, [isUserLoggedIn, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData, [name]: value };
            if (updatedFormData.password === updatedFormData.confirmPassword) {
                setPasswordError(null);
            }
            return updatedFormData;
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiError(null);
        setIsLoading(true);

        try {
            if (password !== confirmPassword) {
                setPasswordError("Passwords do not match");
                setIsLoading(false);
                return;
            }

        await new Promise((resolve) => setTimeout(resolve, 3000));

        const userData = await register(formData);

        setIsLoading(false);

        if (!userData.data) {
            throw new Error("User Data Not Found");
        }


            const { _id, firstName, lastName, avatar } = userData.data;


            if (!_id || !lastName || !avatar) {
                throw new Error("Required Fields are Missing");
            }
            updatePerson(_id, firstName, lastName, email, avatar);
            sessionStorage.removeItem("registerFirstName");
            sessionStorage.removeItem("registerLastName");
            sessionStorage.removeItem("registerEmail");
            navigate("/");

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

    useEffect(() => {
        sessionStorage.setItem("registerFirstName", firstName);
        sessionStorage.setItem("registerLastName", lastName?lastName:"");
        sessionStorage.setItem("registerEmail", email);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailPattern.test(email));
    }, [firstName, lastName, email]);

    return (
        <div className="relative sm:h-full w-full select-none">
            {isLoading && (
                <div className="absolute left-0 top-0 bg-white h-full w-fit inset-0 opacity-90 z-50 flex items-center justify-center">
                    <img src={loadingGif} alt="Loading..." className="object-cover" />
                </div>
            )}
            <form
                onSubmit={handleRegister}
                className="bg-white dark:bg-gray-950 flex flex-col items-center justify-center p-12 h-full text-center select-none">
                <h1 className="font-bold m-0 sm:text-xl">Create Account</h1>

                <div className="grid grid-cols-2 gap-2 sm:block w-full mt-2">

                <div className="relative w-full my-2">
                    <input
                        type="text"
                        id="floating_firstName"
                        name="firstName"
                        value={firstName}
                        onChange={handleInputChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_firstName"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white dark:bg-gray-950 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text pointer-events-none"
                    >
                        First Name
                    </label>
                </div>

                <div className="relative w-full my-2">
                    <input
                        type="text"
                        id="floating_lastName"
                        name="lastName"
                        value={lastName}
                        onChange={handleInputChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_lastName"
                        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2  origin-[0] bg-white dark:bg-gray-950 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text pointer-events-none"
                    >
                        Last Name
                    </label>
                </div>

                    </div>

                <div className="relative w-full my-2">
                    <input
                        type="email"
                        id="floating_email"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white focus:outline-none focus:ring-0 peer ${
                            isValidEmail
                                ? "border-green-500 focus:border-green-500 dark:border-[#4CAF50] dark:focus:border-[#4CAF50]"
                                : "border-red-500 focus:border-red-500 dark:border-[#FF5A5A] dark:focus:border-[#FF5A5A]"
                        }`}
                        placeholder=" "
                        required
                        autoComplete="on"
                    />
                    <label
                        htmlFor="floating_email"
                        className={`absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white dark:bg-gray-950 px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text pointer-events-none ${
                            isValidEmail
                                ? "text-green-500 dark:text-[#8BC34A]"
                                : "text-red-500 dark:text-[#FF8888]"
                        }`}
                    >
                        Email
                    </label>
                </div>

                    <div className="grid grid-cols-2 gap-2 sm:block w-full">

                <div className="relative w-full my-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="floating_password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
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

                <div className="relative w-full my-2">
                    <input
                        type="password"
                        id="floating_confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleInputChange}
                        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="floating_confirmPassword"
                        className="absolute ml-[-4px] text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white dark:bg-gray-950 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-text pointer-events-none"
                    >
                        Confirm&nbsp;Password
                    </label>
                </div>

                    </div>

                {passwordError && (
                    <div className="w-full mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
                        {passwordError}
                    </div>
                )}

                {apiError && (
                    <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
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

                <div className="flex items-start mt-1">
                    <div className="flex items-center h-5">
                        <input
                            id="terms"
                            aria-describedby="terms"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 accent-red-500 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            required
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label
                            htmlFor="terms"
                            className="font-light text-gray-500 dark:text-gray-300"
                        >
                            I&nbsp;accept&nbsp;the&nbsp;
                            <a
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                href="#"
                            >
                                Terms&nbsp;and&nbsp;Conditions
                            </a>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-3 rounded-full border border-red-600 bg-red-600 text-white text-xs font-bold p-3 px-11 uppercase tracking-wide transition-transform duration-80 ease-in transform active:scale-95 focus:outline-none"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;
