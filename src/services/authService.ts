import bcrypt from 'bcrypt';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { generateToken } from '../utils/jwt';
import { validateLoginInput, validateRegisterInput } from '../utils/validation';

// Register user
export const registerUser = async (
  username: string,
  password: string,
  fullName: string
) => {
  validateRegisterInput(username, password, fullName);

  const userRepository = AppDataSource.getRepository(User);
  const existingUser = await userRepository.findOne({ where: { username } });
  if (existingUser) throw new Error('Username already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = userRepository.create({
    username,
    password: hashedPassword,
    fullName,
  });
  await userRepository.save(newUser);

  return { message: 'User registered successfully' };
};

// Login user
export const loginUser = async (username: string, password: string) => {
  validateLoginInput(username, password);

  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({ where: { username } });
  if (!user) throw new Error('Invalid credentials');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = generateToken(user.id);
  return { token, user };
};