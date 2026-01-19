const fs = require("fs");

const promptDetails = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/prompt-detail.json`)
);

const promptsData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/prompt-data.json`)
);

exports.getAllPrompts = (req, res) => {
  res.status(200).json({
    success: true,
    result: {
      data: promptsData,
      total: promptsData.length,
    },
    message: "success",
    errCode: 200,
  });
};

exports.getPromptDetail = (req, res) => {
  const id = req.query.promptId || req.params.id;

  const prompt = promptDetails.find((p) => p.promptId === id);

  if (!prompt) {
    return res.status(404).json({
      success: false,
      result: null,
      message: "Prompt not found",
      errCode: 404,
    });
  }

  res.status(200).json({
    success: true,
    result: prompt,
    message: "success",
    errCode: 200,
  });
};

exports.savePromptBlocks = (req, res) => {
  const { promptId, promptVersionId, promptBlockList } = req.body;

  const promptIndex = promptDetails.findIndex((p) => p.promptId === promptId);

  if (promptIndex === -1) {
    return res.status(404).json({
      success: false,
      result: null,
      message: "Prompt not found",
      errCode: 404,
    });
  }

  // Generate new IDs for blocks and replace existing blocks
  const newBlocks = promptBlockList.map((block) => ({
    id: `block-${Math.random().toString(36).substring(2, 10)}`,
    ...block,
    isEditable: true, // Assuming default true as per mock data pattern, or could be passed from FE
  }));

  promptDetails[promptIndex].promptBlocks = newBlocks;
  // Optionally update version ID if needed, but requirements just said replace blocks
  // promptDetails[promptIndex].promptVersionId = promptVersionId;

  // Persist changes to file
  try {
    fs.writeFileSync(
      `${__dirname}/../dev-data/data/prompt-detail.json`,
      JSON.stringify(promptDetails, null, 2)
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Failed to save data",
      errCode: 500,
    });
  }

  res.status(200).json({
    success: true,
    result: promptDetails[promptIndex],
    message: "success",
    errCode: 200,
  });
};

exports.updatePromptBaseInfo = (req, res) => {
  const { promptId, promptName } = req.body;

  // Update in prompt-detail.json
  const promptDetailIndex = promptDetails.findIndex(
    (p) => p.promptId === promptId
  );
  if (promptDetailIndex !== -1) {
    promptDetails[promptDetailIndex].promptName = promptName;
    try {
      fs.writeFileSync(
        `${__dirname}/../dev-data/data/prompt-detail.json`,
        JSON.stringify(promptDetails, null, 2)
      );
    } catch (err) {
      return res.status(500).json({
        success: false,
        result: null,
        message: "Failed to save detail data",
        errCode: 500,
      });
    }
  }

  // Update in prompt-data.json
  const promptDataIndex = promptsData.findIndex((p) => p.promptId === promptId);
  if (promptDataIndex !== -1) {
    promptsData[promptDataIndex].promptName = promptName;
    try {
      fs.writeFileSync(
        `${__dirname}/../dev-data/data/prompt-data.json`,
        JSON.stringify(promptsData, null, 2)
      );
    } catch (err) {
      return res.status(500).json({
        success: false,
        result: null,
        message: "Failed to save list data",
        errCode: 500,
      });
    }
  }

  if (promptDetailIndex === -1 && promptDataIndex === -1) {
    return res.status(404).json({
      success: false,
      result: null,
      message: "Prompt not found",
      errCode: 404,
    });
  }

  res.status(200).json({
    success: true,
    result: { promptId, promptName },
    message: "success",
    errCode: 200,
  });
};

const path = require("path");

exports.evaluatePrompt = (req, res) => {
  // Mock logic: generate a random evaluationId
  const evaluationId = `eval-${Math.random().toString(36).substring(2, 10)}`;

  // Also create a mock entry in evaluation-items.json for this new ID so Step 6 works
  const itemsPath = path.join(__dirname, "../dev-data/data/evaluation-items.json");
  let evaluationItems = [];
  try {
    evaluationItems = JSON.parse(fs.readFileSync(itemsPath));
  } catch (err) {
    evaluationItems = [];
  }

  // Create 3 mock items for this new evaluation
  for (let i = 0; i < 3; i++) {
    evaluationItems.push({
      id: Math.floor(Math.random() * 1000000),
      evaluationId: evaluationId,
      evaluationExecuteStatus: "executing",
      evaluationExecuteStatusName: "Executing",
      evaluationResultStatus: "awaitingEvaluation",
      evaluationResultStatusName: "Awaiting Evaluation",
      operationList: [],
      inputList: [
        {
          id: 1,
          code: 101,
          name: "Input 1",
          inputType: "text",
          value: `Input for new eval ${i}`,
        },
      ],
      goldenSampleOutput: [],
      modelOutput: [],
      evaluationFailReson: [],
      evaluationScore: {
        score: 0,
        evaluationDimensionScoreLiast: [],
      },
      evalationModel: {
        id: 1,
        name: "GPT-4 Model",
        input: [],
        output: [],
        evaluationDimensionList: [],
      },
      applicableScopeList: [],
    });
  }

  try {
    fs.writeFileSync(itemsPath, JSON.stringify(evaluationItems, null, 2));
  } catch (err) {
    console.error("Failed to write evaluation items mock data:", err);
  }

  res.status(200).json({
    success: true,
    result: {
      evaluationId,
    },
    message: "success",
    errCode: 200,
  });
};
