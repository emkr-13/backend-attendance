import { AppDataSource } from '../data-source';
import { Attendance } from '../entities/Attendance';
import { User } from '../entities/User';

// Record attendance
export const recordAttendance = async (
  userId: string,
  location: string,
  ipAddress: string,
  photo: string
) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    const attendanceRepository = AppDataSource.getRepository(Attendance);
    const newAttendance = attendanceRepository.create({
      location,
      ipAddress,
      photo,
      user,
    });

    await attendanceRepository.save(newAttendance);
    return { message: 'Attendance recorded successfully' };
  } catch (error) {
    console.error('Error in recordAttendance:', (error as any).message || error);
    throw new Error('Failed to record attendance');
  }
};

// Get attendance report for a user
export const getAttendanceReport = async (userId: string) => {
  try {
    const attendanceRepository = AppDataSource.getRepository(Attendance);
    const attendances = await attendanceRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
    return attendances;
  } catch (error) {
    console.error('Error in getAttendanceReport:',(error as any).message || error);
    throw new Error('Failed to fetch attendance report');
  }
};