const db = require("../models");

//Defining methods for the rolesController
module.exports = {
    findAll: function(req, res) {
        db.Role
            .find(req.query)
            .sort({ role })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByRole: function(req, res) {
        db.Role
            .findbyRole(HTMLTableRowElement.params.role)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};