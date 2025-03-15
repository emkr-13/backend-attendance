import { AppDataSource } from "../data-source";
import { User } from "../entities/User";
;


// Update user profile
export const updateUserProfile = async (
  userId: string,
  fullName: string,
  position: string,
  email?: string
) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");


    // Update data
    user.fullName = fullName || user.fullName;
    user.position = position || user.position;
   

    await userRepository.save(user);
    return { message: "Profile updated successfully", user };
  } catch (error) {
    console.error('Error in Profile updated:', (error as any).message || error);
    throw new Error('Failed to Profile updated');
  }
};

// Get user details
export const getUserDetails = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: { id: userId },
    select: ["id", "username", "fullName", "position",],
  });
  if (!user) throw new Error("User not found");
  return user;
};
