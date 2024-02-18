import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		
		const filteredUsers = await User.find().select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};