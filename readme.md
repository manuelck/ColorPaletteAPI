# 🎨 Color Palette API

Welcome to the **Color Palette API**! This project is a RESTful API built with **Node.js**, **Express**, and **MongoDB Atlas**. It allows users to create, view, update, and delete color palettes, with role-based access control for managing user permissions.

## 🚀 Features

- **User Registration and Login**: Create users with different roles (admin and user).
- **Role-Based Access Control**: Different permissions for users and admins.
- **CRUD Operations**: Create, read, update, and delete color palettes.
- **MongoDB Integration**: Data persistence using MongoDB Atlas.
- **Seed Data**: Prepopulate the database with initial color palette data.

## 📦 Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express**: Web framework for building APIs.
- **MongoDB Atlas**: Cloud-based NoSQL database.
- **Mongoose**: ODM for MongoDB and Node.js.
- **jsonwebtoken**: For user authentication via JWT.
- **dotenv**: To manage environment variables.

## 🔧 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/manuelck/ColorPaletteAPI
   cd color-palette-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory with the following content:

   ```plaintext
   DB_URL=your_mongodb_connection_string
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```

   Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string and set a secret for JWT.

4. **Run the application**:

   ```bash
   npm start
   ```

   The server will run at `http://localhost:3000`.

## 📚 API Endpoints

### Authentication

- **POST** `/api/v1/auth/register`
  - Register a new user.
  - **Body**: `{ "username": "string", "password": "string" }`
  
- **POST** `/api/v1/auth/login`
  - Log in an existing user.
  - **Body**: `{ "username": "string", "password": "string" }`

### User Management

- **GET** `/api/v1/users/:id`
  - Get user details by ID.
  - **Headers**: `Authorization: Bearer <token>`

- **PUT** `/api/v1/users/:id`
  - Update user information (admin can change roles).
  - **Headers**: `Authorization: Bearer <token>`
  - **Body**: `{ "username": "string", "role": "string" }`

- **DELETE** `/api/v1/users/:id`
  - Delete a user (admins can delete any user; users can delete themselves).
  - **Headers**: `Authorization: Bearer <token>`

### Color Palette Management

- **GET** `/api/v1/palettes`
  - Get all public color palettes.
  
- **POST** `/api/v1/palettes`
  - Create a new color palette.
  - **Headers**: `Authorization: Bearer <token>`
  - **Body**: `{ "name": "string", "colors": ["#hexcolor", "#hexcolor"], "public": true/false }`

- **GET** `/api/v1/palettes/:id`
  - Get a specific color palette by ID.
  
- **PUT** `/api/v1/palettes/:id`
  - Update an existing color palette.
  - **Headers**: `Authorization: Bearer <token>`
  - **Body**: `{ "name": "string", "colors": ["#hexcolor", "#hexcolor"], "public": true/false }`

- **DELETE** `/api/v1/palettes/:id`
  - Delete a specific color palette.
  - **Headers**: `Authorization: Bearer <token>`

## 🛠️ Middleware

- **Authorization Middleware**: Checks if the user is authenticated and has the appropriate role to access certain endpoints.

## 📝 Seeding the Database

To seed the database with initial data, you can create a seed script that inserts default users and color palettes.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💻 Contributing

Feel free to submit issues or pull requests to contribute to the project!

## 🙏 Acknowledgements

- Thanks to the open-source community for providing the tools and libraries that made this project possible.
