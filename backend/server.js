const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

const endPoints = express.Router();
const app = express();
const PORT = 4000;
const DB = "mongodb://localhost/blog";
const Schema = mongoose.Schema;

app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Successfully connected to database'));

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
});

const Post = mongoose.model("Post", postSchema);
app.use('/api', endPoints);

//API Routing index
endPoints.get('/docs', (req, res) => {
    res.send(`<p>Basic REST API</p>
        <ul>
           <li> All posts - <a  href="/api/posts">/api/posts</a></li>
           <li> Single post : 1 - <a href="/api/post/60c60ac35e85ea76048db39d">/api/posts/:id</a></li>
           <li> Single post : If no post found - <a href="/api/post/3155">/api/posts/:id</a></li>
        </ul>`);
});

// ** GET METHODS **
//Display all posts
endPoints.get('/posts', (req, res) => {
    Post.find({}, (error, posts) => {
        if (error) {
            res.status(400).error(error)
            return
        }
        res.status(200).send({
            response: posts
        });
    });
});

//Display one post
endPoints.get('/post/:id', (req, res) => {
    const id = req.params.id
    Post.findById(id, (error, post) => {
        if (error || !post) {
            res.status(400).send({
                error: true,
                message: "Post not found"
            });
        } else {
            res.status(200).send({
                response: post
            });
        }
    });
});

//Get posts by category
endPoints.get('/posts/:category', (req, res) => {
    Post.find({}, (error, posts) => {
        const category = req.params.category
        if (error) {
            res.status(400).error(error)
            return
        }
        res.status(200).send({
            response: posts.filter(post => post.category === category)
        });
    });
});

// ** POST METHODS **
// Post new post
endPoints.post('/post/add', (req, res) => {
    const {body} = req
    const newPost = new Post(body)
    newPost.save(error => {
        if (error) {
            res.status(400).send({
                error: `error adding new post ${error}`
            });
            return;
        }
        res.status(200).send({
                response: `post successfully added`
            });
    });
});

