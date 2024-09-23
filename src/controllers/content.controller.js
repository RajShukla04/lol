import { Content } from "../models/content.model.js";

const saveContent = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and Description are required" });
    }
    const newContent = new Content({
      title: title,
      description: description,
    });
    const savedContent = await newContent.save();
    res
      .status(200)
      .json({ message: "Content saved sucessfully", content: saveContent });
  } catch (error) {
    res.status(500).json({ error: "Serer Error", details: error.message });
  }
};

export { saveContent };
