const { uuid } = require("uuidv4");

const { encryptPassword } = require("../../utils/encrypt");
const { sendPasswordTemplate } = require("../../templates/password.template");
const { sendEmail } = require("../mail/email.service");

module.exports.createUser = async (data) => {
  if (!data) {
    throw new Error("No data provided");
  }

  if (typeof data != "object") {
    throw new Error("Data must be an object");
  }

  delete data.role;

  // Default password
  let id = uuid();

  data.password = id.split("-").pop();

  const user = await User.create(data);

  // EXPERIMENTAL!!!!

  try {
    // Send email...
    await sendEmail(
      data.email,
      "Bienvenido a la academia!",
      sendPasswordTemplate(data.password)
    );
  } catch (e) {
    // What to do with error?
  }

  try {
    return user.toJSON();
  } catch (e) {
    return null;
  }
};
