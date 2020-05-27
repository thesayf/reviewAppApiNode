const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '214206807961-mg9102p9h7l534sp78abfeft1gm4tpo0.apps.googleusercontent.com' /*move to env in prod */
const bodyParser = require('body-parser');
const userFactory = require('../factories/userFactory');
var jsonParser = bodyParser.json();
const User = require('../models/User');
const googleVerify = require('../utils/google.verify')

module.exports = (app) => {

    app.post('/users', jsonParser, async (req, res) => {
        try {
            const newUser = await userFactory(req);
            const savedUser = await newUser.save();
            await res.json(savedUser);
        }
        catch (err) {
            console.log(err)
            await res.json({ error: "there seems to be an error" })
        }
    });

    app.get('/users', jsonParser, async (req, res) => {
        console.log('inside get users');

        try {
            const user = await User.find();
            await res.json(user);
        }
        catch (err) {
            console.log(err)
            await res.json({ error: "there seems to be an error" })
        }
    });

    app.get('/users/:id', jsonParser, async (req, res) => {
        try {
            const user = await User.findById({ _id: req.params.id });
            await res.json(user);
        }
        catch (err) {
            console.log(err)
            await res.json({ error: "there seems to be an error" })
        }
    });

    app.delete('/users/:id', async (req, res) => {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.id })
            await res.send(user)
        }
        catch (err) {
            console.log(err)
        }
    });

    app.post('/users/follow-user', jsonParser, async (req, res) => {
        try {
            if (req.body.followedUser === req.body.user_id) return res.json({ message: "you cannot follow yourself" });
            const followedUser = await User.findById({ _id: req.body.followedUser });
            if (followedUser.followers.includes(req.body.user_id)) return res.json({ message: "you have already followed this user" });
            await followedUser.followers.push(req.body.user_id);
            await followedUser.save();
            const followingUser = await User.findById({ _id: req.body.user_id });
            await followingUser.followed.push(followedUser._id);
            await followingUser.save();
            await res.send("you have successfully followed this person");
        }
        catch (err) {
            console.log(err)
        }
    });

    app.post('/users/unfollow-user', jsonParser, async (req, res) => {
        try {
            const followedUser = await User.findById({ _id: req.body.followedUser });
            await followedUser.followers.pop(req.body.user_id);
            await followedUser.save();
            const followingUser = await User.findById({ _id: req.body.user_id });
            await followingUser.followed.pop(followedUser._id);
            await followingUser.save();
            await res.send("You have successfully unfollowed this person");
        }
        catch (err) {
            console.log(err)
        }
    });

    app.get('/users/:id/followers', async (req, res) => {
        try {
            const users = await User.findById({ _id: req.params.id }).populate('followers')
            await res.json(users)
        }
        catch (err) {

        }
    });

    app.get('/users/:id/followed', async (req, res) => {
        try {
            const users = await User.findById({ _id: req.params.id }).populate('followed')
            await res.json(users)
        }
        catch (err) {

        }
    });

    app.post('/users/googleSignIn', async (req, res) => {
        console.log('inside the signin route');
        const payload = await googleVerify(req)
        
        const { sub, email, name } = payload;
        console.log('payload user: ', name, email, sub);
        /*
        * use 'sub' property as uid to either find a unique user or create one with google credentials
        */
        User.findOne({ userid: sub })
            .then(existingUser => {
                if (existingUser) return existingUser
                return new User({
                    name,
                    email,
                    img: payload['picture'],
                    userid
                })
                    .save()
            })
            .then(user => console.log('user: ', user))
            .catch(error => console.log('error: ', error))

        // const { idToken } = req.body
        // console.log(idToken);
        // const client = new OAuth2Client(CLIENT_ID);
        // async function verify() {
        //     console.log('inside the verify func');
        //     const ticket = await client.verifyIdToken({
        //         idToken,
        //         audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        //         // Or, if multiple clients access the backend:
        //         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        //     });
        //     const payload = ticket.getPayload();
        //     const userid = payload['sub'];

        //     if ()
        //     console.log(ticket);

        //     // If request specified a G Suite domain:
        //     // const domain = payload['hd'];
        // }
        // verify().catch(console.error);
        // res.send({ "response": "hello body" })
    })
}
