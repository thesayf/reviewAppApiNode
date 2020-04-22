module.exports = (req) => {
    return new Post({
        user: req.body.id,
        title: req.body.title,
        description: req.body.description,
        geo_with_lat_lon: { lat: 40.12, lon: -71.34},
        tags: req.body.tags
    })
}