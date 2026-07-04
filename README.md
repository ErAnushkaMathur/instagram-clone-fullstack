# Instagram Clone

A full-stack, production-style social media application built with the MERN stack — replicating core Instagram functionality including authentication, posts with cloud image uploads, likes, and a **private-account follow request system** that mirrors how real platforms gate access to private profiles.

---

##  Features

- 🔐 **JWT-based Authentication** — secure register/login with bcrypt password hashing & cookie-based sessions
- 🖼️ **Cloud Image Uploads** — post images stored and served via ImageKit
- 📝 **Post Management** — create, fetch, and view individual post details
- ❤️ **Like / Unlike** — engage with posts
- 👥 **Follow / Unfollow** — direct following for public accounts
- 🔒 **Follow Request System** — for private accounts: send → pending → accept/reject, with full authorization checks (only the recipient can act on their own requests)
- 🏗️ **MVC Architecture** — clean separation of concerns across models, controllers, routes, and middleware

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (JSON Web Token) + bcryptjs |
| File Storage | ImageKit |
| Frontend | React.js |
| Architecture | MVC |

---

## 📁 Project Structure

```
instagram-clone-backend/
├── Backend/
│   ├── src/
│   │   ├── config/          # DB & service configuration
│   │   ├── controllers/     # Auth, posts, follow, follow-requests
│   │   ├── middlewares/     # JWT verification
│   │   ├── models/          # User, Post, Follow, FollowRequest, Like
│   │   └── routes/          # API route definitions
│   ├── app.js                # Express app & route mounting
│   ├── server.js             # Server entry point
│   └── package.json
└── Frontend/                 # React.js client
```

---

##  Getting Started

### Prerequisites
- Node.js v18+
- MongoDB URI (Atlas or local)
- ImageKit account credentials

### Installation

```bash
git clone https://github.com/ErAnushkaMathur/instagram-clone-backend
cd instagram-clone-backend/Backend
npm install
```

### Environment Variables

Create a `.env` file inside `Backend/`:

```env
PORT=your_port
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### Run

```bash
node server.js
```

The frontend (React) lives in `/Frontend` and can be run separately with `npm install && npm start`.

---

## 📡 API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login & receive JWT (set as cookie) |

### 📝 Posts — `/api/post`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/post` | Create a new post (image upload via ImageKit) |
| GET | `/api/post` | Get all posts for the logged-in user |
| GET | `/api/post/:postId` | Get details of a single post |
| POST | `/api/post/:postId/like` | Like a post |
| DELETE | `/api/post/:postId/like` | Unlike a post |

### 👥 Users & Follow — `/api/user`
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/user/follow/:username` | Follow a user directly |
| DELETE | `/api/user/follow/:username` | Unfollow a user |
| POST | `/api/user/follow-request/:username` | Send a follow request (auto-follows if account is public) |
| PATCH | `/api/user/follow-request/:requestId/accept` | Accept a pending follow request |
| PATCH | `/api/user/follow-request/:requestId/reject` | Reject a pending follow request |

> Endpoint paths reflect the controller logic; confirm exact route strings against `routes/` if wiring up a client.

---

## How the Follow Request System Works

This is the core differentiator of the project — it doesn't just follow/unfollow, it replicates **Instagram's private-account gating**:

1. User A sends a follow request to User B.
2. If **B's account is public** → A follows B immediately. No request needed.
3. If **B's account is private** → a `FollowRequest` is created with status `pending`.
4. **Only B** is authorized to accept or reject that request (enforced server-side, not just on the client).
5. On **accept** → the request status becomes `accepted` and an actual `Follow` relationship is created.
6. On **reject** → the request status becomes `rejected`, no follow relationship is created.

All authorization, duplicate-request, and self-follow edge cases are explicitly checked at the controller level.

---

## Author

**Anushka Mathur**

[LinkedIn](https://linkedin.com/in/your-link) • [GitHub](https://github.com/ErAnushkaMathur)
