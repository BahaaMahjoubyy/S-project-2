const model = require("../Models/posts");

module.exports = {
    add: (req, res) => {
        let newPost = req.body;
        model.addPost(newPost, (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(results)
            }
        });
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
        const title = req.body.title
        model.search(title, (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(results)
            }
        });
    },
    getAllPosts: (req, res) => {
        model.getAll((err, posts) => {
            if (err) {
                res.status(500).send(err)
            } else {
                res.json(posts)
            }
        })
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
