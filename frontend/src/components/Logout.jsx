import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();
  
  const handleClick = async () => {
    try {
      const id = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;
      const response = await axios.get(`${logoutRoute}/${id}`);
      if (response.status === 200) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #4e0eff; /* Use your main theme color */
  border: 1px solid #ffffff; /* Optional: border for better visibility */
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Optional: subtle shadow */
  svg {
    font-size: 1.3rem;
    color: #ffffff; /* Color to match with button background */
  }
  
  &:hover {
    background-color: #3a00e0; /* Darker shade on hover */
  }

  &:active {
    background-color: #2a00b5; /* Even darker shade on active */
  }
`;
