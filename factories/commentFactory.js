

module.exports.comment = async (req, user) => {
return new Comment({
    text: req.body.comment,
    user: req.body.userId,
    post: req.body.postId
  })
}