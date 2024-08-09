import React from 'react'
import { useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'


interface login {
    email:string,
    password:string
}

const validationSchema = yup.object().shape({
    email : yup.string().email().required("plz enter your email"),
    password : yup.string().min(6).max(8).required("plz enter your password ")
})



const Login :React.FC=()=> {

const {values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik<login>({
    initialValues:{
        email:"",
        password:""
    },
    validationSchema,
    onSubmit:(async(values,{resetForm,setSubmitting})=>{
    //  console.log(values)
    //  resetForm()
    try {
        const logindata = await axios.post('http://localhost:5000/Login',values)
        console.log(logindata.data)
             resetForm()

    } catch (error) {
        console.error(error);

    }
    setSubmitting(false)
    })
})

  return (
    <>
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor='email'>Email</label>
            <input
            id='email'
            type='text'
            name='email'
            placeholder='enter ypur email address'
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            ></input>
            {errors.email && touched.email ? <div>{errors.email}</div>:null}
             <br/>

            <label htmlFor='password'>password</label>
            <input
            id='password'
            type='text'
            name='password'
            placeholder='enter ypur email address'
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            ></input>
            {errors.password && touched.password ? <div>{errors.password}</div>:null}

            <br></br>
            <button type="submit">Submit</button>
        </div>
    </form>
    </>
  )
}

export default Login