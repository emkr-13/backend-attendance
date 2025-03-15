import { AppDataSource } from '../data-source';
import { Attendance } from '../entities/Attendance';
import { User } from '../entities/User';

// Record attendance
export const recordAttendance = async (
  userId: string,
  location: string,
  ipAddress: string,
  photoUrl: string 
) => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id: userId });
  console.log('user', user);
  if (!user) throw new Error('User not found');

  const attendanceRepository = AppDataSource.getRepository(Attendance);
  const newAttendance = attendanceRepository.create({
    location,
    ipAddress,
    photo: photoUrl, 
    user,
  });

  await attendanceRepository.save(newAttendance);
  return { message: 'Attendance recorded successfully' };
};

// Get attendance report
export const getAttendanceReport = async (userId: string) => {
  const attendanceRepository = AppDataSource.getRepository(Attendance);
  const attendances = await attendanceRepository.find({
    where: { user: { id: userId } },
    order: { createdAt: 'DESC' },
    select: ['id', 'location', 'ipAddress', 'photo', 'createdAt'],
  });
  return attendances;
};