import React, { useState, useEffect } from "react";
import axios from "axios";
import { adoptPet } from "@/lib/api";
import { AdoptPetFormData } from "@/types/models";
import usePersonStore from "@/lib/Utils/zustandStore";
import NotFound from "@/components/NotFound";
import { useParams, useNavigate } from "react-router-dom";

interface APIError {
    errorMessage: string;
    data: null;
    errors: never[] | string[];
    success: boolean;
}

const PetAdoptionForm = () => {
    const { id: paramPetId } = useParams();
    const pet_id = paramPetId || "";
    const { _id, firstName, lastName, email } = usePersonStore();
    const [apiError, setApiError] = useState<APIError | null>(null);
    const [showOverlay, setShowOverlay] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const isUserLoggedIn = usePersonStore((state) => state._id);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<AdoptPetFormData>({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        pet_id: "",
        phoneNumber: "",
    });

    useEffect(() => {
        if (pet_id) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                pet_id,
            }));
        }
    }, [pet_id]);

    useEffect(() => {
        if (isUserLoggedIn) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                firstName,
                lastName,
                email,
            }));
        }
    }, [isUserLoggedIn, firstName, lastName, email, _id]);

    useEffect(() => {
        if (showOverlay && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [showOverlay, countdown]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleOverlayAndRedirect = () => {
        setShowOverlay(true);
        setTimeout(() => {
            navigate("/products");
        }, 5000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiError(null);

        try {
            await adoptPet({ ...formData, pet_id });
            handleOverlayAndRedirect();
        } catch (error) {
            console.error("Submission error:", error);
            if (axios.isAxiosError(error)) {
                const apiErrorResponse = error.response?.data as APIError;
                setApiError(apiErrorResponse);
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };

    return (
        <div>
            <div>
                {!isUserLoggedIn && <NotFound />}
                {isUserLoggedIn && (
                    <div className="flex justify-center p-4 md:p-8 mb-16">
                        <section className="flex flex-col mx-auto w-full max-w-4xl bg-gray-100 dark:bg-background border mt-2 shadow-2xl rounded-xl">
                            <div className="flex flex-col items-center h-full p-4 md:p-8">
                                <div className="w-full">
                                    <div>
                                        <h1 className="text-xl flex items-center gap-2 my-4 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                            User Details For Adoption
                                        </h1>

                                        <form
                                            className="space-y-6"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input
                                                    type="text"
                                                    name="Full Name"
                                                    id="name"
                                                    value={`${firstName} ${lastName}`}
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer cursor-not-allowed"
                                                    placeholder=" "
                                                    disabled
                                                    readOnly
                                                />
                                                <label
                                                    htmlFor="name"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                >
                                                    User Name
                                                </label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={email}
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer cursor-not-allowed"
                                                    placeholder=" "
                                                    disabled
                                                    readOnly
                                                />
                                                <label
                                                    htmlFor="email"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                >
                                                    User Email
                                                </label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input
                                                    type="text"
                                                    name="Id"
                                                    id="UserId"
                                                    value={_id}
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer cursor-not-allowed"
                                                    placeholder=" "
                                                    disabled
                                                    readOnly
                                                />
                                                <label
                                                    htmlFor="UserId"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                                >
                                                    User Id
                                                </label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input
                                                    type="text"
                                                    name="pet_id"
                                                    id="pet_id"
                                                    value={pet_id}
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer cursor-not-allowed"
                                                    placeholder=" "
                                                    onChange={handleChange}
                                                    disabled
                                                    readOnly
                                                />
                                                <label
                                                    htmlFor="pet_id"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                                                >
                                                    Pet Id
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
                                                </label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input
                                                    type="text"
                                                    name="street"
                                                    id="street"
                                                    value={formData.street}
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                                                    placeholder=" "
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label
                                                    htmlFor="street"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                                                >
                                                    Street
                                                </label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    value={formData.city}
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                                                    placeholder=" "
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label
                                                    htmlFor="city"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                                                >
                                                    City
                                                </label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input
                                                    type="text"
                                                    name="state"
                                                    id="state"
                                                    value={formData.state}
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                                                    placeholder=" "
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label
                                                    htmlFor="state"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                                                >
                                                    State
                                                </label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input
                                                    type="text"
                                                    name="zipCode"
                                                    id="zipCode"
                                                    value={formData.zipCode}
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                                                    placeholder=" "
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label
                                                    htmlFor="zipCode"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                                                >
                                                    Zip Code
                                                </label>
                                            </div>
                                            <div className="relative z-0 w-full mb-5 group">
                                                <input
                                                    type="text"
                                                    name="phoneNumber"
                                                    id="phoneNumber"
                                                    value={formData.phoneNumber}
                                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-400 peer"
                                                    placeholder=" "
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label
                                                    htmlFor="phoneNumber"
                                                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
                                                >
                                                    Phone Number
                                                </label>
                                            </div>
                                            {apiError && (
                                                <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
                                                    {`${apiError.errorMessage}`}
                                                    {apiError.errors.length >
                                                        0 && (
                                                        <ul>
                                                            {apiError.errors.map(
                                                                (
                                                                    err,
                                                                    index,
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {err}
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    )}
                                                </div>
                                            )}
                                            <button
                                                type="submit"
                                                className="w-full text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                            >
                                                Submit Request
                                            </button>
                                        </form>
                                        <div className="p-2 mt-2 text-sm text-gray-300 dark:text-gray-700 cursor-default select-none">
                                            <span className="mr-1 text-red-600">
                                                *
                                            </span>
                                            Terms and Conditions apply
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                )}
            </div>
            {showOverlay && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 bg-gray-700 dark:bg-black">
                    <div className="bg-white dark:bg-gray-800 p-6 md:p-8 lg:p-10 rounded-lg shadow-lg text-center max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                        <h2 className="text-xl md:text-2xl font-bold mb-4">
                            Thank you!
                        </h2>
                        <p className="text-base md:text-lg">
                            We will contact you soon regarding your pet adoption
                            request.
                        </p>
                        <p className="text-base md:text-lg mt-4">
                            Redirecting to products page in {countdown}{" "}
                            seconds...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
export default PetAdoptionForm;
