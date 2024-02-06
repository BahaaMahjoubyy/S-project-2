const connection = require("../database/index");

module.exports = {
    addPost: (newUser, callback) => {
        const sql = "INSERT INTO posts SET title=?, content=?, image=?";
        connection.query(sql, [newUser.title, newUser.content, newUser.image], (err, result) => {
            callback(err, result);
        });
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
