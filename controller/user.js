const Users = require("../model/user");
const generateToken = require("../utils/generateToken");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json("Invalid email or password !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error !");
  }
};

exports.registerUser = async (req, res) => {
  try {
    const userExists = await Users.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).json("User already exists !");
    }

    const user = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
      avatar: req.body.avatar,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json("Invalid user data !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error !");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { email, password, name, mobile, avatar } = req.body;
    const user = await Users.findOne({ email: req.body.email });

    if (user) {
      user.email = email;
      user.password = password;
      user.name = name;
      user.mobile = mobile;
      user.avatar = avatar;
      const updatedUser = await user.save();
      if (updatedUser) {
        return res.status(200).json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          mobile: updatedUser.mobile,
          avatar: updatedUser.avatar,
        });
      }
    } else {
      return res.status(400).json("Invalid user data !");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error !");
  }
};

exports.getUserList = async (req, res) => {
  try {
    const users = await Users.find({}, { password: 0 });

    if (users) {
      return res.status(200).json(users);
    } else {
      return res.status(400).json({
        status: "failed",
        message: "users not found",
        error: err,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
      error,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (user) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        avatar: user.avatar,
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "users not found",
        error: err,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "something went wrong",
      error,
    });
  }
};
