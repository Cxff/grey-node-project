const express = require("express");
const evaluationController = require("../controllers/evaluationController");

const router = express.Router();

// 获取最新的评价
router
  .route("/getNewestEvaluation")
  .post(evaluationController.getNewestEvaluation);

// 获取评价基本信息
router.route("/baseInfo/get").get(evaluationController.getEvaluationBaseInfo);

// 获取评价项列表
router
  .route("/evaluationItemList/get")
  .post(evaluationController.getEvaluationItemList);

router
  .route("/evaluationItem/reExecuteItem")
  .post(evaluationController.reExecuteEvaluationItem);

module.exports = router;
