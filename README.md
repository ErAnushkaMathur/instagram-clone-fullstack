# 📸 Instagram Clone — Full-Stack Social Media Web Application

A full-stack, Instagram-inspired social media application built with the **MERN stack**. It replicates core platform mechanics — authentication, cloud-hosted image posts, likes, and a **private-account follow-request system** that mirrors how real platforms gate access to private profiles.

The project is built with a clean **MVC architecture** on the backend and a **feature-based folder structure** on the frontend, with an emphasis on handling real-world edge cases (duplicate requests, unauthorized actions, self-follow attempts) rather than just the happy path.

---

## ✨ Features

- 🔐 **JWT Authentication** — register/login with `bcryptjs` password hashing and secure, cookie-based sessions
- 🖼️ **Cloud Image Uploads** — post images uploaded directly to **ImageKit** via `multer` in-memory storage
- 📝 **Post Management** — create posts, fetch a user's own posts, view individual post details, and a global feed
- ❤️ **Like / Unlike** — like posts with duplicate-like prevention enforced at the database level (unique compound index on `post` + `user`)
- 👥 **Follow / Unfollow** — direct following for public accounts
- 🔒 **Follow-Request System** — for private accounts: `send → pending → accept / reject`, with authorization enforced server-side so only the request recipient can act on it
- 🏗️ **MVC Architecture** — clean separation across models, controllers, routes, and middleware

---

## 🧰 Tech Stack

| Layer            | Technology                          |
|-------------------|--------------------------------------|
| Frontend          | React.js (Vite), React Router, SCSS |
| HTTP Client        | Axios                               |
| Backend            | Node.js, Express.js                 |
| Database           | MongoDB + Mongoose                  |
| Authentication      | JWT + bcryptjs, HTTP-only cookies   |
| File Storage        | ImageKit                            |
| File Handling       | Multer (in-memory storage)          |

---

## 📁 Project Structure

instagram-clone-fullstack/
├── Backend/
│ └── src/
│ ├── config/ # Database connection
│ ├── controllers/ # Auth, posts, follow, follow-requests
│ ├── middlewares/ # JWT verification (identifyUser)
│ ├── models/ # User, Post, Follow, FollowRequest, Like
│ └── routes/ # API route definitions
│ ├── app.js # Express app & route mounting
│ └── server.js # Server entry point
└── Frontend/
└── src/
├── features/
│ ├── auth/ # Login, Register, auth context & API calls
│ ├── posts/ # Feed, CreatePost, post context & API calls
│ └── shared/ # Shared components & global styles
├── app.routes.jsx # Route definitions
└── main.jsx

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- A MongoDB URI (Atlas or local)
- ImageKit account credentials

### Backend Setup
```bash
git clone https://github.com/ErAnushkaMathur/instagram-clone-fullstack
cd instagram-clone-fullstack/Backend
npm install
```

Create a `.env` file inside `Backend/`:
PORT=3000
MONGOOSE_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
Run the server:
```bash
npm run dev   # nodemon
# or
npm start
```

### Frontend Setup
```bash
cd instagram-clone-fullstack/Frontend
npm install
npm run dev
```

The frontend runs on Vite's dev server (`http://localhost:5173`) and communicates with the backend at `http://localhost:3000`.

---

## 📡 API Reference

### Auth — `/api/auth`
| Method | Endpoint     | Description                              | Access  |
|--------|--------------|-------------------------------------------|---------|
| POST   | `/register`  | Register a new user                       | Public  |
| POST   | `/login`     | Log in and receive a JWT (set as cookie)  | Public  |
| GET    | `/get-me`    | Get the currently logged-in user's info   | Private |

### Posts — `/api/post`
| Method | Endpoint            | Description                                      | Access  |
|--------|----------------------|----------------------------------------------------|---------|
| POST   | `/`                  | Create a post (image upload via ImageKit)          | Private |
| GET    | `/`                  | Get all posts created by the logged-in user         | Private |
| GET    | `/details/:postId`   | Get details of a single post                       | Private |
| POST   | `/like/:postId`      | Like a post                                        | Private |
| POST   | `/unlike/:postId`    | Unlike a post                                      | Private |
| GET    | `/feed`              | Get the global feed of all posts                    | Private |

### Users & Follow — `/api/user`
| Method | Endpoint                                | Description                                                  | Access  |
|--------|-------------------------------------------|------------------------------------------------------------------|---------|
| POST   | `/follow/:username`                       | Follow a user directly                                            | Private |
| POST   | `/unfollow/:username`                     | Unfollow a user                                                    | Private |
| POST   | `/follow-request/:username`               | Send a follow request (auto-follows if the account is public)     | Private |
| PATCH  | `/follow-request/:requestId/accept`       | Accept a pending follow request                                    | Private |
| PATCH  | `/follow-request/:requestId/reject`       | Reject a pending follow request                                     | Private |

---

## 🔍 How the Follow-Request System Works

This is the core differentiator of the project — it doesn't just follow/unfollow, it replicates Instagram's private-account gating logic:

1. **User A** sends a follow request to **User B**.
2. If B's account is **public** → A follows B immediately. No request needed.
3. If B's account is **private** → a `FollowRequest` document is created with `status: "pending"`.
4. Only **B** is authorized to accept or reject that request — enforced **server-side**, not just on the client.
5. On **accept** → the request status becomes `"accepted"` and an actual `Follow` relationship is created.
6. On **reject** → the request status becomes `"rejected"`; no follow relationship is created.

Edge cases explicitly handled at the controller level:
- Duplicate follow requests (an already-pending request can't be sent again)
- Self-follow attempts
- Users who are already following each other
- Unauthorized accept/reject attempts (only the recipient can act on a request)

---

## 👩‍💻 Author

**Anushka Mathur**
[LinkedIn](https://www.linkedin.com/in/anushkamathur-cs/) • [GitHub](https://github.com/ErAnushkaMathur)
