import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import { login } from './login.mjs';
//import theCommunitySection from '../../scripts/component/theCommunitySection.js';

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
// app.post('/', (req, res) => {
//     console.log(req);

//   res.sendFile('index.html', { root: appPath });
// });

// Route to handle login POST requests
app.post('/login', login.verifyLogin.bind(login));

app.post('/selectedcommunity.html', async (req, res) => {
  try {
      const communityId = req.params.communityId;
      
      // Pass communityId as a request body to renderCommunity function
      const communityData = await renderCommunity({ body: { communityId } }, res);
      console.log("community dataaaa");
      console.log(communityData);
      // Assuming theCommunitySection is a class or function that has a #render method
      //const communitySectionInstance = new theCommunitySection(communityData);

      res.status(200).send({
          result: 'OK'
      });
  } catch (error) {
      console.error('Error handling selected community:', error);
      res.status(500).end();
  }
});

// Listen on the specified port
app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`));
