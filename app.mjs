import express from 'express';
// import data from './data.json' assert { type: 'json' };
import { connectToMongoDB } from "./app/assets/scripts/session_db/db/db.mjs";
import MyClass from './mymodule.mjs';
import swaggerUi from "swagger-ui-express";
import swaggerJsondoc from "swagger-jsdoc";
import { community } from './app/assets/scripts/session_ram/community.mjs';
import { comment } from 'postcss';
// import './modules/sidebar.js';
const uri = 'mongodb://127.0.0.1:27017/?readPreference=primary&ssl=false&directConnection=true';
const db = await connectToMongoDB();
const data = await db.collection().find({}).toArray();
const app = express()
const port = 3000
let likes = 0;
// const data = fetchData();

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
 *   name: "Product"
 *   description: Product related operations
 *      
 *  - 
 *   name: "About"
 *   description: Company info 
 *
 *  - 
 *   name: "Order"
 *   description: Order related operations 

 */

/**
 * @swagger
 *  paths:
 *      /products/{productId}/likes:
 *          post:
 *              tags:
 *                  - Product
 *              summary: Upload product likes to NUM
 *              parameters:
*                -
*                   in: path
*                   name: productId
*                   schema:
*                   type: integer
*                   required: true
*                   description: Numeric ID of the product
 *              requestBody:
 *                  description: Like ийн тоог явуулна
 *                  required: true
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  likes:
 *                                      type: integer
 *                              
 *              responses:
 *                  "201":
 *                      description: POST to NUM API
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  type: string
 */

app.post('/communities/:communityId/posts/:postId/likes', (req, res) => { 
        likes += req.body.likes;
        res.writeHead(201, "CREATED", { 'Content-Type': 'text/plain' });
        res.send();
    }
)

/**
 * @swagger
 *  paths:
 *      /products/{productId}/likes:
 *          get:
 *              tags:
 *                  - Product
 *              summary: Get product likes from NUM
 *              parameters:
*                -
*                   in: path
*                   name: productId
*                   schema:
*                   type: integer
*                   required: true
*                   description: Numeric ID of the product
 *              responses:
 *                  "200":
 *                      description: Success. likes number
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  type: string
 */

app.get('/communities/:communityId/posts/:postId/likes', (req, res) => {
    res.statusCode=200;
    res.send(JSON.stringify({likes:likes}));
}
)


/**
 * @swagger
 * paths:
 *  /products:
 *    get:
 *      tags:
 *          - Product
 *      summary: Get specific product from NUM
 *      responses:
 *        "200":
 *          description: GET from NUM API
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 */

/**
* @swagger
* paths:
*  /products/{productId}/comments/{commentId}:
*    get:
*      tags:
*          - Product
*      summary: Get specific comment by ID
*      parameters:
*       -
*        in: path
*        name: productId
*        schema:
*         type: integer
*        required: true
*        description: Numeric ID of the product
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
app.get('/communities/:communityId',
    (req, res) => {
        const community = data.community.filter(
            community => req.params.communityId === community.communityId
            );
        // console.log(community);
        res.send(community)
})
app.get('/communities/:communityId/posts/:postId',
    (req, res) => {
        const community = data.community.filter(
            community => req.params.communityId === community.communityId
            );
        console.log(community)
        const posts = community[0].posts.filter(
            post => req.params.postId === post.postId
        );
        // console.log(data.community[0].posts);
        res.send(posts)
    })

app.get('/communities/:communityId/posts/:postId/comments/:commentId',
(req, res) => {
    const community = data.community.filter(
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
 *     summary: Get product likes                
 *     responses:
 *      "200":
 *       description: GET about data from NUM API
 *       content:
 *        application/json:
 *         schema:
 *          type: string
 */
app.get('/about', (req, res) => {
    const myClass = new MyClass(req, res);
    myClass.render();
});

app.get('/', (req, res) => {
    const myClass = new MyClass(req, res);
    myClass.render();
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))