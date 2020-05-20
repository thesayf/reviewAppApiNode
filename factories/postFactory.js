module.exports = (req, video) => {
    return new Post({
        user: req.body.id,
        title: req.body.title,
        description: req.body.description,
        lat: 40.12, 
        lon: -71.34,
        video: "https://www.biography.com/.image/t_share/MTY2MzU3OTcxMTUwODQxNTM1/steve-jobs--david-paul-morrisbloomberg-via-getty-images.jpg",
        tags: req.body.tags
    })
}