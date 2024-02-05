const model = require("../Models/users");
module.exports = {
      add: (req, res) => {
            let newUser = req.body;
            model.addUser(newUser, (err, results) => {
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
};