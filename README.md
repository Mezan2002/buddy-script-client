# Buddy Script: Social Feed Application

This project is a full-stack Next.js and Express.js social feed application built to fulfill all specific technical requirements of the Task Overview assessment.

## 🏗️ Architecture Stack
*   **Frontend**: Next.js (React), React Query (Optimistic UI), CSS Modules / React Bootstrap.
*   **Backend**: Node.js, Express.js, MongoDB (Mongoose).
*   **Authentication**: JWT-based stateless authentication.
*   **File Handling**: Multer for multipart form data, supporting direct image uploads.

## ✔️ Core Features & Deliverable Checklist
*   **Authentication & Authorization**: Fully functioning Email/Password registration (FirstName, LastName) mapped to JWT bearer tokens. Protected routing on the client prevents unauthorized feed access.
*   **Post Creation & Visibility**: Users can compose Post objects consisting of text and/or images. Implemented a `visibility` toggle (Public vs. Private). The backend strictly filters `private` posts at the database query level so they are exclusively delivered to their respective authors.
*   **Chronological Feed & Pagination**: The feed natively streams posts globally, strictly sorted via `$sort: { createdAt: -1 }` ensuring chronological discovery.
*   **Engagement Engine (Optimistic UI)**: Users can organically toggle Likes on both Posts and Comments. This system structurally bypasses server latency by utilizing React Query `onMutate` cache-overrides, resulting in zero-delay UI reactions. 
*   **Recursive Nested Replies**: Modeled the Comment schema to support infinite-depth threading. The client recursively maps `<CommentItem>` components to visually nest sub-comments perfectly indented under their target anchors.
*   **"Who Liked" Transparency Mechanism**: Relegating interactions to anonymous numbers violates good UX. Instead:
    1.  We executed deep `.populate()` loops across Mongoose Like arrays.
    2.  Hovering over *any* Like Badge immediately triggers a native tooltip revealing the localized names of interactors (e.g. "John, Jane").
    3.  A custom native `<UserAvatar />` CSS engine assigns every user a mathematical, deterministic colored icon branded with their Initials without ever relying on external `<img>` APIs.

## 🧠 Technical Decisions & Challenges
*   **Image Optimization vs Strictness**: I originally leaned heavily on the Next.js `<Image />` component. However, to support dynamically generated initial-based avatars for users who haven't uploaded profiles, I circumvented strict Next.js `next.config.js` domain whitelisting restrictions by engineering a pure CSS React `<UserAvatar />` component, drastically reducing external dependencies and potential build failures.
*   **Relational Mapping in NoSQL**: MongoDB is fundamentally document-oriented, but social feeds are highly relational. By storing Arrays of User `ObjectId`s within both `Post` and `Comment` models, I was able to surgically execute `.populate()` queries on retrieval—allowing the frontend to access actual names and avatars seamlessly without making expensive secondary client-side API requests.

## 🚀 Running Locally
1. Navigate to the `/buddy-script-server` folder, plug your MongoDB connection string into a `.env` file, and execute `npm run dev`.
2. Navigate to the `/buddy-script-client` folder, install packages, and execute `npm run dev`.
3. The platform will boot on `localhost:3000`.
