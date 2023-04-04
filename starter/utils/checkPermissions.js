const { UnauthenticatedError } = require("../errors");

const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);
  if (requestUser.role === "admin") return; // if admin, you're good

  if (requestUser.userId === resourceUserId.toString()) return; // if creator of the resource, you're good

  throw new UnauthenticatedError("Not authorized to access this route");
};

module.exports = checkPermissions;
