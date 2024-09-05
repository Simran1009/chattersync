import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Buffer } from "buffer";
// import loader from "../assets/loading.gif";
import useNotification from "../hooks/useNotification";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "../utils/APIRoutes";

export default function SetAvatar() {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const notify = useNotification();

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      notify('Error', "Please select an avatar", 'danger');
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        notify('Error', 'Error setting avatar. Please try again.', 'danger');
      }
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = Buffer.from(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchAvatars();
  }, [api]);

  return (
    <Container>
      {isLoading ? (
        <div className="loader-container">
          <span>loading...</span>
        </div>
      ) : (
        <>
          <div className="title-container">
            <h1>Select Your Avatar</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                onClick={() => setSelectedAvatar(index)}
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt={`Avatar ${index}`}
                />
              </div>
            ))}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  gap: 3rem;

  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }

  .loader {
    width: 3rem;
    height: 3rem;
  }

  .title-container {
    text-align: center;
    h1 {
      color: white;
      font-size: 1.8rem;
      @media (max-width: 600px) {
        font-size: 1.5rem;
      }
    }
  }

  .avatars {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 600px) {
      gap: 0.5rem;
    }

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: border 0.3s ease;
      cursor: pointer;

      img {
        height: 6rem;
        border-radius: 50%;
        object-fit: cover;
      }

      &.selected {
        border-color: #4e0eff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3a00e0;
    }

    &:active {
      background-color: #2a00b5;
    }
  }
`;
