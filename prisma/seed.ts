import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Synthetic test wallets. No real customer data.
const wallets = ["wallet_A", "wallet_B", "wallet_C", "wallet_D", "wallet_E"];

async function main() {
  for (const id of wallets) {
    await prisma.wallet.upsert({
      where: { id },
      update: {},
      create: { id, ownerLabel: `Test owner ${id.slice(-1)}`, balanceCents: 0 },
    });
  }
  console.log(`Seeded ${wallets.length} wallets`);
}

main().finally(() => prisma.$disconnect());
