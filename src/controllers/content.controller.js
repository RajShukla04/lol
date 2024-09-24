import { Content } from "../models/content.model.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const saveContent = asyncHandler(async (req, res) => {
  try {
    const { title, description } = req.body;
    // console.log(req.user);
    if (!title || !description) {
      // return res
      //   .status(400)
      //   .json({ error: "Title and Description are required" });
      throw new ApiError(400, "Title and Description are required");
    }
    const newContent = new Content({
      title: title,
      description: description,
      owner: req.user._id,
    });
    const savedContent = await newContent.save();
    res
      .status(200)
      .json({ message: "Content saved sucessfully", content: savedContent });
  } catch (error) {
    // res.status(500).json({ error: "Serer Error", details: error.message });
    throw new ApiError(500, "Server Error");
  }
});
const showContent = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const userContent = await Content.find({ owner: userId });
    if (!userContent) {
      throw new ApiError(404, "no Content Found this user");
    }
    res.status(200).json({
      message: "fetched all tasks",
      content: userContent,
    });
  } catch (error) {
    console.error("error fetching data: ", error);
    throw new ApiError(500, "Error fetching Data");
  }
});

export { saveContent, showContent };
