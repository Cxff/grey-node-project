const express = require("express");
const promptController = require("../controllers/promptController");

const router = express.Router();

router.route("/list").get(promptController.getAllPrompts);

router.route("/detail").get(promptController.getPromptDetail);

router.route("/save").post(promptController.savePromptBlocks);

router.route("/baseInfo/update").post(promptController.updatePromptBaseInfo);

// 发起评测
router.route("/evaluate").post(promptController.evaluatePrompt);

module.exports = router;
