import dbPromise from '../session_db/db/db.mjs';

const UserCollection = 'User';
const SessionCollection = 'Sessions';

class Login {
    async verifyLogin(req, res) {
        try {
            // Wait for the database connection to be established
            const db = await dbPromise;

            const email = req.body.email;
            const password = req.body.password;

            // Query the MongoDB database to find a user with the provided email and password
            const user = await db.collection(UserCollection).findOne({ email: email, password: password });

            if (!user) {
                // User not found or incorrect password
                res.status(403).end();
                return;
            }

            // Generate a session ID (you may want to use a more secure method)
            const sid = Math.floor(Math.random() * 100_000_000_000_000);

            // Store session information in the sessions collection
            await db.collection(SessionCollection).insertOne({
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
}

export const login = new Login();
