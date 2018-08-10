const router = require("express").Router();
const RolesController = require("../../controllers/rolesController");

// Matches with "/admin/partners"
router.route("/admin/roles")
  .get(RolesController.findAll)
  .post(RolesController.create);

// Matches with "/api/books/:id"
router
  .route("/admin/roles/_id")
  .get(RolesController.findById)
  .put(RolesController.update)
  .delete(RolesController.remove);

module.exports = router;