import * as Yup from "yup";

/* Validation rules for the registration form. */
export const registerSchema = Yup.object({
  name: Yup.string().trim().required("Name is required."),
  email: Yup.string()
    .trim()
    .email("Enter a valid email address.")
    .required("Email is required."),
  username: Yup.string()
    .trim()
    .min(3, "At least 3 characters.")
    .required("Username is required."),
  password: Yup.string()
    .min(8, "At least 8 characters.")
    .required("Password is required."),
});

/* Validation rules for the login form. */
export const loginSchema = Yup.object({
  username: Yup.string().trim().required("Username is required."),
  password: Yup.string().required("Password is required."),
});
