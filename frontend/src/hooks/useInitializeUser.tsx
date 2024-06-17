import { useEffect } from "react";
import { relogin } from "@/lib/api";
import usePersonStore from "@/lib/Utils/zustandStore";

const useInitializeUser = () => {
    const updatePerson = usePersonStore((state) => state.updatePerson);

    useEffect(() => {
        const initializeUser = async () => {
            try {
                const userData = await relogin();
                if (userData?.data) {
                    const { _id, firstName, lastName, email, avatar } = userData.data;
                    if (_id && firstName && lastName && email && avatar) {
                        updatePerson(_id, firstName, lastName, email, avatar);
                    }
                }
            } catch (error) {
                console.error("Re-login error:", error);
            }
        };

        initializeUser();
    }, [updatePerson]);
};

export default useInitializeUser;
