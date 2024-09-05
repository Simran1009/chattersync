import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const setUser = async () => {
      const userData = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setUserName(userData?.username || "User");
    };
    setUser();
  }, []);

  return (
    <Container>
      <Title>
        Welcome, <span>{userName}!</span>
      </Title>
      <Subtitle>Select a chat to start chatting.</Subtitle>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  background: linear-gradient(135deg, #131324, #080420);
  height: 100vh;
  text-align: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  margin: 1rem 0;
  font-size: 2.5rem;
  font-weight: bold;
  color: #ffffff;

  span {
    color: #4e0eff;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% {
      color: #4e0eff;
    }
    50% {
      color: #9a86f3;
    }
    100% {
      color: #4e0eff;
    }
  }
`;

const Subtitle = styled.h3`
  font-size: 1.2rem;
  margin-top: 0;
  font-weight: 300;
`;
