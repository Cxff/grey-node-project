const fs = require("fs");
const path = require("path");

const genId = () => Math.random().toString(36).substring(2, 10);

const evaluationItems = [];
const evaluationIds = [
  "eval-lmznyp37",
  "eval-3eq1rn5m",
  "eval-qfdy49f5",
  "eval-hg476w8k",
  "eval-ynnlthfv",
];

const ITEM_STATUS_ENUM = ["success", "fail", "executing"];
const RESULT_STATUS_ENUM = [
  "awaitingEvaluation",
  "failedToExecute",
  "inProgress",
  "awaitingArbitration",
  "inArbitration",
  "needsOptimization",
  "passed",
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

evaluationIds.forEach((evalId) => {
  const itemCount = Math.floor(Math.random() * 5) + 3; // 3 to 7 items per evaluation
  for (let i = 0; i < itemCount; i++) {
    evaluationItems.push({
      id: genId(), // Changed to string/number ID as per requirement "id: number" but generated string before. I'll use random number here or keep string if consistent. Requirement said "id: number". I will use number.
      // Wait, requirement says "id: number". I'll generate a random number.
      id: Math.floor(Math.random() * 1000000),

      evaluationId: evalId, // Keeping this for filtering, though not in response interface explicitly, needed for logic

      evaluationExecuteStatus: getRandomElement(ITEM_STATUS_ENUM),
      evaluationExecuteStatusName: "Mock Status Name",

      evaluationResultStatus: getRandomElement(RESULT_STATUS_ENUM),
      evaluationResultStatusName: "Mock Result Name",

      operationList: [
        { code: "VIEW", name: "View" },
        { code: "RETRY", name: "Retry" },
      ],

      inputList: [
        {
          id: 1,
          code: 101,
          name: "Input 1",
          inputType: "text",
          value: `Input value ${i}`,
        },
      ],

      goldenSampleOutput: [
        {
          id: 1,
          code: 201,
          name: "Golden Output",
          outputType: "text",
          value: "Expected output",
        },
      ],

      modelOutput: [
        {
          id: 1,
          code: 301,
          name: "Model Output",
          outputType: "text",
          value: "Actual output",
        },
      ],

      evaluationFailReson: Math.random() > 0.8 ? ["Timeout", "Error 500"] : [],

      evaluationScore: {
        score: Math.floor(Math.random() * 100),
        evaluationDimensionScoreLiast: [
          {
            score: Math.floor(Math.random() * 100),
            id: 1,
            code: 1001,
            name: "Accuracy",
          },
          {
            score: Math.floor(Math.random() * 100),
            id: 2,
            code: 1002,
            name: "Safety",
          },
        ],
      },

      evalationModel: {
        id: 1,
        name: "GPT-4 Model",
        input: [],
        output: [],
        evaluationDimensionList: [
          { id: 1, code: 1001, name: "Accuracy" },
          { id: 2, code: 1002, name: "Safety" },
        ],
      },

      applicableScopeList: [{ id: 1, name: "Engineering" }],
    });
  }
});

const dataDir = path.join(process.cwd(), "dev-data", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(
  path.join(dataDir, "evaluation-items.json"),
  JSON.stringify(evaluationItems, null, 2)
);
console.log("Evaluation items data regenerated with new structure.");
