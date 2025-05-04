import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ActivePseudo {
  @PrimaryColumn()
  pseudo: string;

  @Column({ type: 'datetime', nullable: true })
  expiredAt?: Date;

  @BeforeInsert()
  setExpirationDate() {
    const now = new Date();
    this.expiredAt = new Date(now.getTime() + 10 * 60 * 1000);
  }
}
