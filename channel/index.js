import mongoose from "mongoose";

export const channelSchema = new mongoose.Schema({
  url: String,
  title: String,
  image: String,
});

export const Channel =
  mongoose.models.Channel || mongoose.model("Channel", channelSchema);
