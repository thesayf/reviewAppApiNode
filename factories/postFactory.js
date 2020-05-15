module.exports = (req, video) => {
    return new Post({
        user: req.body.id,
        title: req.body.title,
        description: req.body.description,
        lat: 40.12, 
        lon: -71.34,
        video: video,
        tags: req.body.tags
    })
}