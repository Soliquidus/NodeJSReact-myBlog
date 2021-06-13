const express = require("express");
const data = require("./posts");
const app = express();
const PORT = 4000;

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

//Routing index
app.get('/', function (req, res) {
    res.send(`<p>Basic REST API</p>
        <ul>
           <li> All posts - <a href="/api/posts">/api/posts</a></li>
           <li> Single post : 1 - <a href="/api/post/1">/api/posts/:id</a></li>
           <li> Single post : 3 - <a href="/api/post/3">/api/posts/:id</a></li>
        </ul>`);
})

//API Home
app.get('/api', function (req, res) {
    res.send('Welcome to a basic API REST!');
})

//Display all posts
app.get('/api/posts', function (req, res) {
    res.send(data);
})

//Display one post
app.get('/api/post/:id', function (req, res) {
    const id = req.params.id;
    const singlePost = data.filter(p => p.id == id);
    res.send(singlePost[0]);
})

