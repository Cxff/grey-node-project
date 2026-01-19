const express = require("express");
const organizationController = require("../controllers/organizationController");

const router = express.Router();

// 组织架构-适用范围列表
router
  .route("/applicableScope/list")
  .get(organizationController.getApplicableScopes);

router.route("/users/my").get(organizationController.getMyUser);

module.exports = router;
