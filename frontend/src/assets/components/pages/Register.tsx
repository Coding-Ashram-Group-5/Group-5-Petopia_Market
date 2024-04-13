import Form from "../Form/Form"

function Register() {
    return <Form route="/api/v1/users/signup" method="register" />
}

export default Register