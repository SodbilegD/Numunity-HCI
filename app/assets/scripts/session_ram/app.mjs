import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import { login } from './login.mjs';

const app = express();
const port = 3000;
const __dirname = path.resolve(path.dirname(''));
const appPath = path.join(__dirname, 'app');

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static(appPath));

// Cookie parser and JSON body parser middleware
app.use(cookieParser());
app.use(express.json());

console.log("hi hulaan");

// Route to serve 'login.html'
app.post('/', (req, res) => {
    console.log(req);

  res.sendFile('login.html', { root: appPath });
});

// Route to handle login POST requests
app.post('/login', login.verifyLogin.bind(login));

// Listen on the specified port
app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));
