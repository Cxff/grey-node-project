const express = require("express");
const goldenSampleController = require("../controllers/goldenSampleController");

const router = express.Router();

// 黄金样例集
router.route("/simpleList").post(goldenSampleController.getSimpleList);
// 黄金样例集基本信息
router.route("/baseInfo").get(goldenSampleController.getBaseInfo);
// 黄金样例集详情
router.route("/sampleItemList").post(goldenSampleController.getSampleItemList);

module.exports = router;
