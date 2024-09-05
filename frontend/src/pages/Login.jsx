import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import useNotification from "../hooks/useNotification"
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const notify = useNotification()

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      notify('Error', "Email/Useranme is required.", 'danger')

      return false;
    } else if (password === "") {
      notify('Error', " Password is required.", 'danger')
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const response = await axios.post(loginRoute, {
        username,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(response.data.user)
        );
        notify('Info', `${response.data.info}`, 'info')
        navigate("/");
      }
      else {
        notify('Error', `${response.data.warn}`, 'danger')
      }
    };
  }

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1e1e2f, #2c2c54);

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
       height: 100px;
    }
    h1 {
      color: #ffffff;
      text-transform: uppercase;
      font-size: 2rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #2a2a40;
    border-radius: 12px;
    padding: 4rem;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
  }

  input {
    background-color: #1f1f33;
    padding: 1rem;
    border: 1px solid #7289da;
    border-radius: 8px;
    color: #ffffff;
    width: 100%;
    font-size: 1rem;
    transition: border-color 0.3s ease-in-out;

    &:focus {
      border-color: #4e6cd9;
      outline: none;
    }
  }

  button {
    background-color: #4e6cd9;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 8px;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: #3a4fb2;
    }
  }

  span {
    color: #ffffff;
    text-transform: uppercase;
    font-size: 0.875rem;
    a {
      color: #7289da;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
