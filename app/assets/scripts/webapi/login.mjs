import { connectToMongoDB } from './db.mjs';

class Login {
    constructor() {
    }

    async verifyLogin(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const db = await connectToMongoDB();
            const UserCollection = db.collection('User');
            const user = await UserCollection.findOne({ email: email, password: password });

            if (!user) {
                res.status(403).end();
                return;
            }
            const sid = Math.floor(Math.random() * 100_000_000_000_000);

            await db.collection('Sessions').insertOne({
                sid: sid,
                user: email,
                logged: new Date()
            });
            console.log('Session created:', sid);
            res.cookie('session_id', sid);
            res.status(200).send({
                result: 'OK'
            });

        } catch (error) {
            console.error('Error verifying login:', error);
            res.status(500).end();
        }
    }

    // // Middleware function to parse cookies
    // parseCookies(req, res, next) {
    //     this.cookieParserMiddleware(req, res, next);
    // }

    // Function to get session ID from cookie
    async getUserFromCookie(req, res) {
        try {
            const sessionId = req.cookies['session_id'];
            console.log("User's sessionID: ", sessionId);
            if(sessionId){
                const db = await connectToMongoDB();
                const SIDcollection = await db.collection('Sessions').find({}).toArray();
                const userSID = SIDcollection.find(c => c.sid === parseInt(sessionId));
                if(userSID){
                    const db = await connectToMongoDB();
                    const Usercollection = await db.collection('User').find({}).toArray();
                    const user = Usercollection.find(c => c.email === userSID.user);
                    res.status(200).send({
                        result: 'OK',
                        user: user
                    });
                }
            }
        } catch (error) {
            console.error('Getting user is failed:', error);
            res.status(500).end();
        }        
    }

    // Add this function to check if the user is logged in
    async checkLoginStatus() {
        try {
            const response = await fetch("http://localhost:3000/check-login", {
                method: 'GET',
                credentials: 'include', // Include credentials (cookies) in the request
            });

            if (response.status === 200) {
                // User is logged in, update the UI
                const header = document.getElementById("header-button");
                header.classList.add("main-header__container2__user");
                header.classList.remove("main-header__login-button");
                header.classList.remove("main-header__signup-button");

                // Add user profile picture and logout button
                // For example, you can create an image element and a button element for logout
                const profilePicture = document.createElement("img");
                profilePicture.src = "path_to_profile_picture"; // Set the path to the user's profile picture
                profilePicture.alt = "Profile Picture";
                profilePicture.classList.add("profile-picture");
                header.appendChild(profilePicture);

                const logoutButton = document.createElement("button");
                logoutButton.textContent = "Logout";
                logoutButton.classList.add("logout-button");
                logoutButton.addEventListener("click", logout);
                header.appendChild(logoutButton);
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    }

    // Call the checkLoginStatus function when the page loads

    // Rest of your existing code...
}

export const login = new Login();
