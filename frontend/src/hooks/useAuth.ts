// import { useState, useEffect } from "react";
// import { ACCESS_TOKEN } from "../components/utils/constants";
// import { jwtDecode } from 'jwt-decode';

// // Define an interface for the expected JWT payload
// interface JwtPayload {
//     exp?: number; // The `exp` field might be optional
//     // include other fields you might expect to use
// }

// const useAuth = () => {
//     const [isAuthorized, setIsAuthorized] = useState(false);

//     useEffect(() => {
//         const checkAuth = () => {
//             const accessToken = localStorage.getItem(ACCESS_TOKEN);
//             if (!accessToken) {
//                 setIsAuthorized(false);
//                 return;
//             }

//             try {
//                 const decoded = jwtDecode<JwtPayload>(accessToken); // Use the generic to enforce the expected type
//                 if (decoded.exp && Date.now() / 1000 < decoded.exp) {
//                     setIsAuthorized(true);
//                 } else {
//                     setIsAuthorized(false);
//                 }
//             } catch (error) {
//                 // Handle possible errors in decoding JWT
//                 console.error("Error decoding token:", error);
//                 setIsAuthorized(false);
//             }
//         };

//         checkAuth();
//     }, []);

//     return isAuthorized;
// };

// export default useAuth;
