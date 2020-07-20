const bcrypt = require('bcryptjs');

module.exports = {
    // auth middleware
    register: async (req, res) => {
        const {username, password, profile_picture} = req.body,
            db = req.app.get('db');
        
        const foundUser = await db.users.check_user({username});
        if(foundUser[0]) {
            return res.status(400).send('Username already in use');
        }

        let salt = bcrypt.genSaltSync(10),
            hash = bcrypt.hashSync(password, salt);
        
        const newUser = await db.users.register_user({username, password: hash, profile_picture});
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: async (req, res) => {
        const {username, password} = req.body,
            db = req.app.get('db');

        const foundUser = await db.users.check_user({username});
        if(!foundUser[0]){
            return res.status(400).send('Username not found');
        }

        const isAuthenticated = bcrypt.compareSync(password, foundUser[0].password);
        if(!isAuthenticated) {
            return res.status(401).send('Password is incorrect')
        }

        delete foundUser[0].password;
        req.session.user = foundUser[0];
        res.status(202).send(req.session.user);
    },
    // posts middleware
    getPosts: (req, res) => {
        const { id } = req.params,
            db = req.app.get('db');
        
        let { userposts, search } = req.query;
        userposts = (userposts === "true") ? true : false; // convert query string to Boolean

        if (userposts && search) {
            db.posts.get_user_titled_posts(id, search)
            .then(posts => res.status(200).send(posts))
            .catch(err => res.status(500).send(err));
        } else if (!userposts && !search) {
            db.posts.get_not_user_posts(id)
            .then(posts => res.status(200).send(posts))
            .catch(err => res.status(500).send(err));
        } else if (!userposts && search) {
            db.posts.get_not_user_titled_posts(id, search)
            .then(posts => res.status(200).send(posts))
            .catch(err => res.status(500).send(err));
        } else if (userposts && !search) {
            db.posts.get_user_posts(id)
            .then(posts => res.status(200).send(posts))
            .catch(err => res.status(500).send(err));
        }
    }
}