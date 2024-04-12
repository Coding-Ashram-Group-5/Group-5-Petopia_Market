import { ReactNode } from 'react';
import { Navigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";
import api from "../../utils/api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../utils/constants";
import { useState, useEffect } from "react";

function SecuredRoute({ children }: { children: ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        const auth = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                setIsAuthorized(false);
                return;
            }
            const decoded: JwtPayload | undefined = jwtDecode(token); // Define decoded as JwtPayload or undefined
            if (!decoded || typeof decoded.exp !== 'number') { // Check if decoded or decoded.exp is undefined
                setIsAuthorized(false);
                return;
            }
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        };

        auth().catch(() => setIsAuthorized(false));

    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/v1/users/refresh/token", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default SecuredRoute;
