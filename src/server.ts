import express from "express";
import { webhooks } from "./webhooks";

const app = express();
app.use(express.json());
app.use(webhooks);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`wallet-webhooks listening on ${port}`));
