const connection = require("../database/index")


module.exports = {
      addUser: (newUser, callback) => {
            const sql = "INSERT INTO user SET username=?, email=?, password=?"
            connection.query(sql, [newUser.username, newUser.email, newUser.password], (err, result) => {
                  callback(err, result)
            })
      },
      login: (data, callback) => {
            const sql = "SELECT * FROM user WHERE email=? AND password=?"
            connection.query(sql, [data.email, data.password], (err, result) => {
                  callback(err, result)
            })
      },
      DELETE: (id, callback) => {
            const sql = "DELETE FROM user WHERE id=?"
            connection.query(sql, [id], (err, results) => {
                  callback(err, results)
            })
      },
}