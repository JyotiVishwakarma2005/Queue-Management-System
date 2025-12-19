import AdminSettings from "../Models/AdminSettings.js";

// GET settings
export const getSettings = async (req, res) => {
  try {
    const settings = await AdminSettings.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings" });
  }
};

// UPDATE settings
export const updateSettings = async (req, res) => {
  try {
    const { profile, notifications } = req.body;

    const settings = await AdminSettings.findOneAndUpdate(
      {},
      { profile, notifications },
      { new: true, upsert: true }
    );

    res.json({ message: "Settings updated", settings });
  } catch (error) {
    res.status(500).json({ message: "Error updating settings" });
  }
};
