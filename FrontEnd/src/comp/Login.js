import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../form.css";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const url = "http://localhost:1000/";
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post(url + "Login", formData) 
      .then((response) => {
        if (response.data) {
          console.log("Login successful", response.data);

          setIsAuthenticated(true);
          setUser(response.data);
          navigate("/dashboard");
        } else {
          console.error("Login failed");
          setErrors({
            login: "Login failed. Please check your credentials.",
          });
        }
      })
      .catch((error) => {
        console.error("Login failed", error);
      });
  };

  return (
    <>
      <div className="Mform">
        <form onSubmit={handleLogin}>
          <h1>Login Here</h1>
          <label>Enter Email</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            name="email"
            onChange={handleChange}
          />
          <label>Enter Password</label>
          <input type="password" name="pass" onChange={handleChange} />
          {errors.login && <div className="error">{errors.login}</div>}
          <input type="submit" name="submit" value="Submit" />
          <span>
            If you are not registered, then{" "}
            <Link to={"/Register"}>Register here.</Link>
          </span>
        </form>
      </div>
    </>
  );
}
