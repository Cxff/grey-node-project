const getApplicableScopes = (req, res) => {
  const applicableScopeList = [
    { id: "scope-1", name: "Engineering" },
    { id: "scope-2", name: "Design" },
    { id: "scope-3", name: "Product" },
    { id: "scope-4", name: "Marketing" },
    { id: "scope-5", name: "Sales" },
  ];

  res.status(200).json({
    success: true,
    result: {
      applicableScopeList,
    },
    message: "success",
    errCode: 200,
  });
};

const getMyUser = (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(200).json({
      success: true,
      result: null,
      message: "用户无权限",
      errCode: 401,
    });
  }

  res.status(200).json({
    success: true,
    result: {
      organizationList: [
        {
          id: 1,
          name: "Default Organization",
          code: 1001,
          status: "active",
          active: true,
        },
      ],
      id: 12345,
      username: name,
      avatar: "https://example.com/avatar.jpg",
      loginFrom: "web",
      status: "active",
    },
    message: "success",
    errCode: 200,
  });
};

module.exports = {
  getApplicableScopes,
  getMyUser,
};
