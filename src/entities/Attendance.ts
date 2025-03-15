import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn() // Menggunakan auto-increment untuk integer
  id: number;

  @Column()
  location: string;

  @Column()
  ipAddress: string;

  @Column('text')
  photo: string; // Base64 encoded image

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.attendances)
  user: User;
}