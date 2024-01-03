import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { login } from './login.mjs';
import { community } from './community.mjs';
import { communityList } from "./communityList.mjs";
import { discussion } from './discussion.mjs';
import { newcomment } from './addcomment.mjs';

const app = express();
const port = 3000;
const __dirname = path.resolve(path.dirname(''));
const appPath = path.join(__dirname, 'app');

app.use(express.static(appPath, {
    setHeaders: (res, path) => {
        if (path.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
        }
    },
}));

app.use(cookieParser());
app.use(express.json());
app.use(cors());


// Route to serve 'login.html'
// app.post('/', (req, res) => {
//     console.log(req);

//   res.sendFile('index.html', { root: appPath });
// });

app.post('/login', login.verifyLogin.bind(login));

app.post('/selectedcommunity', (req, res) => {
    community.renderCommunity(req, res);
});

app.get('/community', (req, res) => {
    communityList.renderCommunityList(req, res);
});

app.post('/discussion', (req, res) => {
    discussion.renderDiscussion(req, res);
});

app.post('/getuser', (req, res) => {
    login.getUserFromCookie(req, res);
});

app.post('/addnewcomment', (req, res) => {
    newcomment.addCommentToPost(req, res);
});

app.post('/joincommunity', (req, res) => {
    community.joinNewCommunity(req, res);
});

// Listen on the specified port
app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));
