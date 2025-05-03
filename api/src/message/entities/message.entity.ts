import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column({ type: 'longtext' })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
