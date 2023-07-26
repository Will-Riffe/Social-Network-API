# Social Network API

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Tools Used](#tools-used)
4. [API Endpoints](#api-endpoints)
5. [Usage](#usage)
6. [Installation](#installation)
7. [Contribution](#contribution)
8. [License](#license)
9. [Credits](#credits)

## Overview

This API is a backend project which provides a RESTful API for social network sites. The Social Network API is built using Node.js, Express.js, and MongoDB with the Mongoose library for a non-relational database. The API lets users interact on the social network by exploring friendships, sharing thoughts, and reacting to other users' thoughts.

## Features

- **User Management**: Create, read, update, and delete user accounts.
- **Friend Management**: Add or remove friends from a user's friend list.
- **Thought Management**: Post thoughts, read thoughts, and delete thoughts.
- **Reaction Management**: Add reactions to other users' thoughts.

## Tools Used

- Node.js: A server-side JavaScript runtime environment for executing JavaScript code.
- Express.js: A web application framework for Node.js, providing various features for building APIs.
- MongoDB: A NoSQL database used for storing user data, thoughts, and reactions.
- Mongoose: A MongoDB object modeling library for Node.js, providing a schema-based solution to model application data.

## API Endpoints

The best example of how to use the below endpoints will be in [this walkthrough video](https://clipchamp.com/watch/ZwxW0CQTkk3)

The API provides the following endpoints:

- `GET /api/users`: Fetch all users.
- `GET /api/users/:userId`: Fetch a single user by their ID.
- `POST /api/users`: Create a new user.
- `PUT /api/users/:userId`: Update a user's details.
- `DELETE /api/users/:userId`: Delete a user and associated data.

- `POST /api/users/:userId/friends/:friendId`: Add a friend to a user's friend list.
- `DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.

- `GET /api/thoughts`: Fetch all thoughts.
- `GET /api/thoughts/:thoughtId`: Fetch a single thought by its ID.
- `POST /api/thoughts`: Create a new thought.
- `PUT /api/thoughts/:thoughtId`: Update a thought.
- `DELETE /api/thoughts/:thoughtId`: Delete a thought and associated data.

- `POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought.
- `DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Delete a reaction from a thought.


## Usage

To use this Social Network API, make HTTP requests to the specified endpoints using tools such as [Insomnia](https://insomnia.rest/), or [Postman](https://www.postman.com/product/api-client/). The API supports standard CRUD (Create, Read, Update, Delete) operations for users, thoughts, friends, and reactions. 

## Installation

1. Clone the repository: `git clone https://github.com/your-username/social-network-api.git`
2. Install dependencies: `npm install`
3. Set up your MongoDB database and update the connection string in the configuration file.
4. Start the server: `npm start`

## Contribution

Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/your-username/social-network-api/blob/main/LICENSE) file for details.

## Credits

This API is created by [Will Riffe](https://github.com/Will-Riffe). Special thanks to the developers of Node.js, Express.js, and Mongoose for their excellent tools. Further thanks to other students of the EdX program who've worked on similar applications. Though I've done my best to make this my own creation, I also drew inspiration from the following users: [Brandon Whitman](https://github.com/Bwhitman33/Api-for-Social-Network), [Christian McIlvenny](https://github.com/TDGNate/Social-Network-API/blob/main/README.md), [Daniel Kang](https://github.com/DKhubgit/Social-Network-API/tree/main), and [Muhammad Moghal](https://github.com/mmoghal/Social-Network-API/blob/main/README.md)