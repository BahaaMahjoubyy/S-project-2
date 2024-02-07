// posts.js (Controller)

const model = require("../Models/posts");

function savePost(newPost, res) {
    model.addPost(newPost, (err, results) => {
        if (err) {
            console.error('Error saving post:', err);
            res.status(500).send('Error saving post');
        } else {
            res.json(results);
        }
    });
}

module.exports = {
    add: (req, res) => {
        let newPost = req.body;

        if (req.file) {
            // If there's a file uploaded
            newPost.file = req.file; // Pass the file to newPost
        }

        savePost(newPost, res);
    },

    DELETE: (req, res) => {
        model.DELETE(req.params.id, (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(results);
            }
        });
    },

    searchBytitle: (req, res) => {
        const title = req.body.title;
        model.search(title, (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(results);
            }
        });
    },

    getAllPosts: (req, res) => {
        model.getAll((err, posts) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(posts);
            }
        });
    },

    update: (req, res) => {
        const postId = req.params.id;
        const updatedPost = req.body;

        model.updatePost(postId, updatedPost, (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(results);
            }
        });
    }
};

