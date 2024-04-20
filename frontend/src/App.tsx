import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="no-scrollbar overflow-hidden mx-auto max-w-screen-xl " >
           
             <Navbar />
            <Outlet />
           
        </div>
    );
}

export default App;
