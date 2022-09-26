import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToOne,
} from "typeorm";
import { Room } from "./Room";
import { Invoice } from "./Invoice";

@Entity("booking")
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToOne(() => Invoice, (invoice) => invoice.id)
  invoices: Invoice[];

  @ManyToMany((type) => Room, {
    cascade: true,
  })
  @JoinTable({
    name: "bookings_rooms",
    joinColumn: {
      name: "booking",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "room",
      referencedColumnName: "id",
    },
  })
  rooms: Room[];

  @Column({
    name: "is_confirmed",
    default: false,
  })
  is_confirmed: boolean;

  @Column({ nullable: true })
  expires_at: Date;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
