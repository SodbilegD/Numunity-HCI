import { connectToMongoDB } from '../session_db/db/db.mjs';
import cookieParser from 'cookie-parser';

class Login {
    constructor() {
        // Initialize cookie-parser middleware
        this.cookieParserMiddleware = cookieParser();
    }

    async verifyLogin(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const db = await connectToMongoDB();
            const UserCollection = db.collection('User');
            const user = await UserCollection.findOne({ email: email, password: password });

            if (!user) {
                // User not found or incorrect password
                res.status(403).end();
                return;
            }

            // Generate a session ID (you may want to use a more secure method)
            const sid = Math.floor(Math.random() * 100_000_000_000_000);

            // Store session information in the sessions collection
            await db.collection('Sessions').insertOne({
                sid: sid,
                user: email,
                logged: new Date()
            });

            console.log('Session created:', sid);

            // Set the session ID in the response cookie
            res.cookie('session_id', sid);

            // Send a successful response
            res.status(200).send({
                result: 'OK'
            });

        } catch (error) {
            console.error('Error verifying login:', error);
            res.status(500).end();
        }
    }

    // Middleware function to parse cookies
    parseCookies(req, res, next) {
        this.cookieParserMiddleware(req, res, next);
    }

    // Function to get session ID from cookie
    getSessionIdFromCookie(req) {
        return req.cookie['session_id'];
    }
}

export const login = new Login();
