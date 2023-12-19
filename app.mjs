import express from 'express';
import data from './data.json' assert { type: 'json' };


import MyClass from './mymodule.mjs';

import swaggerUi from "swagger-ui-express";
import swaggerJsondoc from "swagger-jsdoc";

const app = express()
const port = 3000
let likes = 0;

//http://localhost:3000/public/somepage.html гэх мэтээр static контентоор үйлчлэх бол /public гэсэн path аар 
//эхэлсэн бол диск дээрх public фордор дотор байгаа файлуудаас үйлчлэхийг тохируулж байна.
app.use("/public", express.static('public'));

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
                name: "NUM",
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

app.post('/community/:post/:postId/likes', (req, res) => { 
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

app.get('/community/:post/:postId/likes', (req, res) => {
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
app.get('/community/post/:postId',
    (req, res) => {
        const product = data.filter(
            prod =>
                req.params.productId == prod.id
        );
        res.send(product);
    })

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
app.get('community/posts/:postId/comments/:commentId',
    (req, res) => {
        const product = data.filter(
            prod =>req.params.productId == prod.id
            );
        const comment = product[0].comments.filter((comment) => comment.id == req.params.commentId)
        console.log(comment[0].comment);
        res.send(comment);
    }
)


app.get('/posts',
    (req, res) => {
        res.send(data)
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