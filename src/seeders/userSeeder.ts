import { AppDataSource } from '../data-source';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';

export const seedUsers = async () => {
  try {
    // Inisialisasi koneksi database
    await AppDataSource.initialize();
    console.log('Database connected');

    // Dapatkan repository untuk entitas User
    const userRepository = AppDataSource.getRepository(User);

    // Data dummy untuk seeding
    const users = [
      {
        username: 'admin',
        password: await bcrypt.hash('admin123', 10), // Password di-hash
        fullName: 'Admin User',
        position: 'Administrator',
      },
      {
        username: 'user1',
        password: await bcrypt.hash('password123', 10),
        fullName: 'John Doe',
        position: 'Employee',
      },
    ];

    // Loop melalui data user
    for (const userData of users) {
      const existingUser = await userRepository.findOne({
        where: { username: userData.username },
      });

      if (!existingUser) {
        const newUser = userRepository.create(userData);
        await userRepository.save(newUser);
        console.log(`Seeded user: ${userData.username}`);
      } else {
        console.log(`User already exists: ${userData.username}`);
      }
    }
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    // Tutup koneksi database setelah selesai
    await AppDataSource.destroy();
    console.log('Database connection closed');
  }
};

// Jalankan seeder saat script dieksekusi
seedUsers();