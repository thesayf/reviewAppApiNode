module.exports = (req) => {
    return new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        img: req.body.img
    })
}