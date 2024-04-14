import Form from "../Form/Form";
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div>
            <Form route="/api/v1/users/signin" method="login" />
            <p className="text-center mt-4">Don't have an account?
                <Link to="/register" className="text-blue-500 hover:text-blue-700">
                    Back to Sign Up
                </Link>
                </p>
        </div>
    );
}

export default Login;
