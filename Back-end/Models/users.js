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
                        if (result.length > 0) {
                              const user = result[0];
                              const userId = user.id;
                              const token = generateToken(userId);
                              callback(null, { userId, token, user });
                        } else {
                              callback(null, { userId: null, token: null, user: null });
                        }
                  }
            });
      },

      deleteUser: (id, callback) => {
            const sql = "DELETE FROM user WHERE id=?";
            connection.query(sql, [id], (err, results) => {
                  callback(err, results);
            });
      },

      getUserByemail: (email, callback) => {
            const sql = "SELECT * FROM user WHERE email=?";
            connection.query(sql, [email], (err, result) => {
              callback(err, result);
            });
          },
          
      getAllUsers: (callback) => {
            const sql = "SELECT * FROM user";
            connection.query(sql, (err, result) => {
                  callback(err, result);
            });
      },

};
