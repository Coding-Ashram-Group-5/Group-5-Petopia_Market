<<<<<<< HEAD:frontend/src/components/pages/NotFound.tsx
import bg404 from "@/assets/night404.gif"

function NotFound() {
    return <div>
        <img src={bg404}  className=" rounded-lg my-3 border-4"   alt="" />
=======
import Navbar from "./Ui/LandingPage/Nav/Navbar"

function NotFound() {
    return <div>
        <Navbar />
        <h1>404 Not Found</h1>
        <p>The page you're looking for doesn't exist!</p>
>>>>>>> origin/main:frontend/src/components/NotFound.tsx
    </div>
}

export default NotFound