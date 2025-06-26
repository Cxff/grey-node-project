const fs = require("node:fs");

let toursData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`id===${val}`);
  const id = req.params.id * 1;
  const tour = toursData.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Not Found",
    });
  }
  next()
}

exports.getAllTours = (req, res) => {
  if (!toursData) {
    return res
      .status(500)
      .json({ status: "fail", message: "Could not load data" });
  }
  res.status(200).json({
    status: "success",
    results: toursData.length,
    requestTime: req.requestTime,
    data: {
      tours: toursData,
    },
  });
};
exports.createTour = (req, res) => {
  const newTour = req.body;
  if (!newTour || !newTour.name) {
    res.status(400).json({
      status: "fail",
      message: "添加失败",
    });
  }

  const newId = toursData.length ? toursData[toursData.length - 1].id + 1 : 1;
  const tourWithId = { id: newId, ...newTour };

  toursData.push(tourWithId);

  writeFileSync(toursDataPath, JSON.stringify(toursData), "utf-8");

  res.status(201).json({
    status: "success",
    data: {
      tour: tourWithId,
    },
  });
};
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = toursData.find((tour) => tour.id === id);
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
};
exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = toursData.find((tour) => tour.id === id);
};
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = toursData.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Not Found",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};
