import { Formik } from "formik";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useApp } from "../context/AppContext";
import { registerSchema } from "../utils/validationSchemas";

const initialValues = { name: "", email: "", username: "", password: "" };

/* Registration page: Formik manages the form, Yup validates it. */
function Register() {
  const { register } = useApp();
  const navigate = useNavigate();

  function handleSubmit(values, { setSubmitting, setStatus }) {
    const result = register(values);
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
          <h1 className="h3 mb-3">Create your account</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={registerSchema}
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
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Full name</Form.Label>
                  <Form.Control
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && Boolean(errors.name)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && Boolean(errors.email)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

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
                  Create account
                </Button>
              </Form>
            )}
          </Formik>

          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
