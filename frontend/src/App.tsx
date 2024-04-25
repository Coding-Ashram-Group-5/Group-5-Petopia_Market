import { Outlet } from "react-router-dom";
function App() {
    return (
        <div className="no-scrollbar overflow-hidden mx-auto max-w-screen-xl ">
            <Outlet />
        </div>
    );
}

export default App;
