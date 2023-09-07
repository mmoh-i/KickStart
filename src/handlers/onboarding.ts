import { prisma } from '../db';

// Complete Onboarding Step 1
export const completeOnboardingStep1 = async (req, res) => {
  try {
    // Extract the necessary data from the request body
    const { step1Data /* Include other data for step 1 */ } = req.body;

    // Update the user's profile to mark step 1 as completed
    const updatedUser = await prisma.onboarding.update({
      where: {
        id: req.user.id, // Assuming the user ID is stored in req.user after authentication
      },
      data: {
        completed: true, // Set a flag or update specific fields related to step 1
        // Update other fields related to step 1
      },
    });

    res.json({ data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// // Complete Onboarding Step 2
// export const completeOnboardingStep2 = async (req, res) => {
//   try {
//     // Extract the necessary data from the request body
//     const { step2Data /* Include other data for step 2 */ } = req.body;

//     // Update the user's profile to mark step 2 as completed
//     const updatedUser = await prisma.user.update({
//       where: {
//         id: req.user.id, // Assuming the user ID is stored in req.user after authentication
//       },
//       data: {
//         onboardingStep2Completed: true, // Set a flag or update specific fields related to step 2
//         // Update other fields related to step 2
//       },
//     });

//     res.json({ data: updatedUser });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

