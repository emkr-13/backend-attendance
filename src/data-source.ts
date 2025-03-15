import { DataSource } from 'typeorm';
import 'dotenv/config'; // Untuk membaca .env
import { User } from './entities/User';
import { Attendance } from './entities/Attendance';

export const AppDataSource = new DataSource({
  type: process.env.DB_ENGINE as 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Attendance],
  migrations: ['dist/migrations/*.js'], // Gunakan file JavaScript hasil kompilasi
  synchronize: false,
  logging: true,
});