import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "@/components/ui/sonner"

function App() {
    return (
        <div className="no-scrollbar overflow-hidden mx-auto max-w-screen-xl " >

             <Navbar />
            <Outlet />
            <Toaster className="shadow-xl"   position="bottom-left" />
        </div>
    );
}

export default App;
