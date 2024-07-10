import { Outlet } from "react-router-dom";
import Navbar from "@/Pages/LandingPage/Nav/Navbar";
import { Toaster } from "@/components/Ui/toaster"
import useInitializeUser from "@/hooks/useInitializeUser";


const App: React.FC = () => {
    useInitializeUser();

    return (
        <div className="no-scrollbar overflow-hidden mx-auto max-w-screen-xl ">
            <Navbar />
            <Outlet />
            <Toaster />
        </div>
    );
}

export default App;