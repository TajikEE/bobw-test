import { Booking } from "../entities/Booking";
import { Invoice } from "../entities/Invoice";

export async function getInvoiceById(invoiceId) {
  return await Invoice.findOne(invoiceId);
}

export async function getAllInvoices() {
  return await Invoice.find();
}
