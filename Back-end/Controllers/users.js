const model = require("../Models/users");
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
      const token = jwt.sign({ userId }, 'secretkey', { expiresIn: '1h' });
      return token;
};

module.exports = {
      add: (req, res) => {
            let newUser = req.body;
            model.addUser(newUser, (err, results) => {
                  if (err) {
                        res.status(500).send(err);
                  } else {
                        res.json(results);
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

      // authenticateJWT: (req, res, next) => {
      //       const token = req.header('Authorization');

      //       if (!token) {
      //             return res.status(401).json({ message: 'Authorization token is missing' });
      //       }

      //       try {
      //             const decoded = jwt.verify(token, 'yourSecretKey');
      //             req.user = decoded;
      //             next();
      //       } catch (error) {
      //             return res.status(401).json({ message: 'Invalid token' });
      //       }
      // },


      authenticateJWT: (req, res, next) => {
            const token = req.header('Authorization');

            if (!token) {
                  return res.status(401).json({ message: 'Authorization token is missing' });
            }

            try {
                  // Check if the token starts with 'Bearer ' and extract the actual token
                  const [bearer, actualToken] = token.split(' ');

                  if (bearer !== 'Bearer' || !actualToken) {
                        return res.status(401).json({ message: 'Invalid token format' });
                  }

                  const decoded = jwt.verify(actualToken, 'yourSecretKey');
                  req.user = decoded;
                  next();
            } catch (error) {
                  if (error.name === 'JsonWebTokenError') {
                        return res.status(401).json({ message: 'Invalid token' });
                  } else if (error.name === 'TokenExpiredError') {
                        return res.status(401).json({ message: 'Token has expired' });
                  } else {
                        return res.status(500).json({ message: 'Internal server error' });
                  }
            }
      },
      login: (req, res) => {
            const loginData = req.body;
            model.login(loginData, (err, result) => {
                  if (err) {
                        res.status(500).send(err);
                  } else {
                        if (result.userId) {
                              const token = generateToken(result.userId);
                              res.json({ userId: result.userId, token });
                        } else {
                              res.status(401).json({ message: 'Invalid credentials' });
                        }
                  }
            });
      },

      getUserById: (req, res) => {
            const userId = req.params.id;

            model.getUserById(userId, (err, result) => {
                  if (err) {
                        res.status(500).send(err);
                  } else {
                        if (result.length === 0) {
                              res.status(404).json({ message: "User not found" });
                        } else {
                              res.json(result[0]);
                        }
                  }
            });
      },
};
