export type WebhookEvent = {
  id: string;
  type: "payment.succeeded" | "refund.succeeded";
  data: {
    paymentId: string;
    walletId: string;
    amountCents: number;
  };
};
