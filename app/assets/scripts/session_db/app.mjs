
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
// import { login } from './login.mjs'
import user from "./routes/users.mjs";

const app = express()
const port = 3000
const __dirname = path.resolve(path.dirname(''));
const options = {
    root: path.join(__dirname)
};
app.use(cookieParser());
app.use(express.json());

// login.users.set('user1@my.com', { fullname: "USER ONE", password: "123" });
// login.users.set('admin@my.com', { fullname: "Administrator", password: "123" });
// login.users.set('user2@my.com', { fullname: "USER TWO", password: "123" });

app.post('/', (req, res) => {
    res.sendFile("./login.html", options);
})

app.post('/login', (req, res)=> user.verifyLogin(req, res));

app.get('/logout', (req, res) => { 
    user.sessions.delete(Number(req.cookies.session_id));
    res.status(200).send();
});

app.get('/users', async (req, res) => await user.getUsers(req, res));

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))