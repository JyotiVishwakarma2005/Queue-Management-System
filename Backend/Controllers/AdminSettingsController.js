import AdminSettings from "../Models/AdminSettings.js";

export const getSettings = async (req, res) => {
  try {
    const settings = await AdminSettings.findOne({
      adminId: req.admin.id,
    });

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const settings = await AdminSettings.findOneAndUpdate(
      { adminId: req.admin.id },
      req.body,
      { new: true, upsert: true }
    );

    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Failed to update settings" });
  }
};

