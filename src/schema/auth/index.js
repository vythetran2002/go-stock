import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password must be at most 15 characters long"),
});

export const RegisterSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  name: yup.string().required("Name is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(15, "Password must be at most 15 characters long"),

  confirmPassword: yup.string().required("Confirm Password is required"),
});
