import db_user from "../db/db_user.mjs";

class User { 
    constructor() { 
        this.users = new Map();
        this.sessions = new Map();
    }

    async addUser(req, res, { email, password, fullname }) { 
        const result = await dbUser.addUser(email, password, fullname);
        if (result.id == -1) { 
            res.status(400).end();
            return;
        }

        res.send(result);

    }

    async getUsers(req, res) { 
        try {
            const result = await dbUser.selectUsers();
            res.status(200).send(result);
            return;
        } catch (error) {
            res.status(400).send("error occured");
        }

    }

    async verifyLogin(req, res) {
        const email = req.body.email, pass = req.body.password;
        const dbUser = await db_user.login(email, pass);

        if (dbUser ==null) {
            res.status(403);
            res.end();
            return;
        }
        
        const sid = Math.floor(Math.random() * 100_000_000_000_000);
        this.sessions.set(sid,
            {
                user: email,
                fullname: dbUser[0].fullname,
                logged: Date.now()
            });
        console.log(this.sessions);

        res.statusCode = 200;
        res.cookie("session_id", sid);
        res.send({
            result: "OK",
            username: dbUser[0].fullname
        });

    }
}

const user = new User();
export default user;