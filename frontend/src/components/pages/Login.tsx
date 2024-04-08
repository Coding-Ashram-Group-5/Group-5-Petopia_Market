import Form from "../Form/Form"

function Login() {
    return <Form route="/api/token/" method="login" />
}

export default Login