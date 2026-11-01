import { Router } from "express";
import { prisma } from "./db";
import { WebhookEvent } from "./events";
import { applyEvent } from "./ledger";
import { failpoint } from "./failpoint";

export const webhooks = Router();

webhooks.post("/webhooks/payments", async (req, res) => {
  const event = req.body as WebhookEvent;

  try {
    // Skip events we have already processed
    const seen = await prisma.processedEvent.findFirst({
      where: { eventId: event.id },
    });
    if (seen) {
      console.log(`duplicate ${event.id} ignored`);
      return res.status(200).json({ status: "duplicate_ignored" });
    }

    await applyEvent(event);
    failpoint(req, "ledger");

    await prisma.processedEvent.create({ data: { eventId: event.id } });

    console.log(`processed ${event.id} (${event.type})`);
    return res.status(200).json({ status: "processed" });
  } catch (err) {
    console.error(`failed ${event.id}:`, (err as Error).message);
    // Return 500 so the provider retries the delivery
    return res.status(500).json({ error: "processing_failed" });
  }
});
