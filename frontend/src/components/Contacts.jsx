import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { FaTimes, FaAngleDown } from "react-icons/fa";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [isContactsVisible, setIsContactsVisible] = useState(true); // State for contacts visibility

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      if (data) {
        setCurrentUserName(data.username);
        setCurrentUserImage(data.avatarImage);
      }
    };

    fetchUserData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <Container>
      <div className="brand">
        <img src={Logo} alt="logo" />
        <ToggleButton onClick={() => setIsContactsVisible(!isContactsVisible)}>
          {isContactsVisible ? <FaTimes /> : <FaAngleDown />}
        </ToggleButton>
      </div>
      {isContactsVisible && (
        <div className="contacts">
          {contacts.map((contact, index) => (
            <div
              key={contact._id}
              className={`contact ${
                index === currentSelected ? "selected" : ""
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{contact.username}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="current-user">
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${currentUserImage}`}
            alt="avatar"
          />
        </div>
        <div className="username">
          <h2>{currentUserName}</h2>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
  overflow: hidden;
  background-color: #0a0f27;
  border-left: 1px solid #333;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    padding: 1rem;
    background-color: #0d0d30;
    position: relative;
    
    img {
      height: 6rem;
    }
    h3 {
      color: #ffffff;
      text-transform: uppercase;
      margin: 0;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 0.8rem;
    padding: 1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39; 
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #181c3a;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.5rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
          width: 3rem;
          border-radius: 50%;
          object-fit: cover;
        }
      }
      .username {
        h3 {
          color: #ffffff;
          margin: 0;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
    .avatar {
      img {
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .username {
      h2 {
        color: #ffffff;
        margin: 0;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 1rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

const ToggleButton = styled.button`
  background: transparent;
  border: none;
  color: #ffffff;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 1.5rem;
`;
