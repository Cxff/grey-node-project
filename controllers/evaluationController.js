const fs = require("fs");
const path = require("path");

let evaluations = [];
try {
  evaluations = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../dev-data/data/evaluation-data.json")
    )
  );
} catch (err) {
  evaluations = [];
}

let evaluationItems = [];
try {
  evaluationItems = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../dev-data/data/evaluation-items.json")
    )
  );
} catch (err) {
  evaluationItems = [];
}

exports.getNewestEvaluation = (req, res) => {
  const { evaluationScope, evaluationScopeId, evaluationScopeVersionId } =
    req.body;

  let evaluationId;
  if (evaluations.length > 0) {
    const randomEval =
      evaluations[Math.floor(Math.random() * evaluations.length)];
    evaluationId = randomEval.id;
  } else {
    evaluationId = `eval-${Math.random().toString(36).substring(2, 10)}`;
  }

  const hasChildEvaluation = Math.random() > 0.5;

  res.status(200).json({
    success: true,
    result: {
      evaluationId,
      hasChildEvaluation,
    },
    message: "success",
    errCode: 200,
  });
};

exports.getEvaluationBaseInfo = (req, res) => {
  const { evaluationId } = req.query; // Corrected from prompt typo

  const evaluation = evaluations.find((e) => e.id === evaluationId);

  if (!evaluation) {
    return res.status(404).json({
      success: false,
      result: null,
      message: "Evaluation not found",
      errCode: 404,
    });
  }

  res.status(200).json({
    success: true,
    result: evaluation,
    message: "success",
    errCode: 200,
  });
};

exports.getEvaluationItemList = (req, res) => {
  const { evaluationId } = req.body;

  // Re-read file to get updated data if it was just regenerated
  try {
    evaluationItems = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../dev-data/data/evaluation-items.json")
      )
    );
  } catch (err) {
    evaluationItems = [];
  }

  const items = evaluationItems.filter(
    (item) => item.evaluationId === evaluationId
  );

  res.status(200).json({
    success: true,
    result: {
      total: items.length,
      evaluationItemList: items,
    },
    message: "success",
    errCode: 200,
  });
};

exports.reExecuteEvaluationItem = (req, res) => {
  const { evaluationItemId } = req.body;

  res.status(200).json({
    success: true,
    result: {
      evaluationItemId,
    },
    message: "success",
    errCode: 200,
  });
};
