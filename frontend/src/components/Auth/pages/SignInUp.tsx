import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const SignInUp: React.FC = () => {
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState(() => {
        const storedSignIn = localStorage.getItem("signInSlug");
        return storedSignIn === null ? true : storedSignIn === "sign-in-panel";
    });

    useEffect(() => {
        localStorage.setItem("signInSlug", signIn ? "sign-in-panel" : "sign-up-panel");
    }, [signIn]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="select-none">
            {/* Sign Up Container */}
            <div
                className={`absolute top-0 sm:h-full h-0 sm:w-1/2 w-full transition-all duration-700 ease-in-out left-0  opacity-0 z-10
                ${signIn ? "" : "transform sm:translate-x-full sm:translate-y-0 translate-y-full opacity-100 z-50"}`}
            >
                <Register />
            </div>

            {/* Sign In Container */}
            <div
                className={`absolute sm:top-0 bottom-0 h-1/2 sm:h-full sm:w-1/2 w-full transition-all duration-700 ease-in-out left-0 z-20 ${signIn ? "" : "transform sm:translate-x-full sm:translate-y-0 -translate-y-full"
                    }`}
            >
                <Login />
            </div>

            {/* Overlay Container */}
            <div
                className={`absolute top-0 sm:left-1/2 left-0 sm:w-1/2 w-full sm:h-full h-1/2 overflow-hidden transition-transform duration-700 ease-in-out z-50 ${signIn ? "" : "transform sm:-translate-x-full translate-y-[27.5rem] sm:translate-y-0"
                    }`}
            >
                <div
                    className={`absolute left-[calc(-100%)] h-full w-[calc(200%)] transition-transform duration-700 ease-in-out ${signIn ? "" : "transform translate-x-1/2"
                        }`}
                >
                    {/* Left Overlay Panel */}
                    <div
                        className={`absolute flex flex-col items-center justify-center text-center p-10 bottom-0 h-full w-1/2 transition-transform duration-700 ease-in-out ${signIn
                            ? "transform -translate-x-1/4"
                            : "transform translate-x-0"}
                            overlay-background`}
                    >
                        <button
                            type="button"
                            className="absolute top-4 left-4 rounded-md py-1 px-2 items-center justify-center shadow-xl z-50 bg-gradient-to-b from-white via-white to-transparent inline-block text-transparent bg-clip-text contrast-200 backdrop-brightness-[.4]"
                            onClick={handleBack}
                        >
                            &lt;&lt; Back
                        </button>
                        <h1 className="inline-block text-transparent bg-gradient-to-br from-red-500 from-20% via-red-400 via-40% to-yellow-400 to-80% bg-clip-text font-bold m-0 contrast-200 backdrop-brightness-[.4] rounded-md p-2">Welcome Back!</h1>
                        <p className="bg-gradient-to-b from-white via-white to-yellow-500 inline-block text-transparent bg-clip-text text-sm font-light leading-5 tracking-wide my-5 contrast-200 backdrop-brightness-[.4] rounded-md p-2">
                            To keep connected with us please login with your
                            personal info
                        </p>
                        <button
                            type="button"
                            className="rounded-full border border-red-600 bg-red-600 text-white text-xs font-bold p-3 px-11 uppercase tracking-wide transition-transform duration-75 ease-in transform active:scale-95 focus:outline-none"
                            onClick={() => setSignIn(true)}
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Right Overlay Panel */}
                    <div
                        className={`absolute flex flex-col items-center justify-center text-center p-10 top-0 h-full w-1/2 transition-transform duration-700 ease-in-out right-0 ${signIn
                            ? "transform translate-x-0"
                            : "transform translate-x-1/4"
                            }
                            overlay-background`}
                    >
                        <button
                            type="button"
                            className="absolute top-4 left-4 rounded-md py-1 px-2 items-center justify-center shadow-xl z-50 bg-gradient-to-b from-white via-white to-transparent inline-block text-transparent bg-clip-text contrast-200 backdrop-brightness-[.4]"
                            onClick={handleBack}
                        >
                            &lt;&lt; Back
                        </button>
                        <h1 className="inline-block text-transparent bg-gradient-to-br from-red-500 from-20% via-red-400 via-40% to-yellow-400 to-80% bg-clip-text font-bold m-0 contrast-200 backdrop-brightness-[.4] rounded-md p-2">Hello, Friend!</h1>
                        <p className="text-white text-sm font-light leading-5 tracking-wide my-5 contrast-200 backdrop-brightness-[.4] rounded-md p-2">
                            Enter Your personal details and start journey with
                            us
                        </p>
                        <button
                            type="button"
                            className="rounded-full border border-red-600 bg-red-600 text-white text-xs font-bold p-3 px-11 uppercase tracking-wide transition-transform duration-75 ease-in transform active:scale-95 focus:outline-none"
                            onClick={() => setSignIn(false)}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInUp;