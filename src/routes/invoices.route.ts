import express, { Router } from "express";
import { param } from "express-validator";
import { getInvoices, getInvoice } from "../controllers/invoices.controller";

const router: Router = express.Router();

router.get("/", getInvoices);

router.get("/:id", param("id").isNumeric(), getInvoice);

export { router as invoicesRouter };
