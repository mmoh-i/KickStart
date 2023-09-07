import { prisma } from '../db';

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        // Fetch the user's profile data based on their user ID
        const userProfile = await prisma.user.findUnique({
            where: {
                id: req.user.id
            },
        });

        if (!userProfile) {
            // If the user's profile is not found, return a 404 response
            return res.status(404).json({ error: "User profile not found" });
        }

        // Return the user's profile data
        res.json({ data: userProfile });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
    try {
        // Update the user's profile data based on their user ID
        const updatedUserProfile = await prisma.user.update({
            where: {
                id: req.user.id
            },
            data: {
                // Specify the fields to update based on the request body
                // For example, if you allow updating the user's name:
                username: req.body.username
            }
        });

        // Return the updated user's profile data
        res.json({ data: updatedUserProfile });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
