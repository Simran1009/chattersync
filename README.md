# Chattersync

Welcome to the Chattersync! This is a real-time chat application built with React.js. Below you'll find instructions on how to set up and run the application.

## Environment Configuration

To configure the environment variables, create a `.env` file in the root directory of your project and add the following key-value pairs:

### /frontend

```dotenv
FAST_REFRESH = false
BROWSER = none

REACT_APP_LOCALHOST_KEY = "chat-app-current-user"
REACT_APP_NODEJS_BACKEND_URL = "http://localhost:8000"
```

### /backend

```dotenv
PORT = 8000
MONGO_URL = ""
```

### Installation

## Starting the Backend Server

To install the necessary dependencies, run:

```bash
npm install
```

### Start the Server

To start the development server, use:

```bash
npm run dev
```

## Starting the Frontend Server (React)

To install the necessary dependencies, run:

```bash
npm install
```

### Start the Frontend

To start the development server, use:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser to view the application.
