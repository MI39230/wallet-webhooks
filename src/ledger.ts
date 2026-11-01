import { prisma } from "./db";
import { WebhookEvent } from "./events";

// Writes the ledger entry and moves the wallet balance in one transaction.
export async function applyEvent(event: WebhookEvent) {
  const { walletId, amountCents } = event.data;
  const signed = event.type === "refund.succeeded" ? -amountCents : amountCents;

  await prisma.$transaction([
    prisma.ledgerEntry.create({
      data: {
        walletId,
        eventId: event.id,
        eventType: event.type,
        amountCents: signed,
      },
    }),
    prisma.wallet.update({
      where: { id: walletId },
      data: { balanceCents: { increment: signed } },
    }),
  ]);
}
