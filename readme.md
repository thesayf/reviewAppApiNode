                                  SETUP INSTRUCTIONS 

1) DOWNLOAD ELASTIC SEARCH AND FOLLOW SET UP INSTRUCTIONS
2) DOWNLOAD KIBANA AND FOLLOW SET UP INSTRUCTIONS
3) NAVIGATE THE KIBANA AND ELASTIC SEARCH BIN FOLDERS AND CLICK ON FILE WITH RESPECTIVE NAMES AND MAKE SURE BOTH ARE RUNNING IN SERPERATE TERMINALS
4) NAVIGATE INSIDE OF THE REVIEWAPPAPINODE FOLDER AND NPM INSTALL
5) NPM START TO RUN THE SERVER
6) IF SUCCESSFUL YOU SHOULD SEE 4 MESSAGES
    1) waiting on port 3000
    2) User Elastic Search Mapping Created
    3) Post Elastic Search Mapping Created
    4) were connected to DB

                                   API ENDPOINTS


###################################POSTS############################################

* GET All Posts
http://localhost:3000/posts
{
    method: 'GET'
}

* GET One Post
http://localhost:3000/posts/:id
{
    method: 'GET'
}

* GET One Users Post
http://localhost:3000/posts/user/:userId
{
    method: 'GET'
}

* Add Post
http://localhost:3000/posts
{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: {
        id: "5e7bea857873c948ddec102c",
        title: "post title",
        description: "Fourth Post Description",
        longitude: 333.333,
        latitude: 444.444, 
        videoURL: "htttp/videobabay",
        tags: ["fun", "to", "be", "here"]
    }
})

* Delete Post
http://localhost:3000/posts/:id
{
    method: 'DELETE'
}

* GET Posts By Tag
http://localhost:3000/posts/search
{
    method: 'POST'
    headers: {'Content-Type': 'application/json'},
    body: {
        query: "to"
    }
}

* GET Posts By Tag and location
http://localhost:3000/posts/search/geo
{
    method: 'POST'
    headers: {'Content-Type': 'application/json'},
    body: {
        query: "to",
        lat: 40.12,
        lon: -71.34
    }
}

* Add Comments 
http://localhost:3000/comments
{
    method: 'POST'
    headers: {'Content-Type': 'application/json'},
    body: {
        userId: "5e861dd8acaac86fbd704cc1",
        postId: "5e96fce6fbf08372a02d7eed",
        comment: "hello this is a test comment"
    }
}

################################# USER ###############################################

* Add User
http://localhost:3000/users
{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: {
        name: "Rori",
        email: "Rori.co.uk",
        password: "Rori"
    }
})

* Delete User
http://localhost:3000/users/:id
{
    method: 'DELETE'
}

* Follow User
http://localhost:3000/users/follow-user
{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: {
        followedUser: "5e84a8c711a3332e4302872b",
        user_id: "5e84a96c11a3332e4302872c",
    }
}

* UnFollow User
http://localhost:3000/users/unfollow
{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: {
        followedUser: "5e84a8c711a3332e4302872b",
        user_id: "5e84a96c11a3332e4302872c",
    }
}

* View all users followers
http://localhost:3000/users/:id/followers
{
    method: 'GET'
}

* View users user is following
http://localhost:3000/users/:id/followed
{
    method: 'GET'
}

* Problems we have
1) Data is coming back from elastic search without the user. Need to find a solution.
2) Need to populate 1 posts comments user
2) Video Upload 
4) Get onto AWS server
5) Add Firebase back in 
6) Error handling
7) Add GraphQL

