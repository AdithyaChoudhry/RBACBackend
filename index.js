import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();

// Initialize Sequelize session store
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db
});

// CORS configuration
app.use(cors({
  origin: 'https://majestic-cranachan-153975.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow credentials for session cookies
}));

// Custom CORS Middleware (if needed)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://majestic-cranachan-153975.netlify.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Session configuration
app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    sameSite: 'none' // Ensure cookies are sent with cross-site requests
  }
}));

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// Handle preflight requests
app.options('*', cors()); // Enable pre-flight across-the-board

const PORT = process.env.APP_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}...`);
});