import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import LoadingIndicator from "./LoadingIndicator";

interface Props {
    route: string;
    method: "login" | "register";
}

function Form({ route, method }: Props) {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();

        // Include lastName in the data object for registration if provided
        const userData = method === "register" ? { email, firstName, lastName, password } : { email, password };

        try {
            const res = await api.post(route, userData);
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/home", { replace: true });
            } else {
                navigate("/login");
            }
        } catch (err) {
            alert(err || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
<form onSubmit={handleSubmit} className="max-w-sm w-full mx-auto shadow-lg rounded-lg p-8 mb-8">
    <h1 className="text-2xl font-bold mb-6">{name}</h1>
    <div className="space-y-4">
        <input
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
        />
        {method === "register" && (
            <>
                <input
                    className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                />
                <input
                    className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name (Optional)"
                />
            </>
        )}
        <input
            className="block w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
    </div>
    {loading && <LoadingIndicator />}
    <button className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200 ease-in-out" type="submit">
        {name}
    </button>
</form>

    );
}

export default Form;
