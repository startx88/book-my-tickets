import React from 'react'
import Link from 'next/link'
import Input from '../../ui/Input'
import { useFormik } from 'formik'
import { signupSchema } from './Schema'
import FormGroup from '../../ui/FormGroup'
import Button from '../../ui/Button'
import Axios from 'axios'

export default (props) => {
    const formik = useFormik({
        initialValues: ({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            mobile: ""
        }),

        validationSchema: signupSchema,
        onSubmit: async (value) => {
            try {
                const response = await Axios.post('/api/users/signup', value);
                console.log(response)
            } catch (err) {
                console.log('error', err)
            }
        }
    });

    const { values, errors, touched, setFieldValue, handleSubmit, handleBlur } = formik;



    return (
        <div className="auth">
            <form onSubmit={handleSubmit} className="auth-form needs-validation">
                <div className="auth-title">
                    <h1>Signup</h1>
                    <p>If you have an account, Please click  on <Link href="/auth/signin"><a>Login</a></Link></p>

                </div>
                <div className="auth-body">
                    <Input
                        inputType="input"
                        type="text"
                        name="firstname"
                        value={values.firstname}
                        setFieldValue={setFieldValue}
                        blur={handleBlur}
                        errors={errors}
                        touched={touched}
                    />
                    <Input
                        inputType="input"
                        type="text"
                        name="lastname"
                        value={values.lastname}
                        setFieldValue={setFieldValue}
                        blur={handleBlur}
                        errors={errors}
                        touched={touched}
                    />
                    <Input
                        inputType="input"

                        type="text"
                        name="email"
                        value={values.email}
                        setFieldValue={setFieldValue}
                        blur={handleBlur}
                        errors={errors}
                        touched={touched}
                    />
                    <Input
                        inputType="input"
                        type="text"
                        name="password"
                        value={values.password}
                        setFieldValue={setFieldValue}
                        blur={handleBlur}
                        errors={errors}
                        touched={touched}
                    />
                    <Input
                        inputType="input"
                        type="text"
                        name="mobile"
                        value={values.mobile}
                        setFieldValue={setFieldValue}
                        blur={handleBlur}
                        errors={errors}
                        touched={touched}
                    />

                    <FormGroup>
                        <Button type="submit" btnType="info">SIGNUP</Button>
                    </FormGroup>

                </div>
            </form>
        </div>
    )
}