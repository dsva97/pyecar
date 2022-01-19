import { Channel } from "../../channel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const channel = req.body;
    const existChannel = await Channel.findOne(channel);

    if (!existChannel) {
      const newChannel = new Channel(channel);
      const channelCreated = await newChannel.save();

      res.status(200).json(channelCreated);
    } else {
      res.status(405).json({
        error: "You cannot create the Channel. That channel already exists",
      });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
