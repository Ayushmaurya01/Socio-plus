# Socio Plus - Professional Social Media Platform

Welcome to **Socio Plus**, a production-ready, MERN-stack social media application featuring a modern, premium UI/UX inspired by LinkedIn and Instagram.

## 🌟 Key Features
- **Modern UI/UX:** Clean, light-themed interface with soft shadows, gradient accents, and fully responsive components.
- **3-Column Dashboard:** A professional feed layout featuring a sticky sidebar, stories carousel, main post feed, and a suggested users panel.
- **Advanced Profile Pages:** Gradient cover photos, overlapping circular avatars, and horizontal stat tracking.
- **Real-Time Capabilities:** Integrated with Socket.io for instantaneous messaging and live notifications.
- **Quick Demo Access:** One-click demo login built straight into the authentication page for rapid testing.

## 📸 Screenshots

*(To display these images, save your screenshots into an `assets` folder in the root directory and name them as shown below).*

### The Feed
![Feed UI](./assets/feed.png)

### The Profile
![Profile UI](./assets/profile.png)

### Login & Authentication
![Login UI](./assets/login.png)

## 🚀 Tech Stack
- **Frontend:** React.js, Tailwind CSS, Framer Motion, Axios, Socket.io-client.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), Socket.io, JWT Authentication, Bcrypt.

## 🛠️ Installation & Setup

1. **Clone the repository and install dependencies:**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

2. **Environment Variables:**
   In the `server` directory, create a `.env` file with the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   CLIENT_URL=http://localhost:5173
   ```

3. **Run the Application:**
   Open two separate terminals from the root directory:

   **Terminal 1 (Backend):**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 (Frontend):**
   ```bash
   cd client
   npm run dev
   ```

4. **Access the App:**
   Open `http://localhost:5173` in your browser. The backend will automatically seed a `DemoUser` upon first connection!

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.
