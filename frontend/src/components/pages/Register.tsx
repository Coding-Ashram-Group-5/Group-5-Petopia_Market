import Form from "../Form/Form"
import { Link } from 'react-router-dom';

function Register() {
    return (
        <div>
        <Form route="/api/v1/users/signup" method="register" />
        <p className="text-center mt-4">Already have an account?
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Sign in
            </Link>
            </p>
        </div>
    )
}

export default Register