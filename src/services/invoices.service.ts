import { Invoice } from "../entities/Invoice";

export async function getInvoiceById(
  invoiceId: number
): Promise<{ data?: Invoice } | { message?: string }> {
  const data = await Invoice.findOne({ where: { id: invoiceId } });
  return data ? { data } : { message: "No invoice found" };
}

export async function getAllInvoices(): Promise<
  { data?: Invoice[] } | { message?: string }
> {
  const data = await Invoice.find();
  return data.length > 0 ? { data } : { message: "No invoices found" };
}
