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

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// Log environment variables
const appPort = process.env.APP_PORT || 37615;
const sessSecret = process.env.SESS_SECRET || 'default_secret_key';
const dbHost = process.env.MYSQLHOST;
const dbPort = process.env.MYSQLPORT;
const dbName = process.env.MYSQL_DATABASE;
const dbUser = process.env.MYSQLUSER;
const dbPassword = process.env.MYSQL_ROOT_PASSWORD;

console.log('APP_PORT:', appPort);
console.log('SESS_SECRET:', sessSecret);
console.log('DB_HOST:', dbHost);
console.log('DB_PORT:', dbPort);
console.log('DB_NAME:', dbName);
console.log('DB_USER:', dbUser);
console.log('DB_PASSWORD:', dbPassword);

// Check database connection
db.authenticate()
  .then(() => {
    console.log('Database connected...');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(session({
    secret: sessSecret,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: `https://rbacbackend-production.up.railway.app/`
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// Define a route for /dashboard
app.get('/dashboard', (req, res) => {
    res.send('Dashboard route');
});

app.listen(appPort, () => {
    console.log('Server up and running on port', appPort);
});
