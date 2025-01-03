import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db
});

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use 'secure' only in production
    sameSite: 'none' // Ensure cookies are sent with cross-site requests
  }
}));

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://majestic-cranachan-153975.netlify.app',
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true // Allow credentials (cookies, authorization headers)
}));

app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// Test route to verify database connection
app.get('/test-db', async (req, res) => {
  try {
    await db.authenticate();
    res.send('Database connection successful');
  } catch (error) {
    res.status(500).send('Database connection failed: ' + error.message);
  }
});

// Route to print environment variables
app.get('/env', (req, res) => {
  res.json({
    APP_PORT: process.env.APP_PORT,
    SESS_SECRET: process.env.SESS_SECRET,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    CORS_ORIGIN: process.env.CORS_ORIGIN
  });
});

// Log environment variables
console.log('Environment Variables:');
console.log('APP_PORT:', process.env.APP_PORT);
console.log('SESS_SECRET:', process.env.SESS_SECRET);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);

const PORT = process.env.APP_PORT || 5000; // Default to 5000 if APP_PORT is not set
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}...`);
});
