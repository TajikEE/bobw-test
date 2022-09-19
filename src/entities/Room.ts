import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinTable,
} from "typeorm";
import { Booking } from "./Booking";

@Entity("room")
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @ManyToMany((type) => Booking, {
  //   cascade: true,
  // })
  // bookings: Booking[];

  @ManyToMany((type) => Booking, {
    cascade: true,
  })
  @JoinTable({
    name: "bookings_rooms",
    joinColumn: {
      name: "room",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "booking",
      referencedColumnName: "id",
    },
  })
  bookings: Booking[];
}
