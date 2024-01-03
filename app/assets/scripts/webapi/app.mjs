import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { login } from './login.mjs';
import { community } from './community.mjs';
import { communityList } from "./communityList.mjs";
import { discussion } from './discussion.mjs';
import { newcomment } from './addcomment.mjs';
import { fetchCommunityData } from "../session_db/db/db.mjs";
import swaggerUi from "swagger-ui-express";
import swaggerJsondoc from "swagger-jsdoc";
import aboutTeam from './about.mjs';

const data = await fetchCommunityData("Community", null);
const app = express();
const port = 3000;
const __dirname = path.resolve(path.dirname(''));
const appPath = path.join(__dirname, 'app');
let agreeCount = 0;
app.use(express.static(appPath));

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
//http://localhost:3000/public/somepage.html гэх мэтээр static контентоор үйлчлэх бол /public гэсэн path аар 
//эхэлсэн бол диск дээрх public фордор дотор байгаа файлуудаас үйлчлэхийг тохируулж байна.
app.use("/app", express.static('app'));

//json data хүлээж авдаг болгохын тулд дуудаж өгнө.
app.use(express.json());

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "DKS API",
            version: "1.0.0",
            description:
                "API for DKS community", 
            license: {
                name: "DKS",
                url: "https://dks.community.mn/"
            },
            contact: {
                name: "WebDevAdmin",
                url: "https://dks.community.mn",
                email: "21B1NUM0742@num.edu.mn"
            }
        },
        servers: [
            {
                url: "http://localhost:3000/"
            }
        ]
    },
    apis: ["./app.mjs"]
};

const specs = swaggerJsondoc(options);
app.use("/docs", swaggerUi.serve);

app.get(
    "/docs",
    swaggerUi.setup(specs, {
        explorer: true
    })
);

/**
 * @swagger
 * tags:
 *  -
 *   name: "Community"
 *   description: Community related operations
 *      
 *  - 
 *   name: "Post"
 *   description: Post related operations
 *  - 
 *   name: "Comment"
 *   description: Comment related operations
 *  -
 *   name: "About"
 *   description: My Team information
 *  -
 *   name: "Followers"
 *   description: Followers of Community
 */

/**
* @swagger
*  paths:
*      /communities/{communityId}/posts/{postId}/agreeCount:
*          post:
*              tags:
*                  - Post
*              summary: Upload post agree counts to DKS
*              parameters:
*               -
*                   in: path
*                   name: communityId
*                   schema:
*                   type: integer
*                   required: true
*                   description: Numeric ID of the community
*                -
*                   in: path
*                   name: postId
*                   schema:
*                   type: integer
*                   required: true
*                   description: Numeric ID of the post
*                -
*                   in: path
*                   name: agreeCount
*                   schema:
*                   type: integer
*                   required: true
*                   description: agree count of the post
*              requestBody:
*                  description: Санал нэгдсэн хүмүүсийн тоог явуулна
*                  required: true
*                  content:
*                      application/json:
*                          schema:
*                              type: object
*                              properties:
*                                  agreeCount:
*                                      type: integer
*                              
*              responses:
*                  "201":
*                      description: POST to DKS API
*                      content:
*                          application/json:
*                              schema:
*                                  type: string
*/

app.post('/communities/:communityId/posts/:postId/agreeCount', (req, res) => { 
        agreeCount += req.body.agreeCount;
        res.writeHead(201, "CREATED", { 'Content-Type': 'text/plain' });
        res.send();
    }
)

/**
* @swagger
*  paths:
*      /communities/{communityId}/posts/{postId}/agreeCount:
*          get:
*              tags:
*               - Post
*              summary: Get post agreeCounts from NUM
*              parameters:
*               -
*                   in: path
*                   name: communityId
*                   schema:
*                   type: integer
*                   required: true
*                   description: Numeric ID of the community
*                -
*                   in: path
*                   name: postId
*                   schema:
*                   type: integer
*                   required: true
*                   description: Numeric ID of the post
*                -
*                   in: path
*                   name: agreeCount
*                   schema:
*                   type: integer
*                   required: true
*                   description: agree counts of the post
*              responses:
*                  "200":
*                      description: Success. agreeCount number
*                      content:
*                          application/json:
*                              schema:
*                                  type: string
*/

app.get('/communities/:communityId/posts/:postId/agreeCount', (req, res) => {
    res.statusCode=200;
    const community = data.filter(
        community => req.params.communityId === community.communityId
        );
    const posts = community[0].posts.filter(
        (posts) => req.params.postId == posts.postId
    );
    const agreeCount = posts[0].agreeCount;
    res.send(JSON.stringify({agreeCount:agreeCount}));
}
)


/**
 * @swagger
 * paths:
 *  /communities/{communityId}:
 *    get:
 *      tags:
 *          - Community
 *      summary: Get specific community from DKS
*      parameters:
*       -
*        in: path
*        name: communityId
*        schema:
*        type: integer
*        required: true
*        description: Numeric ID of the community
 *      responses:
 *        "200":
 *          description: GET from DKS API
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */


app.get('/communities/:communityId',
    (req, res) => {
        const community = data.filter(
            community => req.params.communityId === community.communityId
            );
        // console.log(community);
        res.send(community)
})

/**
 * @swagger
 * paths:
 *  /communities/{communityId}/followers:
 *    get:
 *      tags:
 *          - Followers
 *      summary: followers of the community from DKS
*      parameters:
*       -
*        in: path
*        name: communityId
*        schema:
*        type: integer
*        required: true
*        description: Numeric ID of the community
 *      responses:
 *        "200":
 *          description: GET from DKS API
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */


app.get('/communities/:communityId/followers',
    (req, res) => {
        const community = data.filter(
            community => req.params.communityId === community.communityId
            );
        // console.log(community);
        res.send(community[0].followers);
})

/**
* @swagger
* paths:
*  /communities/{communityId}/posts/{postId}:
*    get:
*      tags:
*          - Post
*      summary: Get specific post by ID
*      parameters:
*       -
*        in: path
*        name: communityId
*        schema:
*        type: integer
*        required: true
*        description: Numeric ID of the community
*       -
*        in: path
*        name: postId
*        schema:
*         type: integer
*        required: true
*        description: Numeric ID of the post
*
*      responses:
*        "200":
*          description: post JSON
*          content:
*            application/json:
*              schema:
*                type: string
*/

app.get('/communities/:communityId/posts/:postId',
    (req, res) => {
        const community = data.filter(
            community => req.params.communityId === community.communityId
            );
        const posts = community[0].posts.filter(
            (posts) => req.params.postId == posts.postId
        );
        res.send(posts)
    })
/**
* @swagger
* paths:
*  /communities/{communityId}/posts/{postId}/comments/{commentId}:
*    get:
*      tags:
*          - Comment
*      summary: Get specific comment by ID
*      parameters:
*       -
*        in: path
*        name: communityId
*        schema:
*         type: integer
*        required: true
*        description: Numeric ID of the community
*       -
*        in: path
*        name: postId
*        schema:
*         type: integer
*        required: true
*        description: Numeric ID of the post
*       -
*        in: path
*        name: commentId
*        schema:
*         type: integer
*        required: true
*        description: Numeric ID of the comment
*      responses:
*        "200":
*          description: Comment JSON
*          content:
*            application/json:
*              schema:
*                type: string
*/
app.get('/communities/:communityId/posts/:postId/comments/:commentId',
(req, res) => {
    const community = data.filter(
        community => req.params.communityId === community.communityId
        );
    // console.log(community);
    const post = community[0].posts.filter(
        post => req.params.postId === post.postId
    );
    // console.log(post[0].comments);
    const comment = post[0].comments.filter(
        comment => req.params.commentId === comment.id
    );
    // console.log(comment);
    res.send(comment)
})

/**
 * @swagger
 *  paths:
 *   /about:
 *    get:
 *     tags: 
 *      - About
 *     summary: about data from DKS               
 *     responses:
 *      "200":
 *       description: GET about data from DKS API
 *       content:
 *        application/json:
 *         schema:
 *          type: string
 */
app.get('/about', (req, res) => {
    const about = new aboutTeam(req, res);
    console.log(about.render());
    about.render();
});

app.get('/', (req, res) => {
    res.send(data)
});

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
