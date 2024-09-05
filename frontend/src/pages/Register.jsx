import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import useNotification from "../hooks/useNotification";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const notify = useNotification();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      notify("Error", "Password and confirm password should be the same.", "danger");
      return false;
    } else if (username.length < 3) {
      notify("Error", "Username should be greater than 3 characters.", "danger");
      return false;
    } else if (password.length < 8) {
      notify("Error", "Password should be equal to or greater than 8 characters.", "danger");
      return false;
    } else if (email === "") {
      notify("Error", "Email is required.", "danger");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const response = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(response.data.user)
        );
        navigate("/");
      } else {
        notify("Error", `${response.data.warn}`, "info");
      }
    }
  };

  return (
    <>
      <StyledContainer>
        <form onSubmit={handleSubmit}>
          <div className="brand">
            <img src={Logo} alt="logo" />
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>.
          </span>
        </form>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e1e2f, #2c2c54);

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #2a2a40;
    border-radius: 12px;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
  }

  .brand {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;

    img {
      height: 100px;
    }

    h1 {
      margin-left: 1rem;
      color: #ffffff;
      font-size: 2rem;
      text-transform: uppercase;
    }
  }

  input {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1.5rem;
    border-radius: 8px;
    border: 1px solid #7289da;
    background-color: #1f1f33;
    color: #ffffff;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease-in-out;

    &:focus {
      border-color: #4e6cd9;
    }
  }

  button {
    width: 100%;
    padding: 0.75rem;
    border-radius: 8px;
    border: none;
    background-color: #4e6cd9;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #3a4fb2;
    }
  }

  span {
    margin-top: 1rem;
    color: #ffffff;
    font-size: 0.875rem;

    a {
      color: #7289da;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

