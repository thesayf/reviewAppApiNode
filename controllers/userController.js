const bodyParser = require('body-parser')
const userFactory = require('../factories/userFactory')
var jsonParser = bodyParser.json()

module.exports = (app) => {

    app.post('/users', jsonParser, async (req, res) => {
        try {
            const newUser = await userFactory(req);
            const savedUser = await newUser.save();
            await res.json(savedUser);
        }
        catch(err) {
            console.log(err)
            await res.json({error: "there seems to be an error"})
        }
    })

    app.delete('/users/:id', async (req, res) => {
        try{
           const user = await User.findOneAndRemove({ _id: req.params.id })
           await res.send(user)
        }
        catch(err) {
            console.log(err)
        }
    })

    app.post('/users/follow-user', jsonParser, async (req, res) => {
        try {
           if(req.body.followedUser === req.body.user_id) return res.json({message: "you cannot follow yourself"});
           const followedUser = await User.findById({_id: req.body.followedUser});
           if(followedUser.followers.includes(req.body.user_id)) return res.json({message: "you have already followed this user"});
           await followedUser.followers.push(req.body.user_id);
           await followedUser.save();
           const followingUser = await User.findById({_id: req.body.user_id});
           await followingUser.followed.push(followedUser._id);
           await followingUser.save();
           await res.send("you have successfully followed this person");
        }
        catch(err) {
            console.log(err)
        }
    })

    app.post('/users/unfollow-user', jsonParser, async (req, res) => {
        try {
            const followedUser = await User.findById({_id: req.body.followedUser});
            await followedUser.followers.pop(req.body.user_id);
            await followedUser.save();
            const followingUser = await User.findById({_id: req.body.user_id});
            await followingUser.followed.pop(followedUser._id);
            await followingUser.save(); 
            await res.send("You have successfully unfollowed this person");
        }
        catch(err){
            console.log(err)
        }
    })

    app.get('/users/:id/followers', async (req, res) => {        
        try{
            const users = await User.findById({_id: req.params.id}).populate('followers')
            await res.json(users)
        }
        catch{

        }
    })

    app.get('/users/:id/followed', async (req, res) => {
        try{
            const users = await User.findById({_id: req.params.id}).populate('followed')
            await res.json(users)
        }
        catch{

        }
    })


}
