module.exports.comment = async (req, user) => {
return {
    comment: req.body.comment,
    commentator: {
        id: req.body.userId
    }
  }
}