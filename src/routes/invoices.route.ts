import express from "express";
import { getInvoices, getInvoice } from "../controllers/invoices.controller";

const router = express.Router();

router.get("/", getInvoices);

router.get("/:id", getInvoice);

export { router as invoicesRouter };
