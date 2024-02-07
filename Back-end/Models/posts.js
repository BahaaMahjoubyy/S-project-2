const connection = require("../database/index");
const cloudinary = require('cloudinary').v2;

module.exports = {
    addPost: (newPost, callback) => {
        // Ensure that image field is provided
        if (!newPost.image) {
            callback(new Error('Image is required'));
            return;
        }

        // If image is uploaded via file, upload it to Cloudinary
        if (newPost.file) {
            cloudinary.uploader.upload(newPost.file.path, (err, result) => {
                if (err) {
                    callback(err);
                    return;
                }
                newPost.image = result.secure_url; // Set the image URL to the Cloudinary URL
                insertPost(newPost, callback);
            });
        } else {
            // Otherwise, proceed with the provided image URL
            insertPost(newPost, callback);
        }
    },

    search: (title, callback) => {
        const sql = "SELECT * FROM posts WHERE title=?";
        connection.query(sql, title, (err, result) => {
            callback(err, result);
        });
    },

    DELETE: (id, callback) => {
        const sql = "DELETE FROM posts WHERE id=?";
        connection.query(sql, [id], (err, results) => {
            callback(err, results);
        });
    },

    getAll: (callback) => {
        const query = "SELECT * FROM posts";
        connection.query(query, (err, results) => {
            callback(err, results);
        });
    },

    updatePost: (postId, updatedPost, callback) => {
        const sql = "UPDATE posts SET title=?, content=?, image=? WHERE id=?";
        const { title, content, image } = updatedPost;
        connection.query(sql, [title, content, image, postId], (err, results) => {
            callback(err, results);
        });
    }
};

function insertPost(newPost, callback) {
    const sql = "INSERT INTO posts SET ?";
    connection.query(sql, newPost, (err, result) => {
        callback(err, result);
    });
}
