import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Booking } from "./Booking";

@Entity("invoice")
export class Invoice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "numeric",
  })
  amount: number;

  @ManyToOne(() => Booking, (booking) => booking.invoices)
  @JoinColumn({
    name: "booking_id",
  })
  booking: Booking;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
