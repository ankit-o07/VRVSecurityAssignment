# VRV Security Assignment

A modern blog platform where users can discover insightful articles, share knowledge, and engage with trending topics.

## Features

### Guest Users
- Browse the latest blogs without logging in.
- Search blogs by title or author.
- Encouraged to log in for an enhanced experience.

### Registered Users
- Create, edit, and delete personal blogs.
- View blog details and read full content.
- Manage blogs via the User Dashboard.

### Moderator
- Moderate posts by reviewing their content.
- Manage flagged or inappropriate blogs.
- Access the Moderator Dashboard.

### Admin
- Manage all users and their roles.
- Delete any user or blog as required.
- Assign moderator roles.
- Access the Admin Dashboard.

## Tech Stack

### Frontend
- **React.js** with functional components.
- **React Router** for routing.
- **Tailwind CSS** for styling.
- **React Toastify** for notifications.

### Backend
- **Node.js** with Express.js framework.
- **MongoDB** for database management.
- **JWT** for authentication.
- **RESTful API design**.

## Installation and Setup

### Clone the Repository:
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```


### Backend Setup:
1. Navigate to the backend folder:
   ```bash
   cd backend
```

### 2. Install dependencies:
```bash
npm install
```


### 3. Configure environment variables in a .env file:
``` bash
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=8081
```

### 4. Start the backend server:
``` bash
npm start
```


### Frontend Setup:
1. Navigate to the frontend folder:
``` bash
cd frontend
```

2. Install dependencies:
``` bash
npm install
```

3. Start the frontend server:
```bash
npm start
```

### Access the Application:
1. Open your browser and navigate to:
text
http://localhost:3000/


### Project Structure
```bash
📁 backend
 ├── 📂 src
 │   ├── 📂 config
 │   │   └── DbConnection.js  # Database connection configuration
 │   ├── 📂 controllers
 │   │   ├── AdminController.js     # Logic for admin-related actions
 │   │   ├── AuthController.js      # Logic for user authentication
 │   │   ├── ModeratorController.js # Logic for moderator-related actions
 │   │   ├── RootController.js     # Logic for root controller actions
 │   │   └── UserController.js     # Logic for user-related actions
 │   ├── 📂 middleware
 │   │   ├── AuthMiddleware.js     # Middleware for authentication
 │   │   └── ValidationMiddleware.js  # Middleware for validation
 │   ├── 📂 models
 │   │   ├── PostModel.js         # MongoDB schema for posts
 │   │   ├── UserModel.js         # MongoDB schema for users
 │   │   └── CommentModel.js      # MongoDB schema for comments
 │   ├── 📂 routes
 │   │   ├── AdminRoute.js        # API routes for admin functionalities
 │   │   ├── AuthRoute.js         # API routes for authentication
 │   │   ├── ModeratorRoute.js    # API routes for moderator functionalities
 │   │   ├── RootRoute.js         # API routes for root functionalities
 │   │   └── UserRoute.js         # API routes for user functionalities
 │   └── server.js                # Entry point for backend
 └── 📂 node_modules              # Node.js dependencies

📁 frontend
 ├── 📂 src
 │   ├── 📂 components
 │   │   ├── 📂 Admin
 │   │   │   └── 📂 Dashboard
 │   │   │       └── AdminDashboard.jsx  # Admin Dashboard component
 │   │   ├── 📂 Moderator
 │   │   │   └── 📂 Dashboard
 │   │   │       └── ModeratorDashboard.jsx  # Moderator Dashboard component
 │   │   │   └── PostList.jsx             # List of posts for moderators
 │   │   ├── 📂 Posts
 │   │   │   ├── Comment.jsx             # Component for adding and displaying comments
 │   │   │   ├── Create.jsx              # Create a new post
 │   │   │   ├── Edit.jsx                # Edit an existing post
 │   │   │   ├── PostDetail.jsx          # View post details
 │   │   │   └── PostList.jsx            # List of all posts
 │   │   ├── 📂 User
 │   │   │   └── Dashboard.jsx           # User Dashboard component
 │   ├── 📂 pages
 │   │   ├── ├── GuestUser
 │   │   │   ├── Home.jsx                # Home page for guest users
 │   │   │   ├── Login.jsx               # Login page for guest users
 │   │   │   └── Registration.jsx       # Registration page for guest users
 │   ├── 📂 helpers
 │   │   ├── Error404.jsx               # 404 Error page component
 │   │   ├── Refresher.jsx              # Utility component for refreshing content
 │   │   └── Utils.jsx                  # Utility functions for general app logic
 │   └── 📂 App.js                      # Main React app
 │   └── 📂 index.js                    # Entry point for React
      # Entry point for React

```
### Endpoints

#### Guest
- **GET** `/` - Fetch all posts.

#### User
- **POST** `/api/user/create` - Create a new post.
- **PUT** `/api/user/edit/:id` - Edit an existing post.
- **GET** `/api/user/post/:id` - Fetch details of a post.

#### Moderator
- **GET** `/api/moderator/dashboard` - Access moderator tasks.

#### Admin
- **GET** `/api/admin/users` - Fetch all users.
- **DELETE** `/api/admin/user/:id` - Delete a user.
- **POST** `/api/admin/user/:id/moderator` - Assign a user as Moderator.

---



Future Enhancements
Add social login options (Google, GitHub).
Implement a comment system for blogs.
Introduce analytics for admin and moderators.
Enable notifications for users on blog interactions.

Contributing
### Contributions are welcome! Please follow these steps:
1. Fork the repository.
Create a new branch:
```bash
git checkout -b feature-name
```

2. Commit your changes:
```bash
git commit -m "Added new feature"
```

3. Push your branch:
```bash
git push origin feature-name
```



