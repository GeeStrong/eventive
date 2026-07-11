import { Formik } from "formik";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { loginSchema } from "../utils/validationSchemas";

const initialValues = { username: "", password: "" };

/* Login page: Formik manages the form, Yup validates it. */
function Login() {
  const { login } = useApp();
  const navigate = useNavigate();

  function handleSubmit(values, { setSubmitting, setStatus }) {
    const result = login(values);
    if (!result.success) {
      setStatus(result.error);
      setSubmitting(false);
      return;
    }
    navigate("/dashboard");
  }

  return (
    <div className="auth-page">
      <Card className="auth-card mx-auto">
        <Card.Body className="p-4">
          <h1 className="h3 mb-3">Log in</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              status,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit: submitForm,
            }) => (
              <Form noValidate onSubmit={submitForm}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && Boolean(errors.username)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && Boolean(errors.password)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                {status && <Alert variant="danger">{status}</Alert>}

                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  disabled={isSubmitting}
                >
                  Log in
                </Button>
              </Form>
            )}
          </Formik>

          <p className="text-center mt-3 mb-0">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
