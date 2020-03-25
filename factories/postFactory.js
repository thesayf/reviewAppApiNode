module.exports = (req) => {
    return new Post({
        user: "5e7b7da5dcf15d3298402e77",
        title: req.body.title,
        description: req.body.description,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
        videoURL: req.body.videoURL
    })
}