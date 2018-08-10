const router = require("express").Router();
const PartnersController = require("../../controllers/partnersController");

// Matches with "/admin/partners"
router.route("/admin/partners")
  .get(PartnersController.findAll)
  .post(PartnersController.create);

// Matches with "/api/books/:id"
router
  .route("/admin/partners/_id")
  .get(PartnersController.findById)
  .put(PartnersController.update)
  .delete(PartnersController.remove);

module.exports = router;