import { Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import api from "../../utils/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../utils/constants";
import { useState, useEffect, ReactNode, useCallback } from "react";

interface Props {
    children: ReactNode;
}

function SecuredRoute({ children }: Props) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            console.error("No refresh token available.");
            setIsAuthorized(false);
            return;
        }

        try {
            const res = await api.get("/api/v1/users/refresh/token", {
                headers: {
                    'Authorization': `Bearer ${refreshToken}`
                }
            });

            if (res.status === 200 && res.data && res.data.access) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                console.log("Access token updated:", res.data.access);
                setIsAuthorized(true);
            } else {
                console.error("Failed to refresh token, status:", res.status);
                setIsAuthorized(false);
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            setIsAuthorized(false);
        }
    };

    const auth = useCallback(async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        try {
            const decoded: { exp: number } = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        } catch (error) {
            console.log("Error decoding token: ", error);
            setIsAuthorized(false);
        }
    }, []); // Add any dependencies used by auth here

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, [auth]); // auth is now a dependency

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/home" />;
}

export default SecuredRoute;
