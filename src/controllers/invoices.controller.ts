import { NextFunction, Request, Response } from "express";
import { getInvoiceById, getAllInvoices } from "../services/invoices.service";
import { validateInputs } from "../utils/sanitization";

export async function getInvoice(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    validateInputs(req, res);
    const id: number = parseInt(req.params.id);

    res.json(await getInvoiceById(id));
  } catch (err) {
    console.error(`Error while getting invoice`, err.message);
    next(err);
  }
}

export async function getInvoices(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await getAllInvoices());
  } catch (err) {
    console.error(`Error while getting invoices`, err.message);
    next(err);
  }
}
