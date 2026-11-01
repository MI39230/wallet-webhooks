import { Router } from "express";
import { WebhookEvent } from "./events";
import { applyEvent } from "./ledger";
import { failpoint } from "./failpoint";

export const webhooks = Router();

webhooks.post("/webhooks/payments", async (req, res) => {
  const event = req.body as WebhookEvent;

  try {
    await applyEvent(event);
    failpoint(req, "ledger");
    console.log(`processed ${event.id} (${event.type})`);
    return res.status(200).json({ status: "processed" });
  } catch (err) {
    console.error(`failed ${event.id}:`, (err as Error).message);
    return res.status(400).json({ error: "processing_failed" });
  }
});
