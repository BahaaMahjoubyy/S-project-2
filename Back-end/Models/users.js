const connection = require("../database/index");
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (userId) => {
      const token = jwt.sign({ userId }, 'yourSecretKey', { expiresIn: '1h' });
      return token;
};

module.exports = {
      addUser: (newUser, callback) => {
            const sql = "INSERT INTO user SET username=?, email=?, password=?";
            connection.query(sql, [newUser.username, newUser.email, newUser.password], (err, result) => {
                  if (err) {
                        callback(err, null);
                  } else {
                        const userId = result.insertId;
                        const token = generateToken(userId);
                        callback(null, { userId, token });
                  }
            });
      },

      login: (data, callback) => {
            const sql = "SELECT * FROM user WHERE email=? AND password=?";
            connection.query(sql, [data.email, data.password], (err, result) => {
                  if (err) {
                        callback(err, null);
                  } else {
                        // Assuming the first user in the result is the one we want
                        const userId = result.length > 0 ? result[0].id : null;
                        const token = userId ? generateToken(userId) : null;
                        callback(null, { userId, token });
                  }
            });
      },

      deleteUser: (id, callback) => {
            const sql = "DELETE FROM user WHERE id=?";
            connection.query(sql, [id], (err, results) => {
                  callback(err, results);
            });
      },

      getUserById: (id, callback) => {
            const sql = "SELECT * FROM user WHERE id=?";
            connection.query(sql, [id], (err, result) => {
                  callback(err, result);
            });
      },
};
