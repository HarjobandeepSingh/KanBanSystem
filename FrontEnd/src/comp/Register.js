import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import "../form.css";

export default function Register() {
const url = 'http://localhost:1000/';
  const [formData, setFormData] = useState({
    uname: "",
    email: "",
    mobileno: "",
    pass: "",
    cpass: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.uname) {
      newErrors.uname = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.mobileno) {
      newErrors.mobileno = "Mobile No. is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobileno)) {
      newErrors.mobileno = "Mobile No. is invalid";
    }

    if (!formData.pass) {
      newErrors.pass = "Password is required";
    }

    if (!formData.cpass) {
      newErrors.cpass = "Confirm Password is required";
    } else if (formData.pass !== formData.cpass) {
      newErrors.cpass = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      axios
        .post(url+"AddUser", formData) // Send a POST request to your backend route
        .then((response) => {
          console.log("Registration successful", response);
          // Optionally, you can redirect the user to a different page upon successful registration.
        })
        .catch((error) => {
          console.error("Registration failed", error);
        });
    }
  };

  return (
    <>
      <div className="Mform">
        <form onSubmit={handleSubmit}>
          <h1>Register Here</h1>
          <label>Name</label>
          <input
            type="text"
            placeholder="john"
            name="uname"
            onChange={handleChange}
          />
          {errors.uname && <div className="error">{errors.uname}</div>}
          <label>Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            name="email"
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
          <label>Mobile No.</label>
          <input
            type="tel"
            placeholder="1234567890"
            name="mobileno"
            onChange={handleChange}
          />
          {errors.mobileno && <div className="error">{errors.mobileno}</div>}
          <label>Password</label>
          <input
            type="password"
            name="pass"
            onChange={handleChange}
          />
          {errors.pass && <div className="error">{errors.pass}</div>}
          <label>Confirm Password</label>
          <input
            type="password"
            name="cpass"
            onChange={handleChange}
          />
          {errors.cpass && <div className="error">{errors.cpass}</div>}
          <input type="submit" name="submit" value={"Submit"} />
          <span>
            if you already Registered then <Link to={"/Login"}>Login here.</Link>
          </span>
        </form>
      </div>
    </>
  );
}
