import Form from "../Form/Form"

function Login() {
    return <Form route="/api/v1/users/signin" method="login" />

}

export default Login