import { readFileSync, writeFileSync } from "node:fs";
import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
const port = 3000;

const toursDatapath = path.resolve(
  __dirname,
  "dev-data",
  "data",
  "tours-simple.json"
);
let toursData = JSON.parse(readFileSync(toursDatapath, "utf-8"));

async function loadTourData(filePath) {
  try {
    const data = await readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("❌ Error reading tour data:", error);
    return null;
  }
}

app.get("/api/v1/tours", async (req, res) => {
  // const toursData = await loadTourData(toursDatapath);
  if (!toursData) {
    return res
      .status(500)
      .json({ status: "fail", message: "Could not load data" });
  }
  res.status(200).json({
    status: "success",
    results: toursData.length,
    data: {
      tours: toursData,
    },
  });
});

app.post("/api/v1/tours", (req, res) => {
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

  writeFileSync(toursDatapath, JSON.stringify(toursData), "utf-8");

  res.status(201).json({
    status: "success",
    data: {
      tour: tourWithId,
    },
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = toursData.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Not Found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
