import * as Yup from 'yup'

// Signup Schema
export const signupSchema = Yup.object({
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    mobile: Yup.string().required()
});

// Signin Schema
export const signinSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
});

