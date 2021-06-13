const express = require("express")
const mongoose = require("mongoose")
const data = require("./posts")

const app = express()
const PORT = 4000
const DB = "mongodb://localhost/blog"
const Schema = mongoose.Schema

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Successfully connected to database'))

//Object schema for post operations
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        index: true,
        unique: true
    },
    author: String,
    category: String,
})

const Post = mongoose.model("Post", postSchema)

//Routing index
app.get('/', function (req, res) {
    res.send(`<p>Basic REST API</p>
        <ul>
           <li> All posts - <a href="/api/posts">/api/posts</a></li>
           <li> Single post : 1 - <a href="/api/post/60c60ac35e85ea76048db39d">/api/posts/:id</a></li>
           <li> Single post : 3 - <a href="/api/post/3155">/api/posts/:id</a></li>
        </ul>`);
})

//API Home
app.get('/api', function (req, res) {
    res.send('Welcome to a basic API REST!')
})


// ** GET METHODS **
//Display all posts
app.get('/api/posts', function (req, res) {
    Post.find({}, (error, posts) => {
        if (error) {
            res.status(400).error(error)
            return
        }
        res.status(200).send({
            response: posts
        })
    })
})

//Display one post
app.get('/api/post/:id', function (req, res) {
    const id = req.params.id
    Post.findById(id, (error, post) => {
        if (error || !post) {
            res.status(400).send({
                error: true,
                message: "Post not found"
            })
        } else {
            res.status(200).send({
                response: post
            })
        }
    })
})

