import { getInvoiceById, getAllInvoices } from "../services/invoices.service";

export async function getInvoice(req, res, next) {
  try {
    res.json(await getInvoiceById(req.params.id));
  } catch (err) {
    console.error(`Error while getting invoice`, err.message);
    next(err);
  }
}

export async function getInvoices(req, res, next) {
  try {
    res.json(await getAllInvoices());
  } catch (err) {
    console.error(`Error while getting invoices`, err.message);
    next(err);
  }
}
