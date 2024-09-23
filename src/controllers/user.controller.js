import { User } from "../models/user.model.js";

const genToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccesToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(500, "Something went wrong while generating token");
  }
};
const registerUser = async (req, res) => {
  const { fullname, email, password, username } = req.body;
  if (!fullname || !email || !password || !username) {
    return res.status(400).json({ error: "All fields are required" });
  }
  const existUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existUser) {
    return res
      .status(409)
      .json({ error: "User with this email or username already exists" });
  }

  const user = await User.create({
    fullname,
    email,
    password,
    username: username.toLowerCase(),
  });
  const returnUsername = await User.findById(user._id).select("username");
  return res.status(201).json({
    username: returnUsername,
    message: "user registered successfully",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("got it");
  if (!email || !password) {
    res.status(400).json({ error: "all fields are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ error: "this email isn't registered" });
  }
  const validpass = await user.passwordCorrect(password);
  if (!validpass) {
    res.status(400).json({ error: "invailed password" });
  }
  const { accessToken, refreshToken } = await genToken(user._id);
  const loggedInUser = await User.findById(user._id).select(
    "-password -accessTOken"
  );
  const options = {
    httpOnly: false,
    secure: true,
    sameSite: "None",
    partitioned: true,
  };
  // console.log(email, password);
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      user: loggedInUser,
      accessToken,
      refreshToken,
      message: "user loggedin",
    });
};
export { registerUser, loginUser };
