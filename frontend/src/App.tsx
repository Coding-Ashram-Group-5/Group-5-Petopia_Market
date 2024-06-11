import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Ui/LandingPage/Nav/Navbar";
import { relogin } from "./lib/api";
import usePersonStore from "./lib/Utils/zustandStore";

function App() {
    const refreshToken = Cookies.get("refreshToken");
    const updatePerson = usePersonStore((state) => state.updatePerson);

    if (refreshToken) {
        relogin().then((userData) => {
            if (userData?.data) {
                const { _id, firstName, lastName, email, avatar } = userData.data;
                if (_id && firstName && lastName && email && avatar) {
                    updatePerson(_id, firstName, lastName, email, avatar);
                }
            }
        });
    }

    return (
        <div className="no-scrollbar overflow-hidden mx-auto max-w-screen-xl ">
            <Navbar />
            <Outlet />
        </div>
    );
}

export default App;
