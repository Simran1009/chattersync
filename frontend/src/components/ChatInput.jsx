import React, { useState } from "react";
import { IoMdSend, IoMdAdd } from "react-icons/io";
import styled from "styled-components";

export default function ChatInput({ handleSendMsg, socket }) {
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0 || file) {
      handleSendMsg(msg, file);
      setMsg("");
      setFile(null);
      setFileName(null);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  return (
    <Container>
      <div className="input-wrapper">
        <form className="input-container" onSubmit={(event) => sendChat(event)}>
          <div className="file-container">
            <label htmlFor="file-upload">
              <IoMdAdd size={24} color="#4e0eff" />
            </label>
            <input id="file-upload" type="file" onChange={handleFileChange} />
            {fileName && <p className="file-name">{fileName}</p>}
          </div>
          <div className="text-container">
            <input
              type="text"
              placeholder="Type your message here"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
            />
          </div>
          <button type="submit">
            <IoMdSend />
          </button>
        </form>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #131324;
  padding: 1rem 2rem;

  @media screen and (min-width: 720px) {
    flex-direction: row;
    padding: 1rem;
  }

  .input-wrapper {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
  }

  .input-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    width: 100%;
    max-width: 800px;

    @media screen and (min-width: 720px) {
      flex-direction: row;
    }
  }

  .file-container {
    display: flex;
    align-items: center;
    margin-right: 1rem;

    .file-name {
      color: white;
      margin: 1px;
    }

    label {
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    input[type='file'] {
      display: none;
    }
  }

  .text-container {
    flex: 1;
    display: flex;
    align-items: center;

    input[type='text'] {
      flex: 1;
      background-color: transparent;
      color: white;
      border: 1px solid #4e0eff;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      border-radius: 2rem;
      width: 100%;

      &::selection {
        background-color: #4e0eff;
      }

      &:focus {
        outline: none;
      }
    }
  }

  button {
    background-color: #4e0eff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;

    svg {
      font-size: 1.5rem;
    }

    &:hover {
      background-color: #3a00e0;
    }
  }
`;
