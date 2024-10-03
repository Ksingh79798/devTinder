const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked!");
  /* Write Logic of checking if the request i.e user is Authorized or not */
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("UnAuthorized request");
  } else {
    next(); /*here called the rH(fn) */
  }
};

const userAuth = (req, res, next) => {
  console.log("Admin auth is getting checked!");
  /* Write Logic of checking if the request i.e user is Authorized or not */
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (!isAdminAuthorized) {
    res.status(401).send("UnAuthorized request");
  } else {
    next(); /*here called the rH(fn) */
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
