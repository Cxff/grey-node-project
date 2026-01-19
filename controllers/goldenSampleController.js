const fs = require("fs");

const goldenSamples = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/golden-samples.json`),
);

const sampleItems = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/golden-sample-items.json`),
);

exports.getSimpleList = (req, res) => {
  const { evaluationModel } = req.body;

  const simpleList = goldenSamples.map((gs) => ({
    goldenSampleId: gs.goldenSampleId,
    goldenSampleName: gs.goldenSampleName,
    ownerId: gs.ownerId,
  }));

  res.status(200).json({
    success: true,
    result: simpleList,
    message: "success",
    errCode: 200,
  });
};

exports.getBaseInfo = (req, res) => {
  const { goldenSampleId } = req.query;

  const gs = goldenSamples.find((g) => g.goldenSampleId === goldenSampleId);

  if (!gs) {
    return res.status(404).json({
      success: false,
      result: null,
      message: "Golden Sample not found",
      errCode: 404,
    });
  }

  const result = {
    id: gs.goldenSampleId,
    name: gs.goldenSampleName,
    description: gs.description,
    ownerId: gs.ownerId,
    memberIds: gs.memberIds,
    evalationModel: gs.evalationModel,
  };

  res.status(200).json({
    success: true,
    result,
    message: "success",
    errCode: 200,
  });
};

exports.getSampleItemList = (req, res) => {
  const { goldenSampleId, applicableScopeList } = req.body;

  let items = sampleItems.filter(
    (item) => item.goldenSampleId === goldenSampleId,
  );

  // Filter by applicableScopeList if provided (Mock logic: if item has ANY of the provided scopes)
  // Or simply attach the requested scopes to the result as per prompt requirement implies structure response?
  // "响应数据 result返回data { ... applicableScopes: ... }"
  // The requirement seems to ask to return items belonging to the goldenSampleId.
  // The input 'applicableScopeList' might be for filtering or just context.
  // Given "Mock", I will filter items that match the goldenSampleId.
  // And for the returned items, I will ensure they have the structure.

  // Refined Logic: If applicableScopeList is passed, maybe filter items that contain these scopes?
  // Since my mock data has default scopes, I'll just return the items for the GS ID.

  const result = items.map((item) => ({
    itemId: item.itemId,
    answerContent: item.answerContent,
    inputContent: item.inputContent,
    applicableScopes: item.applicableScopes,
  }));

  res.status(200).json({
    success: true,
    result: result,
    message: "success",
    errCode: 200,
  });
};
