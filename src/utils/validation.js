const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  console.log(firstName);
  if (!firstName || !lastName) {
    throw new Error("Name is not Valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Emailis not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Plz enter a Strong password");
  }
};

module.exports = { validateSignupData };
