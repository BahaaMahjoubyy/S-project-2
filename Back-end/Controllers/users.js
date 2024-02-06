const model = require("../Models/users");
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, 'secretkey', { expiresIn: '1h' });
  return token;
};

module.exports = {
  add: (req, res) => {
    let newUser = req.body;
    model.addUser(newUser, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        const token = generateToken(result.userId);
        res.json({ userId: result.userId, token });
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

  authenticateJWT: (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return next();
    }

    try {
      const decoded = jwt.verify(token, 'secretkey')
      req.user = decoded
      next()
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  },

  login: (req, res) => {
    const loginData = req.body;
    model.login(loginData, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.userId) {
          const token = generateToken(result.userId)
          res.json({ userId: result.userId, token })
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      }
    })
  },

  getUserById: (req, res) => {
    const userId = req.params.id;

    model.getUserById(userId, (err, result) => {
      if (err) {
        res.status(500).send(err)
      } else {
        if (result.length === 0) {
          res.status(404).json({ message: "User not found" });
        } else {
          res.json(result[0])
        }
      }
    });
  },
};














// const model = require("../Models/users");
// const jwt = require('jsonwebtoken');

// const generateToken = (userId) => {
//   const token = jwt.sign({ userId }, 'secretkey', { expiresIn: '1h' });
//   return token;
// };

// module.exports = {
//   add: (req, res) => {
//     let newUser = req.body;
//     model.addUser(newUser, (err, results) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.json(results);
//       }
//     });
//   },

//   DELETE: (req, res) => {
//     model.DELETE(req.params.id, (err, results) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.json(results);
//       }
//     });
//   },

//   authenticateJWT: (req, res, next) => {
//     const token = req.header('Authorization');

//     if (!token) {
//       return res.status(401).json({ message: 'Authorization token is missing' });
//     }

//     try {
//       const decoded = jwt.verify(token, 'secretkey'); // Corrected secret key
//       req.user = decoded;
//       next();
//     } catch (error) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//   },

//   login: (req, res) => {
//     const loginData = req.body;
//     model.login(loginData, (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         if (result.userId) {
//           const token = generateToken(result.userId);
//           res.json({ userId: result.userId, token });
//         } else {
//           res.status(401).json({ message: 'Invalid credentials' });
//         }
//       }
//     });
//   },

//   getUserById: (req, res) => {
//     const userId = req.params.id;

//     model.getUserById(userId, (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         if (result.length === 0) {
//           res.status(404).json({ message: "User not found" });
//         } else {
//           res.json(result[0]);
//         }
//       }
//     });
//   },
// };
