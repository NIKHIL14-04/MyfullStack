// src/Form.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmpass: string;
  phonenumber: string;
  address: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmpass: Yup.string().oneOf([Yup.ref('password')], "Passwords must match").required("Confirm password is required"),
  phonenumber: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Address is required")
});
const NikhilForm: React.FC = () => {
  const navigate = useNavigate()

  const formik = useFormik<IFormInput>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmpass: '',
      phonenumber: '',
      address: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values,"values")
      try {
        const response = await axios.post('http://localhost:5000/save', values);
        console.log(response.data.
          message
          );
        resetForm();
        navigate('/login')
        
      } catch (error) {
        console.error(error);
      }
      setSubmitting(false);
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
      </div>
      <div>
        <label htmlFor="confirmpass">Confirm Password</label>
        <input
          id="confirmpass"
          name="confirmpass"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmpass}
        />
        {formik.touched.confirmpass && formik.errors.confirmpass ? <div>{formik.errors.confirmpass}</div> : null}
      </div>
      <div>
        <label htmlFor="phonenumber">Phone Number</label>
        <input
          id="phonenumber"
          name="phonenumber"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phonenumber}
        />
        {formik.touched.phonenumber && formik.errors.phonenumber ? <div>{formik.errors.phonenumber}</div> : null}
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
        />
        {formik.touched.address && formik.errors.address ? <div>{formik.errors.address}</div> : null}
      </div>
      <button type="submit" disabled={formik.isSubmitting}>Submit</button>
    </form>
  );
};

export default NikhilForm;




