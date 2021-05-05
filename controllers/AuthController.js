const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ username, password: hashedPassword });
    req.session.user = user;
    return res.status(201).json({
      status: "succes",
      data: { user },
    });
  } catch (e) {
    res.status(500);
    console.error(e);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.send(404).json({
        status: "fail",
        message: "incorrect password",
      });

    const isCorrectPass = await bcrypt.compare(password, user.password);
    if (!isCorrectPass) {
      res.status(404).json({
        status: "fail",
        message: "incorrect password",
      });
    }

    req.session.user = user;
    res.status(200).json({
      status: "succes",
    });
  } catch (e) {
    res.status(500);
    console.error(e);
  }
};
