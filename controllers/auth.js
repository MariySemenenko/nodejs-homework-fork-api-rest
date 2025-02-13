const { User } = require("../models/user");
 const bcrypt = require("bcrypt");
 const jwt = require("jsonwebtoken");
 const gravatar = require("gravatar");//for avatar
 const path = require("path");
 const fs = require("fs/promises");
 const Jimp = require("jimp");

const { SECRET_KEY } = process.env;

const { ctrl, HttpError } = require("../helpers");

const avatarDir = path.join(__dirname, "../", "public", "avatars");


const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");//if identical email
  }
  const hassPassword = await bcrypt.hash(password, 10);//cache password

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({//save password in cached view
    ...req.body,
    password: hassPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);//compare cheks password
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });//token time live
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "Logout success",
  });
};

const changeSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(
    id,
    { subscription },
    { new: true }
  );
  if (!user) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  Jimp.read(tempUpload)
  .then((avatar) => {
    return avatar
      .resize(250, 250) // resize
      .write(resultUpload); // save
  })
  .catch((err) => {
    console.error(err);
  });
  
  const fileName = `${_id}_${originalname}`
  const resultUpload = path.join(avatarDir, fileName);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL
  })
};

module.exports = {
  register: ctrl(register),
  login: ctrl(login),
  getCurrent: ctrl(getCurrent),
  logout: ctrl(logout),
  changeSubscription: ctrl(changeSubscription),
  updateAvatar: ctrl(updateAvatar),
};