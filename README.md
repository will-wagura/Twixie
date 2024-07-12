# Full Stack Application - Twixie

## Introduction
Twixie is a full-stack application built with a Flask backend and a React frontend. The application allows users to register, log in, create posts, view posts, and interact with other users. This project showcases the integration of both backend and frontend technologies to create a seamless user experience.

## Features
- User authentication (register, login, logout)
- Create, read, and display posts
- View user profiles and their posts
- Responsive design using React and Flask
- Secure session management with cookies

## Requirements
- Python 3.x
- Node.js
- npm (Node Package Manager)
- Flask
- React

## Installation

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/will-wagura/Twixie.git --depth 1
    cd Twixie
    ```

2. Create and activate a virtual environment:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```

4. Set up the database:
    ```bash
    flask db init
    flask db migrate
    flask db upgrade
    ```

### Frontend Setup
1. Navigate to the `client` directory:
    ```bash
    cd client
    ```

2. Install the required npm packages:
    ```bash
    npm install
    ```

## Running the Application

### Running the Backend
1. Make sure you are in the root directory of the project.
2. Start the Flask server:
    ```bash
    flask run
    ```

### Running the Frontend
1. Navigate to the `client` directory:
    ```bash
    cd client
    ```

2. Start the React development server:
    ```bash
    npm start
    ```

3. Open your browser and go to `http://localhost:3000` to view the application.

## Models and Relationships
The application includes the following models:

- **User**: Represents a user in the system.
- **Post**: Represents a post created by a user.
- **Comment**: Represents a comment on a post.

### Relationships:
- **User -< Post**: A user can have many posts.
- **User -< Comment**: A user can have many comments.
- **Post -< Comment**: A post can have many comments.

## Frontend Routes
The application includes the following client-side routes using React Router:

- `/`: Home page showing posts and user details.
- `/login`: Login page.
- `/register`: Registration page.
- `/users/:userId`: User profile page showing user details and their posts.

## Contributors
- **Stephy Kamau** - [GitHub](https://github.com/KWSTEPHY)
- **William Ndirangu** - [GitHub](https://github.com/will-wagura)
- **Abdulbarik Mohamed** - [GitHub](https://github.com/Abdulbariky)
- **Joseph Wanini** - [GitHub](https://github.com/wathika-eng)
- **Victor Gachure** - [GitHub](https://github.com/Gachure)


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
