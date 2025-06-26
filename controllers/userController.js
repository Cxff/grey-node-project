const fs = require("node:fs");

let usersData = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  if (!usersData) {
    return res.status(500).json({ status: "fail", message: "not Data" });
  }
  res.status(200).json({
    status: "success",
    results: usersData.length,
    data: {
      users: usersData,
    },
  });
};
exports.createUser = (req, res) => {
  const newUser = req.body;
  if (!newUser || !newUser.name) {
    res.status(400).json({
      status: "fail",
      message: "添加失败",
    });
  }

  const newId = usersData.length ? usersData[usersData.length - 1].id + 1 : 1;
  const userWithId = { id: newId, ...newUser };

  usersData.push(userWithId);

  writeFileSync(usersDataPath, JSON.stringify(usersData), "utf-8");

  res.status(201).json({
    status: "success",
    data: {
      user: userWithId,
    },
  });
};
exports.getUser = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = usersData.find((tour) => tour.id === id);
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
};
exports.updateUser = (req, res) => {
  const id = req.params.id * 1;
  const tour = usersData.find((tour) => tour.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Not Found",
    });
  }
};
exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;
  const tour = usersData.find((tour) => tour.id === id);
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
