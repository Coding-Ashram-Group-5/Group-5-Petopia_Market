import { useState, useEffect } from "react";
import axios from "axios";
import { register } from "../../../lib/api";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Input } from "@/components/Ui/input";
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
    confirmPassword: string; // Added confirmPassword field
}

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState<APIError | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [formData, setFormData] = useState<RegisterForm>({
        firstName: "",
        lastName: "", // Make lastName optional
        email: "",
        password: "",
        confirmPassword: "", // Initialize confirmPassword
    });

    const { firstName, lastName, email, password, confirmPassword } = formData;

    const updatePerson = usePersonStore((Store) => Store.updatePerson);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const isUserLoggedIn = usePersonStore((state) => state._id);

    useEffect(() => {
        if (isUserLoggedIn) {
            navigate("/");
        }
    }, [isUserLoggedIn, navigate]);

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiError(null);
        setIsLoading(true);

        try {
            if (password !== confirmPassword) {
                setPasswordError("Passwords do not match");
                return;
            }
            const userData = await register(formData);

            if (!userData.data) {
                throw new Error("User Data Not Found");
            }

            const { _id, firstName, lastName, avatar } = userData.data;

            if (!_id || !lastName || !avatar) {
                throw new Error("Required Fields are Missing");
            }
            updatePerson(_id, firstName, lastName, email, avatar);

            // document.cookie =
            //     "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            if (userData.data) navigate("/");

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
        <div className="flex justify-center p-6 md:p-2 mb-8">
            <section className="flex  mx-auto p-6 md:p-0 max-w-screen-xl border bg-gray-100 dark:bg-background/20 mt-2 shadow-2xl rounded-xl  flex-row ">
                <div className="relative  hidden  md:block w-[30vw]  overflow-hidden py-8  h-fit md:h-auto lg:py-4 ">
                    <img
                        src="https://res.cloudinary.com/dzxynskmo/image/upload/v1715093732/Petopia/yawbsyjf8bmcsmnix4ev.png"
                        loading="lazy"
                        alt="Photo by petopia"
                        className="absolute inset-0 rotate-2 h-full w-full p-6 object-cover object-center"
                    />
                </div>
                <div className="  flex flex-col items-center  h-fit md:h-auto lg:py-">
                    <div className="w-full md:w-[80vw]  md:mt-0 sm:max-w-md xl:p-0">
                        <div className=" sm:px-8 ">
                            <h1 className="text-xl flex items-center gap-2 my-4 font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                                <UserPlus size={30} /> Register
                            </h1>
                            <form
                                className="space-y-2 md:space-y-2"
                                onSubmit={handleRegister}
                            >
                                <div className="flex gap-2">
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className=" mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            First Name
                                        </label>
                                        <Input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            placeholder="John"
                                            className="p-2.5 shadow-lg"
                                            value={firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className=" mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Last Name
                                        </label>
                                        <Input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            className="p-2.5 shadow-lg"
                                            placeholder="Doe"
                                            value={lastName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <Input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="p-2.5 shadow-lg"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <Input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="p-2.5 shadow-lg"
                                        value={password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Confirm Password
                                    </label>
                                    <Input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        placeholder="••••••••"
                                        className="p-2.5 shadow-lg"
                                        value={confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {passwordError && (
                                    <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                        {passwordError}
                                    </div>
                                )}
                                <div className="flex items-start">
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
                                            I accept the{" "}
                                            <a
                                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                                href="#"
                                            >
                                                Terms and Conditions
                                            </a>
                                        </label>
                                    </div>
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
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm rounded-lg px-4 py-2.5 transition-colors duration-200 transform bg-gradient-to-br from-primary-600 to-primary-500 focus:ring-offset-2 focus:ring-offset-gray-200 bg-border"
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
                                            "Register"
                                        )}
                                </button>
                                <p className="text-sm text-gray-900 pb-5 dark:text-white">
                                    Already have an account?
                                    <a
                                        href="/login"
                                        className="px-1 font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Sign in
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;
